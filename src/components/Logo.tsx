import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="relative h-12 w-auto" style={{ minWidth: '180px' }}>
        <Image
          src="/images/logos/logo.png"
          alt="Inmate Rebuilders Logo"
          width={180}
          height={48}
          className="object-contain"
          priority
          unoptimized={true} // Bypass Next.js optimization if needed
        />
      </div>
    </div>
  );
}
