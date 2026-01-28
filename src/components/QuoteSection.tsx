"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function QuoteSection() {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById('quote-section');
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
    <section id="quote-section" className="relative py-20 md:py-24 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/text-area.jpeg"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Quote Container with semi-transparent background */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 lg:p-10 shadow-xl">
            {/* Quote Icon/Decoration */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg 
                  className="w-6 h-6 md:w-7 md:h-7 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
            
            {/* Quote Text */}
            <blockquote className="text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-serif italic text-white leading-relaxed mb-4 md:mb-6">
                "The aim of punishment is not to satisfy some bloodthirsty desire for vengeance, 
                nor is it to inflict suffering for suffering's sake. Its essential purpose is to 
                awaken the spirit of reflection and repentance."
              </p>
              
              {/* Author */}
              <footer className="mt-6 md:mt-8">
                <div className="h-px w-24 md:w-32 bg-white/50 mx-auto mb-4 md:mb-6"></div>
                <p className="text-lg md:text-xl font-sans font-semibold text-white">
                  — Fyodor Dostoevsky
                </p>
                <p className="text-white/80 font-sans text-sm md:text-base mt-1 md:mt-2">
                  Russian novelist and philosopher
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}