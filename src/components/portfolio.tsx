"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

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

    const section = document.getElementById('portfolio');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => [...prev, id]);
  };

  const programs = [
    {
      id: 1,
      title: "Law Hub: Inmate Legal Advocacy Program",
      description: "A program that mobilizes legal volunteers to represent inmates awaiting trial within the Nigerian prison system.",
      objectives: [
        "Drastically reduce the percentage of inmates awaiting trial across Nigerian prisons",
        "Ensure innocence is established and freedom secured for unjustly detained inmates",
        "Restore hope to the hopeless",
        "Help lawyers build portfolios and position them for opportunities"
      ],
      image: {
        src: "/images/portfolio/lawyer.jpg",
        alt: "Courtroom legal advocacy scene with lawyers and judges bench"
      }
    },
    {
      id: 2,
      title: "Beyond Bars",
      description: "A program addressing the diverse needs of incarcerated individuals to create positive impact across correctional facilities.",
      objectives: [
        "Improve overall health and living conditions",
        "Provide essential needs such as food, clothing, and hygiene",
        "Create a safe and dignified environment",
        "Equip inmates with skills for reintegration"
      ],
      image: {
        src: "/images/portfolio/inchains.jpg",
        alt: "Black and white photograph of prison bars and incarceration facility",
        grayscale: true
      }
    },
    {
      id: 3,
      title: "Inmate Rebuilder Academy",
      description: "A program focused on continuing inmate education and productive engagement for reintegration into society.",
      objectives: [
        "Offer scholarships to outstanding students",
        "Create platforms for academic development",
        "Increase usefulness after serving sentences"
      ],
      image: {
        src: "/images/portfolio/book.jpg",
        alt: "Educational books and learning materials representing inmate education programs"
      }
    },
    {
      id: 4,
      title: "IR Rehabilitation Clinic",
      description: "A spiritual support program providing religious counseling and guidance to inmates.",
      objectives: [
        "Improve mental and spiritual well-being",
        "Reduce recidivism",
        "Support reintegration into society"
      ],
      image: {
        src: "/images/portfolio/pastor.jpg",
        alt: "Calm reflective person in religious attire providing spiritual guidance"
      },
      comingSoon: true
    }
  ];

  return (
    <section id="portfolio" className="bg-[#F8FFFF] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Section Heading with Animation */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-bold text-gray-900 text-4xl md:text-5xl mb-16 md:mb-20">
            Dive into Our<br />
            Program Portfolio
          </h2>
        </div>
        
        {/* Main Layout Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          
          {/* Vertical Divider with Animation */}
          <div 
            className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 transition-all duration-1000 ${
              isVisible ? "opacity-100 h-full" : "opacity-0 h-0"
            }`}
            style={{ transitionDelay: '300ms' }}
          ></div>
          
          {programs.map((program, index) => {
            const isEven = index % 2 === 0;
            const rowIndex = Math.floor(index / 2);
            const columnDelay = isEven ? 0 : 100;
            const baseDelay = 200 + (rowIndex * 200) + columnDelay;
            
            return (
              <div 
                key={program.id} 
                className={`space-y-6 pb-8 border-b border-gray-200 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  isEven ? 'md:pr-6' : 'md:pl-6'
                }`}
                style={{ transitionDelay: `${baseDelay}ms` }}
              >
                {/* Title with animation */}
                <div className="overflow-hidden">
                  <h3 
                    className={`text-[#61A326] font-semibold text-xl transition-all duration-500 ${
                      isVisible ? "translate-y-0" : "translate-y-4"
                    }`}
                    style={{ transitionDelay: `${baseDelay + 100}ms` }}
                  >
                    {program.title}
                    {program.comingSoon && (
                      <span className="text-sm font-normal text-gray-500 ml-1">[coming soon]</span>
                    )}
                  </h3>
                </div>
                
                {/* Description with animation */}
                <p 
                  className={`text-gray-600 leading-relaxed transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${baseDelay + 200}ms` }}
                >
                  {program.description}
                </p>
                
                {/* Objectives with animation */}
                <div 
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${baseDelay + 300}ms` }}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                    Objectives
                  </h4>
                  <ul className="space-y-3">
                    {program.objectives.map((objective, idx) => (
                      <li 
                        key={idx} 
                        className={`flex items-start gap-3 transition-all duration-300 ${
                          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                        }`}
                        style={{ transitionDelay: `${baseDelay + 400 + (idx * 50)}ms` }}
                      >
                        <svg 
                          className={`w-5 h-5 text-[#61A326] flex-shrink-0 mt-0.5 transition-all duration-300 ${
                            isVisible ? "scale-100 rotate-0" : "scale-0 -rotate-45"
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Image with animation */}
                <div 
                  className={`relative w-full h-64 overflow-hidden rounded-lg transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${baseDelay + 500}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent transition-opacity duration-1000 ${
                    loadedImages.includes(program.id) ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  <Image
                    src={program.image.src}
                    alt={program.image.alt}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      loadedImages.includes(program.id) 
                        ? `${program.image.grayscale ? 'grayscale' : ''} scale-100` 
                        : 'scale-110 blur-sm'
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onLoad={() => handleImageLoad(program.id)}
                    priority={index < 2} // Prioritize first two images
                  />
                  
                  {/* Decorative overlay */}
                  <div 
                    className={`absolute inset-0 border border-white/20 transition-all duration-1000 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${baseDelay + 600}ms` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Optional decorative elements */}
        {/* <div className={`flex justify-center mt-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((dot) => (
              <div 
                key={dot}
                className={`w-2 h-2 rounded-full bg-[#61A326] transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{ transitionDelay: `${800 + (dot * 100)}ms` }}
              ></div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Portfolio;