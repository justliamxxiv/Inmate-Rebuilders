interface PaystackPaymentPayload {
  email: string;
  amount: number;
  amountInKobo: number;
  donationType?: 'once' | 'monthly';
  donorName?: string;
  donorPhone?: string;
  
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    paymentRef: string;
    reference: string;
    access_code: string;
    authorization_url?: string;
  };
}

interface VerifyPaymentResult {
  success: boolean;
  message: string;
  data?: any;
  transaction?: any;
}

// const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
const publicKey = "pk_test_44120ae9320b0d2d190ba3c0e82f6eb15ca7d385";

/**
 * Initialize payment with backend
 */
export async function   initializePayment(payload: PaystackPaymentPayload): Promise<PaymentResponse> {
  try {
    const response = await fetch('/api/payment/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to initialize payment');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error initializing payment:', error);
    return {
      success: false,
      message: error.message || 'Failed to initialize payment',
    };
  }
}

/**
 * Verify Paystack payment
 */
export async function verifyPayment(reference: string, paymentRef: string): Promise<VerifyPaymentResult> {
  try {
    const response = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference,
        paymentRef
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Verification failed:', errorData);
      throw new Error(errorData.message || 'Failed to verify payment');
    }
    
    const data = await response.json();
    return data;
    
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      message: error.message || 'Failed to verify payment',
    };
  }
}

/**
 * Handle Paystack payment using Popup (Inline)
 */
export async function handlePaystackPayment(
  email: string,
  amount: number,
  donorName: string,
  donorPhone?: string,
  donationType: 'once' | 'monthly' = 'once',
  onSuccess?: (reference: string) => void,
  onFailure?: (error: string) => void
): Promise<void> {
  
  const amountInKobo = Math.round(amount * 100);
  
  const payload: PaystackPaymentPayload = {
    email,
    amount,
    amountInKobo,
    donationType,
    donorName,
    donorPhone,
    metadata: {
      donationType,
      donorName,
      timestamp: new Date().toISOString(),
    }
  };

  console.log('Initializing Paystack payment with payload:', payload);

  try {
    // Step 1: Initialize payment with backend
    const res = await initializePayment(payload);
    
    if (!res.success || !res.data) {
      console.error('Initialize payment failed:', res);
      throw new Error(res.message || 'Failed to initialize payment');
    }

    console.log('Backend response:', res.data);

    // Check if Paystack script is loaded
    if (!(window as any).PaystackPop) {
      await loadPaystackScript();
    }

    // Use the correct reference from Paystack response
    const paystackReference = res.data.reference;
    const paymentRef = res.data.paymentRef;

    console.log('Setting up Paystack with:', {
      key: publicKey,
      email: email,
      amount: amountInKobo,
      ref: paystackReference,
      paymentRef: paymentRef
    });

    // Initialize Paystack popup
    const paystack = (window as any).PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amountInKobo,
      ref: paystackReference, // Use Paystack's reference, not your custom paymentRef
      currency: 'NGN',
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: donorName
          },
          {
            display_name: "Donation Type",
            variable_name: "donation_type",
            value: donationType
          }
        ]
      },
      
      onSuccess: async (response: any) => {
        console.log('Payment successful, reference:', response.reference);
        
        try {
          // Verify payment with backend
          const verificationResult = await verifyPayment(response.reference, paymentRef);
          
          if (verificationResult.success) {
            console.log('Payment verified successfully:', verificationResult);
            
            if (onSuccess) {
              onSuccess(response.reference);
            }
          } else {
            console.log('Payment verification failed:', verificationResult.message);
            
            if (onFailure) {
              onFailure(verificationResult.message);
            }
          }
        } catch (error: any) {
          console.error('Error verifying payment:', error);
          
          if (onFailure) {
            onFailure('Payment verification failed: ' + error.message);
          }
        }
      },
      
      onClose: () => {
        console.log('Payment popup closed by user');
        
        if (onFailure) {
          onFailure('Payment was cancelled by user');
        }
      },
    });

    // Open Paystack iframe
    paystack.openIframe();
    
  } catch (error: any) {
    console.error('Payment initialization error:', error);
    
    // Parse Zod validation errors if present
    if (error.issues) {
      const errorDetails = error.issues.map((issue: any) => issue.message).join(', ');
      const errorMessage = `Validation error: ${errorDetails}`;
      console.error('Validation details:', error.issues);
      
      if (onFailure) {
        onFailure(errorMessage);
      }
    } else if (onFailure) {
      onFailure(error.message || 'Payment initialization failed');
    }
  }
}
/**
 * Handle Paystack payment using Redirect (simpler, more reliable)
 */
export async function handlePaystackPaymentRedirect(
  email: string,
  amount: number,
  donorName: string,
  donorPhone?: string,
  donationType: 'once' | 'monthly' = 'once',
): Promise<void> {
  
  const amountInKobo = Math.round(amount * 100);
  
  const payload: PaystackPaymentPayload = {
    email,
    amount,
    amountInKobo,
    donationType,
    donorName,
    donorPhone,
    metadata: {
      donationType,
      donorName,
      timestamp: new Date().toISOString(),
    }
  };

  try {
    const res = await initializePayment(payload);
    
    if (!res.success || !res.data) {
      throw new Error(res.message || 'Failed to initialize payment');
    }

    // Redirect to Paystack payment page
    if (res.data.authorization_url) {
      window.location.href = res.data.authorization_url;
    } else {
      throw new Error('No authorization URL received');
    }
    
  } catch (error: any) {
    console.error('Payment initialization error:', error);
    throw error;
  }
}

/**
 * Load Paystack inline script
 */
async function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not defined'));
      return;
    }

    // Check if script is already loaded
    if ((window as any).PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-inline-script';
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Paystack script loaded successfully');
      setTimeout(() => {
        if ((window as any).PaystackPop) {
          resolve();
        } else {
          reject(new Error('PaystackPop not available after script load'));
        }
      }, 100);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Paystack script:', error);
      reject(new Error('Failed to load Paystack payment system'));
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Format amount for display
 */
export function formatAmount(amountInKobo: number, currency: string = 'NGN'): string {
  const amountInNaira = amountInKobo / 100;
  
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  return formatter.format(amountInNaira);
}

/**
 * Check if Paystack is available
 */
export function isPaystackAvailable(): boolean {
  return typeof window !== 'undefined' && !!(window as any).PaystackPop;
}