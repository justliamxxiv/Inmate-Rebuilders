"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type TabType = "legal" | "welfare" | "media" | "logistics";

// Shared Background Component
const TabSectionBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative pt-12 md:pt-24 pb-16 px-6">
      {/* Shared Background Image */}
      <Image
        src="/images/team/white-paper-bg.jpg"
        alt="Background"
        fill
        className="absolute inset-0 w-full h-full z-0 pointer-events-none object-cover"
        priority
        sizes="100vw"
      />

      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')`,
        }}
      ></div>

      {/* Content */}
      {children}
    </div>
  );
};

export default function Team() {
  const [activeTab, setActiveTab] = useState<TabType>("legal");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Mobile only
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tabs: { id: TabType; label: string }[] = [
    { id: "legal", label: "Legal Personnel" },
    { id: "welfare", label: "Welfare" },
    { id: "media", label: "Media and Publicity" },
    { id: "logistics", label: "Logistics" },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  // Render content based on screen size
  const renderContent = () => {
    // On mobile, show all sections stacked
    if (isMobile) {
      return (
        <div>
          <LegalContent />
          <WelfareContent />
          <MediaContent />
          <LogisticsContent />
        </div>
      );
    }

    // On tablet and larger, show only active tab
    switch (activeTab) {
      case "legal":
        return <LegalContent />;
      case "welfare":
        return <WelfareContent />;
      case "media":
        return <MediaContent />;
      case "logistics":
        return <LogisticsContent />;
      default:
        return <LegalContent />;
    }
  };

  return (
    <section className="recruitment-wrapper relative w-full bg-[#EEF3F2] overflow-hidden">
      {/* TOP IMAGE CONTAINER - Only show on tablet and larger screens */}
      {!isMobile && (
        <div className="relative w-full h-[320px] md:h-[400px] lg:h-[320px]">
          <Image
            src="/images/team/girls.png"
            alt="Background"
            fill
            className="absolute inset-0 h-full z-0 pointer-events-none object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/10"></div>

          {/* CATEGORY TABS — Positioned at bottom of image */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 items-end gap-5 w-full md:w-[80%] justify-center px-4 tab-container hidden md:flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn flex-1 px-4 lg:px-6 py-4 font-semibold text-sm rounded-t-2xl text-center tracking-wide whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#1B4332] text-white"
                    : "bg-white text-gray-800 hover:text-gray-900 "
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Content - Shows all on mobile, active tab only on tablet+ */}
      {renderContent()}
    </section>
  );
}

// Sub-components for each tab content
function LegalContent() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TabSectionBackground>
      <div className="relative z-10" data-content="legal">
        {/* HEADING */}
        <div className="max-w-lg mx-auto text-center mb-10">
          <h2 className="text-[#1a1a1a] font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide uppercase">
            Are you a lawyer passionate about justice? Join us and use your
            legal expertise to advocate for fair representation and access to
            justice for all.
          </h2>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mb-16">
          <button
            className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-[#333333] text-[#333333] font-medium text-sm rounded-full hover:bg-[#333333] hover:text-white transition-all duration-300 tracking-wide"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => console.log("Join legal team clicked")}
            style={{
              backgroundColor: isHovered ? "#333333" : "transparent",
              color: isHovered ? "white" : "#333333",
            }}
          >
            Join our team of lawyers
          </button>
        </div>

        {/* SINGLE CENTERED IMAGE - Larger on mobile */}
        <div className="w-full px-4">
          <div className="relative flex justify-center items-center">
            <div className="w-full flex justify-center">
              <Image
                src="/images/team/illustration1.png"
                alt="Legal Team Illustration"
                width={900}
                height={300}
                className="mx-auto w-full max-w-[900px] h-auto"
                priority
                sizes="(max-width: 640px) 98vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 900px"
              />
            </div>
          </div>
        </div>
      </div>
    </TabSectionBackground>
  );
}

function WelfareContent() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TabSectionBackground>
      <div className="relative z-10" data-content="welfare">
        {/* HEADING */}
        <div className="max-w-lg mx-auto text-center mb-10">
          <h2 className="text-[#1a1a1a] font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide uppercase">
            Your care can be a lifeline for individuals rebuilding their lives.
            Join us as a welfare volunteer and provide essential support and
            care to inmates in need.
          </h2>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mb-16">
          <button
            className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-[#333333] text-[#333333] font-medium text-sm rounded-full hover:bg-[#333333] hover:text-white transition-all duration-300 tracking-wide"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => console.log("Join welfare team clicked")}
            style={{
              backgroundColor: isHovered ? "#333333" : "transparent",
              color: isHovered ? "white" : "#333333",
            }}
          >
            Join our welfare unit
          </button>
        </div>

        <div className="w-full px-4">
          <div className="relative flex justify-center items-center">
            <div className="w-full flex justify-center">
              <Image
                src="/images/team/illustration2.png"
                alt="Welfare Team Illustration"
                width={484}
                height={300}
                className="mx-auto w-full max-w-[600px] h-auto"
                priority
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </TabSectionBackground>
  );
}

function MediaContent() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TabSectionBackground>
      <div className="relative z-10" data-content="media">
        {/* HEADING */}
        <div className="max-w-lg mx-auto text-center mb-10">
          <h2 className="text-[#1a1a1a] font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide uppercase">
            Love storytelling? Join us as a media volunteer and help amplify our
            mission and the inspiring stories of individuals we empower.
          </h2>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mb-16">
          <button
            className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-[#333333] text-[#333333] font-medium text-sm rounded-full hover:bg-[#333333] hover:text-white transition-all duration-300 tracking-wide"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => console.log("Join media team clicked")}
            style={{
              backgroundColor: isHovered ? "#333333" : "transparent",
              color: isHovered ? "white" : "#333333",
            }}
          >
            Join our media crew
          </button>
        </div>

        <div className="w-full px-4">
          <div className="relative flex justify-center items-center">
            <div className="w-full flex justify-center">
              <Image
                src="/images/team/illustration3.png"
                alt="Media Team Illustration"
                width={700}
                height={300}
                className="mx-auto w-full max-w-[800px] h-auto"
                priority
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 800px"
              />
            </div>
          </div>
        </div>
      </div>
    </TabSectionBackground>
  );
}

function LogisticsContent() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TabSectionBackground>
      <div className="relative z-10" data-content="logistics">
        {/* HEADING */}
        <div className="max-w-lg mx-auto text-center mb-10">
          <h2 className="text-[#1a1a1a] font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide uppercase">
            Organized and ready to help? Offer your organizational talents to
            manage events, fundraising initiatives, or resource distribution. 
          </h2>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mb-16">
          <button
            className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-[#333333] text-[#333333] font-medium text-sm rounded-full hover:bg-[#333333] hover:text-white transition-all duration-300 tracking-wide"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => console.log("Join logistics team clicked")}
            style={{
              backgroundColor: isHovered ? "#333333" : "transparent",
              color: isHovered ? "white" : "#333333",
            }}
          >
            Join our logistics unit
          </button>
        </div>

        <div className="w-full px-4">
          <div className="relative flex justify-center items-center">
            <div className="w-full flex justify-center">
              <Image
                src="/images/team/illustration4.png"
                alt="Logistics Team Illustration"
                width={700}
                height={300}
                className="mx-auto w-full max-w-[800px] h-auto"
                priority
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 800px"
              />
            </div>
          </div>
        </div>
      </div>
    </TabSectionBackground>
  );
}
