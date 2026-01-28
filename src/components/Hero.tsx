"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const stats = [
    { value: '10k', label: 'Beneficiary' },
    { value: '20', label: 'Partnerships' },
    { value: '50', label: 'Prisons visited' },
    { value: '10', label: 'States visited' },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="flex items-center justify-center bg-white overflow-hidden relative">
      {/* Background Image with Dark Glassmorphism Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero2.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay with subtle blur - preserves image visibility */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        {/* Subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-[100px]">
        {/* Main Heading - ONLY THIS IN PRATA */}
        <div className={`font-serif transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-normal mb-8 leading-tight text-white">
            Beyond Bars,
            <br />
            <span className="text-primary-400 italic">
              Breaking Boundaries
            </span>
          </h1>
        </div>

        {/* Description - Back to Raleway */}
        <p className={`text-xl md:text-2xl text-gray-100 mb-20 max-w-3xl mx-auto leading-relaxed font-sans transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Inmate Rebuilders empowers individuals to break free from their past and build brighter futures. 
          Through rehabilitation, legal support, and community, we help them reintegrate and thrive.
        </p>

        {/* Stats Section */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* "In 5 years" heading */}
          <h2 className="text-3xl md:text-2xl font-serif text-primary-300 mb-14">In 5 years</h2>
          
          {/* Stats grid - elegant and refined */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`space-y-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                {/* Stat value - medium weight for elegance */}
                <div className="text-5xl md:text-6xl lg:text-6xl font-semibold text-white font-sans tracking-normal">
                  {stat.value}
                </div>
                
                {/* Stat label - clean and professional */}
                <div className="text-gray-200 font-sans text-sm md:text-base font-medium tracking-wider uppercase pt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}