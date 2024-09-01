import { Skeleton } from "../atoms/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 absolute top-32 p-4 mt-2">
      <Skeleton className="h-[250px] w-[500px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}