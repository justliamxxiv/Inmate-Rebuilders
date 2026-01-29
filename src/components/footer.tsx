import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  // Get current year dynamically
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[#F6FBF8] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Quote */}
        <div className="flex justify-end mb-12 md:mb-24">
          <div className="max-w-md">
            <p className="font-nunito text-xl md:text-2xl leading-relaxed text-gray-900 tracking-widest md:tracking-widest">
  "No one truly knows a nation until one has been inside its jails. A nation should not be judged by how it treats its highest citizens, but its lowest ones."
</p>
            <p className="mt-4 font-nunito md:mt-6 text-sm uppercase tracking-wider text-gray-700">
              — Nelson Mandela
            </p>
          </div>
        </div>

        {/* CTA Buttons - Always in a row, responsive sizing */}
        <div className="flex flex-row justify-center items-center mb-16 md:mb-28 gap-2 sm:gap-3 md:gap-4 max-w-full">
          {["Donate", "Volunteer", "Partners"].map((item) => (
            <Link
              key={item}
              href="#"
              className="
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
                transition-all duration-200
                hover:bg-black/5 hover:border-black/50
                px-3 sm:px-4 md:px-6
              "
            >
              {item}
              <span className="ml-1 sm:ml-2 md:ml-4 text-sm sm:text-lg md:text-2xl">↗</span>
            </Link>
          ))}
        </div>

        {/* Bottom Content - Logo/copyright on left for desktop, contact on right
            On mobile: contact first, then logo/copyright */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 md:gap-12">
          {/* Brand - Logo and copyright - Left on desktop, bottom on mobile */}
          <div className="flex flex-col items-start order-2 lg:order-1">
            <div className="w-48">
              <Image
                src="/images/logos/logo.png"
                alt="Inmate Rebuilders Logo"
                width={256}
                height={256}
                className="w-full h-auto"
                priority
              />
            </div>
            <p className="text-sm text-gray-700 mt-2">
              © {currentYear}. All rights reserved.
            </p>
          </div>

          {/* Contact - Right on desktop, top on mobile */}
          <div className="max-w-sm lg:text-right order-1 lg:order-2">
            <p className="text-sm text-gray-700 leading-relaxed">
              For inquiries about volunteering, partnerships, or support,
              contact us at{" "}
              <span className="underline">
                theinmaterebuilders@gmail.com
              </span>
            </p>
            <Link
              href="#"
              className="inline-flex items-center mt-4 text-sm font-medium"
            >
              Instagram <span className="ml-2">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}