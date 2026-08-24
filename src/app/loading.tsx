import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container-page space-y-4 py-16">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full max-w-2xl" />
      <Skeleton className="h-4 w-full max-w-xl" />
    </div>
  )
}
