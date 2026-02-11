import Image from "next/image";

export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Image
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=85"
        alt=""
        fill
        className="object-cover object-center dark:opacity-20 transition-opacity duration-500"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-white/70 dark:bg-[#0b1120]/90 transition-colors duration-500" aria-hidden />
    </div>
  );
}
