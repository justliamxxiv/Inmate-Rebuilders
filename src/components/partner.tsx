import Image from 'next/image';

export default function PartneringSection() {
  return (
    <section className="w-full bg-[#F6FBF8] py-12 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-24">
          {/* Left column */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Partnering with<br />Purpose
            </h2>
          </div>
          
          {/* Right column */}
          <div className="w-full lg:w-1/2">
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              By partnering with us, your organisation can make a significant impact on the lives of those most in need. Ready to make a difference? Contact us today at<br />
              <span className="text-green-600 font-semibold mt-2 inline-block">theinmaterebuilders@gmail.com</span>
            </p>
          </div>
        </div>
        
        {/* Image with responsive height - won't get too small on mobile */}
        <div className="relative mt-12 md:mt-16 w-full">
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[440px] overflow-hidden rounded-lg">
            <Image
              src="/images/components/hands.png"
              alt="Two people holding hands viewed from above"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}