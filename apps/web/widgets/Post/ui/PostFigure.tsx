import Image from "next/image";

interface PostFigureProps {
  title: string;
  anonsImage?: string | null;
}

export function PostFigure({ title, anonsImage }: PostFigureProps) {
  const hasImage = Boolean(anonsImage);

  return (
    <figure className="mt-8 mb-10">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
        {hasImage ? (
          <Image
            src={anonsImage as string}
            alt={title}
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6]">
            <span className="text-white/30 text-4xl font-bold">НЦФГ</span>
          </div>
        )}
      </div>
    </figure>
  );
}
