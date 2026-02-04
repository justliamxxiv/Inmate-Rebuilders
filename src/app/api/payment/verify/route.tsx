import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
    const { reference, paymentRef } = body;
    
    console.log("Verifying payment with reference:", reference, "and paymentRef:", paymentRef);

    if (!reference || !paymentRef) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: reference, paymentRef' 
        },
        { status: 400 }
      );
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY is not configured');
      return NextResponse.json(
        { success: false, message: 'Payment service configuration error' },
        { status: 500 }
      );
    }

    // Verify with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
        },
      }
    );

    const data = await response.json();
    console.log("Paystack verification response:", data);

    if (data.status && data.data.status === "success") {
      const successResult = await handlePaystackSuccess(paymentRef, reference, data);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Payment verified successfully',
        data: data.data,
        transaction: successResult
      });
      
    } else {
      console.warn("Payment verification failed", { reference, data });
      
      // Handle failed payment
      const failureResult = await handlePaystackFailure(paymentRef, reference, data);
      
      return NextResponse.json({ 
        success: false, 
        message: "Payment not successful", 
        data: data.data,
        transaction: failureResult
      });
    }

  } catch (error: any) {
    console.error("Error verifying transaction:", {
      error: error.message,
      reference: body?.reference,
      paymentRef: body?.paymentRef
    });
    
    // Try to update transaction status to failed
    try {
      await markTransactionAsFailed(body?.paymentRef, error.message);
    } catch (dbError) {
      console.error("Failed to update transaction status after verification error:", dbError);
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Error verifying transaction" 
      },
      { status: 500 }
    );
  }
}

async function handlePaystackSuccess(paymentRef: string, reference: string, data: any) {
  try {
    // Get the transaction from database
    const { data: transaction, error: fetchError } = await supabase
      .from('transactions')
      .select('*')
      .eq('payment_ref', paymentRef)
      .single();

    if (fetchError || !transaction) {
      throw new Error("Transaction not found");
    }

    // Check if already processed
    if (transaction.status === 'successful') {
      console.log("Transaction already processed", { paymentRef });
      return { 
        updated: false, 
        paymentRef, 
        reference,
        message: "Transaction already processed"
      };
    }

    // Verify amount matches
    if (data.data.amount !== transaction.amount_in_kobo) {
      throw new Error("Amount mismatch - possible fraud attempt");
    }

    // Update transaction to successful
    const { data: updatedTransaction, error: updateError } = await supabase
      .from('transactions')
      .update({
        status: 'success',
        paystack_transaction_id: data.data.id,
        payment_channel: data.data.channel,
        paid_at: data.data.paid_at || new Date().toISOString(),
        metadata: {
          ...transaction.metadata,
          verification_data: {
            gateway_response: data.data.gateway_response,
            ip_address: data.data.ip_address,
            fees: data.data.fees,
            authorization: data.data.authorization,
          }
        }
      })
      .eq('payment_ref', paymentRef)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Failed to update transaction: ${updateError.message}`);
    }

    console.log('Transaction verified successfully', { 
      paymentRef, 
      reference,
      amount: transaction.amount,
      donor: transaction.donor_email
    });

    // TODO: Send confirmation email to donor
    // TODO: Notify admin of new donation
    // TODO: If monthly donation, create subscription record

    return { 
      updated: true, 
      paymentRef, 
      reference,
      transaction: updatedTransaction
    };

  } catch (error: any) {
    console.error('Error in handlePaystackSuccess:', {
      error: error.message,
      paymentRef,
      reference,
    });
    
    throw error;
  }
}

async function handlePaystackFailure(paymentRef: string, reference: string, data: any) {
  try {
    // Get the transaction
    const { data: transaction, error: fetchError } = await supabase
      .from('transactions')
      .select('*')
      .eq('payment_ref', paymentRef)
      .single();

    if (fetchError || !transaction) {
      console.warn('Transaction not found for failure handling', { paymentRef });
      return { updated: false, error: "Transaction not found" };
    }

    // Don't overwrite successful payments
    if (transaction.status === 'successful') {
      console.warn('Attempted to mark successful transaction as failed', { paymentRef });
      return { updated: false, error: "Cannot mark successful transaction as failed" };
    }

    // Update transaction to failed
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        status: 'failed',
        metadata: {
          ...transaction.metadata,
          verification_data: data.data,
          failure_reason: data.data?.gateway_response || 'payment_failed',
          failure_code: data.data?.status,
        }
      })
      .eq('payment_ref', paymentRef);

    if (updateError) {
      throw new Error(`Failed to update transaction: ${updateError.message}`);
    }

    console.log('Transaction marked as failed', { paymentRef, reference });

    return { updated: true, paymentRef, reference };

  } catch (error: any) {
    console.error('Error in handlePaystackFailure:', {
      error: error.message,
      paymentRef,
      reference,
    });
    
    return { updated: false, error: error.message };
  }
}

async function markTransactionAsFailed(paymentRef: string, errorMessage: string) {
  try {
    const { data: transaction } = await supabase
      .from('transactions')
      .select('status')
      .eq('payment_ref', paymentRef)
      .single();

    if (transaction && transaction.status !== 'successful') {
      await supabase
        .from('transactions')
        .update({
          status: 'failed',
          metadata: {
            failure_reason: 'verification_error',
            error_details: errorMessage,
          }
        })
        .eq('payment_ref', paymentRef);
      
      console.log('Transaction marked as failed due to verification error', { paymentRef });
    }
  } catch (error) {
    console.error("Failed to update transaction status after verification error:", error);
  }
}