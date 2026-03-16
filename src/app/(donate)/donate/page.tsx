"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";

export default function DonateWithPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const accountNumber = "7018555754";

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
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const copyAccountNumber = async () => {
    await navigator.clipboard.writeText(accountNumber);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="donate-v2-section" className="bg-[#F8FFFF] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT SIDE (UNCHANGED) */}

          <div
            className={`border-2 border-black p-4 md:p-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h1 className="text-3xl md:text-5xl font-serif mb-8">
              Donate to Inmate Rebuilder
            </h1>

            <div className="relative w-full h-64 md:h-80 mb-8">
              <Image
                src="/images/hero/hero2.png"
                alt="Inmates behind bars"
                fill
                className="object-cover"
                priority
              />
            </div>

            <p className="font-semibold mb-4 text-lg">
              Together, let's build a brighter future for individuals and a safer
              future for our communities.
            </p>

            <p className="text-base leading-relaxed">
              Every contribution fuels Inmate Rebuilder's mission to empower
              incarcerated individuals through legal support, rehabilitation
              programs, and reintegration initiatives.
            </p>
          </div>

          {/* RIGHT SIDE — BANK TRANSFER CARD */}

          <div
            className={`border-2 border-black p-4 md:p-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h2 className="text-3xl font-semibold mb-6">
              Support Our Mission
            </h2>

            <p className="text-gray-600 mb-8">
              You can support our work by making a direct bank transfer using
              the account details below.
            </p>

            {/* ACCOUNT DETAILS */}

            <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6 mb-6 space-y-4">

              <div>
                <p className="text-sm text-gray-500">Bank</p>
                <p className="text-lg font-semibold">Moniepoint MFB</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Account Name</p>
                <p className="text-lg font-semibold">
                  The Inmates Rebuilders Rehabilitation Foundation
                </p>
              </div>

              <div>
  <p className="text-sm text-gray-500">Account Number</p>

  <div className="flex items-center justify-between bg-white border rounded-lg px-4 py-3 mt-1">
    
    <span className="text-lg sm:text-xl font-mono tracking-widest">
      {accountNumber}
    </span>

    <button
      onClick={copyAccountNumber}
      className="ml-3 p-2 rounded-md hover:bg-gray-100 transition"
      aria-label="Copy account number"
    >
      {copied ? (
        <Check size={20} className="text-green-600" />
      ) : (
        <Copy size={20} className="text-gray-600" />
      )}
    </button>

  </div>
</div>
            </div>

            {/* INSTRUCTIONS */}

            <div className="bg-[#3d5a4f] text-white p-5 rounded-lg text-sm leading-relaxed">
              Please ensure the account name matches
              <strong> The Inmates Rebuilders Rehabilitation Foundation </strong>
              before completing your transfer.
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}