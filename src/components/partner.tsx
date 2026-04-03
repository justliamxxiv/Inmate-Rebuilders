"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PartneringSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

    const section = document.getElementById('partner');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section id="partner" className="w-full bg-[#F8FFFF] py-12 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-24">
          {/* Left column with animation */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <h2 className="font-serif text-3xl md :text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Partnering with<br />Purpose
            </h2>
          </div>
          
          {/* Right column with animation */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`} style={{ transitionDelay: '200ms' }}>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              By partnering with us, your organisation can make a significant impact on the lives of those most in need. Ready to make a difference? Contact us today at<br />
              <span className="text-green-600 font-semibold mt-2 inline-block transition-all duration-300 hover:text-green-700 hover:scale-105 transform">
                theinmaterebuilders@gmail.com
              </span>
            </p>
          </div>
        </div>
        
        {/* Image with animation */}
        <div 
          className={`relative mt-12 md:mt-16 w-full transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[440px] overflow-hidden rounded-lg">
            <Image
              src="/images/components/hands.png"
              alt="Two people holding hands viewed from above"
              fill
              className={`object-cover transition-all duration-700 ${
                imageLoaded ? 'scale-100' : 'scale-110'
              }`}
              priority
              sizes="100vw"
              onLoad={handleImageLoad}
            />
            
           
          </div>
          
         
        </div>
        
        {/* Optional call to action button with animation */}
        
          
        {/* </div> */}
      </div>
    </section>
  );
}