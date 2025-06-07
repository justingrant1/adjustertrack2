import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="mb-6">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  )
}