import React from "react";
import Image from "next/image";
import AboutUs from "@/components/AboutUs";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] md:min-h-[50vh] lg:min-h-[50vh]">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/herobg.jpg"
      alt="Group of people standing together in unity"
      fill
      priority
      className="object-cover object-top grayscale" // Changed from object-center to object-top
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* Hero Text - Now positioned absolutely to center it independently */}
  <div className="absolute inset-0 z-10 flex items-center justify-center">
    <div className="w-full max-w-[590px] mx-auto px-6 md:px-8 lg:px-12 text-center">
      <h1 className=" text-white text-[32px] md:text-[44px] lg:text-[56px] font-medium leading-[1.2] tracking-tight">
        We envision a nation where every{" "}
        <em className="italic ">inmate&apos;s life matters.</em>
      </h1>
    </div>
  </div>
</section>

      {/* Mission Statement */}
      <section className="w-full bg-[#F8FFFF] py-16 md:py-20 lg:py-[80px]">
        <div className="w-full max-w-[600px] mx-auto px-6 md:px-8">
          <p className="text-gray-800 text-base md:text-lg leading-relaxed text-center font-normal">
            Inmate Rebuilder, a non-governmental organization (NGO) dedicated to
            empowering incarcerated individuals, provides legal support,
            rehabilitation tools, and improves overall well-being. We believe
            in upholding human dignity and guiding inmates towards a positive
            future. Ultimately, our mission aims to reduce recidivism rates and
            contribute to a safer society.
          </p>
        </div>
      </section>

      {/* Existing AboutUs component */}
      <AboutUs showMore={false} />
    </>
  );
}