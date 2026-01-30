"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const metrics = [
    { value: '10k', label: 'Beneficiary' },
    { value: '20', label: 'Partnerships' },
    { value: '50', label: 'Prisons visited' },
    { value: '10', label: 'States visited' },
  ];

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }, // Start animation when 10% of element is visible
    );

    const section = document.getElementById('hero-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="hero-section" className="w-full bg-[#F8FFFF] py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column — Text Content with Animation */}
          <div className="flex flex-col max-w-xl">
            {/* Main Heading with animation */}
            <div 
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight">
                <span className="block">Beyond Bars,</span>
                <span className="block italic">Breaking Boundaries</span>
              </h1>
            </div>

            {/* Description Paragraph with animation */}
            <p 
              className={`text-gray-700 text-lg sm:text-xl lg:text-xl leading-relaxed mt-6 lg:mt-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Inmate Rebuilders empowers individuals to break free from their past and build brighter futures. Through rehabilitation, legal support, and community, we help them reintegrate and thrive.
            </p>

            {/* Sub-label with animation */}
            <p 
              className={`text-green-600 text-base sm:text-lg font-medium mt-8 lg:mt-10 mb-4 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              In 5 years
            </p>

            {/* Metrics Grid with staggered animation */}
            <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-6 mt-2">
              {metrics.map((metric, index) => (
                <div 
                  key={index} 
                  className={`flex items-baseline gap-2 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + (index * 100)}ms` }}
                >
                  <p className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-black">{metric.value}</p>
                  <p className="text-gray-700 text-sm sm:text-base">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Images with Animation */}
          <div className="relative w-full flex flex-col items-center lg:items-end space-y-4 lg:space-y-6 mt-8 lg:mt-0">
            {/* TOP SEMI-CIRCLE with animation */}
            <div 
              className={`relative w-[90%] max-w-[520px] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div 
                className="w-full aspect-[2/1] overflow-hidden shadow-lg transform rotate-[7deg]" 
                style={{ borderRadius: '0 0 260px 260px' }}
              >
                <Image
                  src="/images/hero/hero2.png"
                  alt="Inmate Rebuilders Logo"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* BOTTOM SEMI-CIRCLE with animation */}
            <div 
              className={`relative w-[85%] max-w-[520px] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div 
                className="w-full aspect-[2/1] overflow-hidden shadow-xl transform rotate-[7deg]" 
                style={{ borderRadius: '240px 240px 0 0' }}
              >
                <Image
                  src="/images/hero/hero1.png"
                  alt="Inmate Rebuilders Logo"
                  fill      
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;