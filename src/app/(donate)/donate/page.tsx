"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { handlePaystackPayment } from "@/lib/paystack";
import { useRouter } from "next/navigation";

export default function DonateWithPopup() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [donationType, setDonationType] = useState<"once" | "monthly">("monthly");
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("NGN");
  const [isDonating, setIsDonating] = useState(false);
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  
  // Donor information
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("donate-v2-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const donationAmounts = [
    { value: "10000", label: "NGN 10,000" },
    { value: "15000", label: "NGN 15,000" },
    { value: "30000", label: "NGN 30,000" },
    { value: "50000", label: "NGN 50,000" },
  ];

  const handleDonate = async () => {
    // Validation
    if (!donorName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }

    // Extract numeric value from custom amount
    const numericAmount = customAmount.replace(/[^0-9]/g, '');
    const amount = selectedAmount || numericAmount;
    
    if (!amount || parseInt(amount) === 0) {
      alert("Please select or enter a valid donation amount");
      return;
    }

    if (parseInt(amount) < 100) {
      alert("Minimum donation amount is NGN 100");
      return;
    }

    setIsDonating(true);

    try {
      // Use Paystack popup method
      await handlePaystackPayment(
        donorEmail.trim(),
        parseInt(amount),
        donorName.trim(),
        donorPhone.trim() || undefined,
        donationType,
        // On success
        (reference) => {
          console.log('Payment successful:', reference);
          setIsDonating(false);
          // Redirect to success page
          router.push(`/payment/callback?reference=${reference}`);
        },
        // On failure
        (error) => {
          console.error('Payment failed:', error);
          alert(error);
          setIsDonating(false);
        }
      );
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(error.message || 'Failed to process payment. Please try again.');
      setIsDonating(false);
    }
  };

  const handleAmountButtonClick = (value: string) => {
    setSelectedAmount(value);
    const numericValue = customAmount.replace(/[^0-9]/g, '');
    if (numericValue === value) {
      setCustomAmount("NGN");
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.startsWith("NGN") || value === "") {
      setCustomAmount(value);
      setSelectedAmount(null);
      return;
    }
    
    if (/^\d+$/.test(value.replace(/[^0-9]/g, ''))) {
      setCustomAmount(`NGN ${value.replace(/[^0-9]/g, '')}`);
      setSelectedAmount(null);
    }
  };

  const handleCustomAmountFocus = () => {
    setIsAmountFocused(true);
    if (customAmount === "NGN") {
      setCustomAmount("NGN ");
    }
  };

  const handleCustomAmountBlur = () => {
    setIsAmountFocused(false);
    if (customAmount === "NGN " || customAmount === "NGN") {
      setCustomAmount("NGN");
    }
  };

  return (
    <section id="donate-v2-section" className="bg-[#F8FFFF] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Content Card with Animation */}
          <div 
            className={`bg-transparent border-2 border-black p-8 md:p-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h1 
              className={`text-4xl md:text-5xl font-serif mb-6 md:mb-8 leading-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Donate to Inmate Rebuilder
            </h1>
            
            <div 
              className={`relative w-full h-64 md:h-80 mb-6 md:mb-8 overflow-hidden transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <Image
                src="/images/hero/hero2.png"
                alt="Inmates behind bars"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            <p 
              className={`font-semibold mb-4 md:mb-6 text-lg leading-relaxed transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Together, let's build a brighter future for individuals and a safer future for our communities.
            </p>
            
            <p 
              className={`text-base leading-relaxed transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Every contribution, big or small, fuels Inmate Rebuilder's mission to empower incarcerated individuals. Your donation equips us with the resources to provide essential legal support, rehabilitation programs, and improve overall well-being. By investing in their potential, we help them reclaim their dignity, prepare for a successful reintegration into society, and ultimately, break the cycle of recidivism.
            </p>
          </div>

          {/* Right Column: Donation Form Card with Animation */}
          <div 
            className={`bg-transparent border-2 border-black p-8 md:p-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Donor Information Fields */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border-2 border-gray-400 rounded-xl py-3 px-4 text-base focus:outline-none focus:border-black transition-all duration-300"
                  required
                  disabled={isDonating}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full border-2 border-gray-400 rounded-xl py-3 px-4 text-base focus:outline-none focus:border-black transition-all duration-300"
                  required
                  disabled={isDonating}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full border-2 border-gray-400 rounded-xl py-3 px-4 text-base focus:outline-none focus:border-black transition-all duration-300"
                  disabled={isDonating}
                />
              </div>
            </div>

            {/* Donation Type Toggle */}
            <div 
              className={`bg-gray-100 rounded-full p-2 mb-6 md:mb-8 flex transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <button
                onClick={() => setDonationType("once")}
                disabled={isDonating}
                className={`w-1/2 py-4 px-4 md:px-6 rounded-full text-base md:text-lg font-medium text-black transition-all duration-300 transform hover:scale-90 disabled:opacity-50 disabled:cursor-not-allowed ${
                  donationType === "once" 
                    ? "bg-white border-2 border-black shadow-lg" 
                    : "hover:bg-gray-50"
                }`}
              >
                Give Once
              </button>
              <button
                onClick={() => setDonationType("monthly")}
                disabled={isDonating}
                className={`w-1/2 py-4 px-4 md:px-6 rounded-full text-base md:text-lg font-medium text-black transition-all duration-300 transform hover:scale-90 disabled:opacity-50 disabled:cursor-not-allowed ${
                  donationType === "monthly" 
                    ? "bg-[#6cab2f] border-2 border-black shadow-lg" 
                    : "hover:bg-gray-50"
                }`}
              >
                Give Monthly
              </button>
            </div>

            {/* Monthly Donation Banner */}
            {donationType === "monthly" && (
              <div 
                className={`bg-[#3d5a4f] text-white p-4 md:p-6 mb-6 md:mb-8 rounded-lg transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <p className="leading-relaxed text-sm md:text-base">
                  Choosing a monthly donation allows you to make a continuous difference without having to remember to donate again.
                </p>
              </div>
            )}

            <label 
              className={`block text-black mb-3 md:mb-4 text-lg font-medium transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`} 
              style={{ transitionDelay: "500ms" }}
            >
              Enter your donation
            </label>

            {/* Amount Buttons */}
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {donationAmounts.map((amount, index) => (
                <button
                  key={amount.value}
                  onClick={() => handleAmountButtonClick(amount.value)}
                  disabled={isDonating}
                  className={`border-2 rounded-xl py-3 md:py-4 px-0 text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedAmount === amount.value
                      ? "border-[#6cab2f] bg-green-50 text-[#6cab2f]"
                      : "border-gray-400 bg-white text-black hover:border-gray-600"
                  }`}
                  style={{ 
                    transitionDelay: `${600 + (index * 50)}ms`
                  }}
                >
                  {amount.label}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div 
              className={`relative mb-6 md:mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  onFocus={handleCustomAmountFocus}
                  onBlur={handleCustomAmountBlur}
                  disabled={isDonating}
                  className={`w-full border-2 border-gray-400 rounded-xl py-3 md:py-4 pl-4 pr-12 text-base md:text-lg focus:outline-none focus:border-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isAmountFocused ? "border-black bg-white" : ""
                  }`}
                />
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={isDonating}
              className={`w-full bg-[#6cab2f] text-black py-4 md:py-5 rounded-full font-semibold text-lg md:text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              {isDonating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6 mr-3 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Donate"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secured by Paystack. Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}