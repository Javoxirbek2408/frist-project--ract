import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[#ede9e9] animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
