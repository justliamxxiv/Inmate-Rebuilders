import Image from "next/image";

export default function Divider() {
  return (
    <div className="w-screen">
      <Image
        src="/images/components/demacation.svg"
        alt="Decorative section divider"
        width={1920}
        height={80}
        className="w-full object-contain"
        priority
      />
    </div>
  );
}
