import { Skeleton } from "@/components/ui/skeleton";

export function VideoDetailsSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-11 w-full">
        <Skeleton className="w-[366px] h-[188px] rounded-md bg-zinc-800" />
        <Skeleton className="w-[366px] h-7 mt-3 bg-zinc-800" />
      </div>
      <Skeleton className="w-full h-[32px] bg-zinc-800" />
      <Skeleton className="w-full h-[32px] bg-zinc-800" />
    </div>
  );
}
