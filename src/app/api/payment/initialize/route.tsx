import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      amountInKobo, 
      amount, 
      metadata, 
      donationType = 'once',
      donorName,
      donorPhone 
    } = body;

    // Validate required fields
    if (!email || !amount || !amountInKobo) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: email, amount' },
        { status: 400 }
      );
    }

    // Validate minimum amount
    if (parseInt(amount) < 100) {
      return NextResponse.json(
        { success: false, message: 'Minimum donation amount is NGN 100' },
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

    // Generate unique payment reference
    const paymentRef = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('Created transaction reference:', paymentRef);

    // Prepare Paystack payload
    const paystackPayload = {
      email,
      amount: amountInKobo,
      metadata: {
        ...metadata,
        paymentRef,
        donationType,
        donorName,
      },
    };

    console.log('Calling Paystack with payload:', paystackPayload);

    // Initialize payment with Paystack
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paystackPayload),
    });

    if (!paystackResponse.ok) {
      const errorData = await paystackResponse.json();
      console.error('Paystack initialization failed:', errorData);
      return NextResponse.json(
        { success: false, message: errorData.message || 'Failed to initialize payment' },
        { status: paystackResponse.status }
      );
    }

    const paystackData = await paystackResponse.json();
    console.log('Paystack response:', paystackData);

    // Save transaction to Supabase
    const { data: transaction, error: dbError } = await supabase
      .from('transactions')
      .insert({
        payment_ref: paymentRef,
        donor_email: email,
        donor_name: donorName || null,
        donor_phone: donorPhone || null,
        amount: amount,
        amount_in_kobo: amountInKobo,
        currency: 'NGN',
        status: 'pending',
        paystack_reference: paystackData.data.reference,
        paystack_access_code: paystackData.data.access_code,
        authorization_url: paystackData.data.authorization_url,
        metadata: metadata || {},
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Failed to save transaction' },
        { status: 500 }
      );
    }

    console.log('Transaction saved to Supabase:', paymentRef);

    return NextResponse.json({
      success: true,
      data: {
        paymentRef: paymentRef,
        reference: paystackData.data.reference,
        access_code: paystackData.data.access_code,
        authorization_url: paystackData.data.authorization_url,
      },
    });
  } catch (error: any) {
    console.error('Error initializing payment:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Error initializing payment' },
      { status: 500 }
    );
  }
}