import { formatDate } from "@/shared/lib/format";

interface PostHeaderProps {
  title: string;
  tags: string[];
  createdAt: string;
}

export function PostHeader({ title, tags, createdAt }: PostHeaderProps) {
  return (
    <header className="text-center">
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm mb-4">
        {tags[0] && (
          <span className="text-[#3B82F6] font-medium uppercase">
            {tags[0]}
          </span>
        )}
        {tags[0] && <span className="text-[#94A3B8]">•</span>}
        <time className="text-[#94A3B8]">{formatDate(createdAt)}</time>
      </div>
      <h1 className="text-[28px] md:text-[36px] lg:text-[42px] leading-tight font-bold text-[#1E3A5F]">
        {title}
      </h1>
    </header>
  );
}
