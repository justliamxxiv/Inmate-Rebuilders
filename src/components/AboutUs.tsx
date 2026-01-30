"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Heart,
  Scale,
  Eye,
  RefreshCw,
  Award,
  Target,
  // HandHeart,
  Gavel,
  UserCheck,
  Shield,
  Star,
} from "lucide-react";
import Image from "next/image";
export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const coreValues = [
    {
      title: "Inclusion",
      description:
        "We celebrate our differences. Every background and belief strengthens the fabric of our community.",
      src: "/images/svgs/infinity.svg",
      color: "text-blue-500",
    },
    {
      title: "Compassion",
      description:
        "We believe in empathy. Everyone has a story, and listening matters most.",
      src: "/images/svgs/love.svg",
      color: "text-red-500",
    },
    {
      title: "Representation",
      description:
        "We fight to ensure everyone, regardless of financial background, has access to legal representation.",
      src: "/images/svgs/scale.svg",
      color: "text-purple-500",
    },
    {
      title: "Empathy",
      description:
        "We meet individuals where they are, offering compassion and support to guide them towards a positive future.",
      src: "/images/svgs/handlove.svg",
      color: "text-green-500",
    },
    {
      title: "Restoration",
      description:
        "We hold firm: every inmate can be rehabilitated, reintegrated, and empowered to thrive in society once again.",
      src: "/images/svgs/bird.svg",
      color: "text-orange-500",
    },
    {
      title: "Human Dignity",
      description:
        "We stand resolute: honoring and respecting every individual, ensuring justice and dignity for all.",
      src: "/images/svgs/hand.svg",
      color: "text-indigo-500",
    },
  ];

  // Alternative icons if you prefer different ones:
  const alternativeIcons = [
    { icon: <Target className="w-8 h-8" />, color: "text-primary-500" }, // Inclusion
    // { icon: <HandHeart className="w-8 h-8" />, color: "text-primary-500" }, // Compassion
    { icon: <Gavel className="w-8 h-8" />, color: "text-primary-500" }, // Representation
    { icon: <UserCheck className="w-8 h-8" />, color: "text-primary-500" }, // Empathy
    { icon: <Shield className="w-8 h-8" />, color: "text-primary-500" }, // Restoration
    { icon: <Star className="w-8 h-8" />, color: "text-primary-500" }, // Human Dignity
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("about-us");
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
    <section id="about-us" className="py-20 bg-[#F8FFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-gray-900 mb-6">
            Our Core Values That
            <br />
            Empower Change
          </h2>
          <a
            href="#"
            className="inline-block text-primary-500 font-sans font-semibold text-lg hover:text-primary-600 transition-colors duration-300"
          >
            Learn more about us →
          </a>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className={`bg-F8FFFF p-8 rounded-2xl border border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-lg group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Icon Container */}
              <div
                className={`relative mb-6 rounded-xl bg-gray-50 inline-flex ${value.color} group-hover:bg-primary-50 transition-colors duration-300`}
              >
                {/* Removed p-4 from parent */}
                <Image
                  src={value.src}
                  alt={value.title}
                  width={48} // Adjust based on your container size (w-12 = 48px)
                  height={48}
                  className="w-12 h-12 object-cover rounded-lg" // Adjust size as needed
                  priority
                />
              </div>

              {/* Value Title */}
              <h3 className="text-2xl font-serif font-normal text-gray-900 mb-4">
                {value.title}
              </h3>

              {/* Value Description */}
              <p className="text-gray-700 font-sans text-lg leading-relaxed">
                {value.description}
              </p>

              {/* Decorative element */}
              <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-primary-200 transition-colors duration-300">
                <div className="w-12 h-1 bg-primary-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
