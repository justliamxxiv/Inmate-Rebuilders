"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CTA() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#F8FFFF]">
  {/* Decorative Background SVG Lines */}
  <Image
    src="/images/components/elipses.png"
    alt="Background"
    fill
    className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    priority
    sizes="100vw"
  />

  {/* Floating Icon Cards - Only render on client to avoid hydration issues */}
  {isClient && (
    <>
      {/* 📈 top-left area */}
      <div
        className="absolute z-10 animate-float"
        style={{ top: "15%", left: "12%" }}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-lg sm:rounded-xl shadow-md flex items-center justify-center">
          <Image
            src="/images/svgs/chart.svg"
            alt="Chart"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            priority
          />
        </div>
      </div>

      {/* ❤️ top-right area */}
      <div
        className="absolute z-10 animate-float-delayed"
        style={{ top: "13%", right: "15%" }}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-lg sm:rounded-xl shadow-md flex items-center justify-center">
          <Image
            src="/images/svgs/heart.svg"
            alt="Heart"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            priority
          />
        </div>
      </div>

      {/* 💵 right-middle area */}
      <div
        className="absolute z-10 animate-float-delayed-2"
        style={{ top: "64%", right: "10%", transform: "translateY(-50%)" }}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-lg sm:rounded-xl shadow-md flex items-center justify-center">
          <Image
            src="/images/svgs/money.svg"
            alt="Money"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            priority
          />
        </div>
      </div>

      {/* 🤝 bottom-left area */}
      <div
        className="absolute z-10 animate-float-delayed-3"
        style={{ bottom: "17%", left: "15%" }}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-lg sm:rounded-xl shadow-md flex items-center justify-center p-0.5 sm:p-1">
          <Image
            src="/images/svgs/Emoji.svg"
            alt="Emoji"
            width={36}
            height={36}
            className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11"
            priority
          />
        </div>
      </div>
    </>
  )}

  {/* Main Content Wrapper */}
  <div className="relative z-20 max-w-xl mx-auto px-6 text-center">
    {/* Heading */}
    <h1 className="font-serif-display font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight mb-6">
      Invest in Change,
      <br />
      Donate Today
    </h1>

    {/* Paragraph */}
    <p className="font-sans-body text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8">
      With your support, we provide essential resources and assistance to
      inmates. Every donation fuels our programs, advocacy, and support
      network. Be a part of the solution.
    </p>

    {/* Primary CTA Button */}
    <CTAButton />
  </div>
</section>
  );
}

function CTAButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const buttonStyle = {
    backgroundColor: isHovered ? "#5A9A26" : "#61A326",
    width: "134px",
  };

  return (
    <button
      className="font-sans-body font-medium text-black rounded-full px-10 py-3 text-base transition-colors duration-200 hover:shadow-lg"
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        // Add your donation logic here
        console.log("Donate button clicked");
        // Example: window.location.href = '/donate';
      }}
    >
      Donate
    </button>
  );
}
