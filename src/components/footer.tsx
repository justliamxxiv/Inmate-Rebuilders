"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  // Get current year dynamically
  const currentYear = new Date().getFullYear();

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

    const footer = document.getElementById("footer-section");
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  const handleLogoLoad = () => {
    setLogoLoaded(true);
  };

  return (
    <footer id="footer-section" className="w-full bg-[#F8FFFF] py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Quote with animation */}
        <div 
          className={`flex justify-end mb-12 md:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div className="max-w-md">
            <p className="font-nunito text-xl md:text-2xl leading-relaxed text-gray-900 tracking-widest md:tracking-widest">
              "No one truly knows a nation until one has been inside its jails.
              A nation should not be judged by how it treats its highest
              citizens, but its lowest ones."
            </p>
            <p 
              className={`mt-4 font-nunito md:mt-6 text-sm uppercase tracking-wider text-gray-700 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              — Nelson Mandela
            </p>
          </div>
        </div>

        {/* CTA Buttons - Staggered animation */}
        <div className="flex flex-row justify-center items-center mb-16 md:mb-28 gap-2 sm:gap-3 md:gap-4 max-w-full">
  {[
    { label: "Donate", href: "/donate" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Partners", href: "/partners" }
  ].map((item, index) => (
    <Link
      key={item.label}
      href={item.href}
      className={`
        flex items-center justify-center
        flex-1
        max-w-[120px] min-h-[50px]
        sm:max-w-[180px] sm:min-h-[65px]
        md:max-w-[300px] md:min-h-[100px]
        rounded-full
        bg-transparent
        border border-black/30
        text-sm sm:text-lg md:text-2xl
        font-medium text-gray-900
        transition-all duration-500
        hover:bg-[#61A326] hover:text-white hover:border-transparent hover:scale-105
        active:scale-95
        px-3 sm:px-4 md:px-6
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ 
        transitionDelay: `${300 + (index * 100)}ms`,
        transform: isVisible ? "translateY(0)" : "translateY(8px)"
      }}
      // Optional: Add prefetch for better performance
      prefetch={false}
    >
      {item.label}
      <span 
        className={`ml-1 sm:ml-2 md:ml-4 text-sm sm:text-lg md:text-2xl transition-all duration-300 ${
          isVisible ? "rotate-0 opacity-100" : "rotate-45 opacity-0"
        }`}
      >
        ↗
      </span>
    </Link>
  ))}
</div>

        {/* Bottom Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 md:gap-12">
          {/* Brand - Logo and copyright */}
          <div 
            className={`flex flex-col items-start order-2 lg:order-1 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="w-48 overflow-hidden">
              <Image
                src="/images/logos/logo.png"
                alt="Inmate Rebuilders Logo"
                width={256}
                height={256}
                className={`w-full h-auto transition-all duration-700 ${
                  logoLoaded ? "scale-100" : "scale-110"
                }`}
                priority
                onLoad={handleLogoLoad}
              />
            </div>
            <p 
              className={`text-sm text-gray-700 mt-2 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              © {currentYear}. All rights reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div 
            className={`max-w-sm lg:text-right order-1 lg:order-2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <p className="text-sm text-gray-700 leading-relaxed">
              For inquiries about volunteering, partnerships, or support,
              contact us at{" "}
              <a
                href="mailto:theinmaterebuilders@gmail.com"
                className="underline cursor-pointer transition-all duration-300 hover:text-[#61A326] hover:no-underline"
              >
                theinmaterebuilders@gmail.com
              </a>
            </p>
            <Link
              href="#"
              className={`inline-flex items-center mt-4 text-sm font-medium transition-all duration-300 hover:text-[#61A326] group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              Instagram 
              <span className="ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </div>

        

       
      </div>
    </footer>
  );
}