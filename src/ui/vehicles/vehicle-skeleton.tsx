export default function VehicleSkeleton() {
  return (
    <div className="flex flex-col bg-zinc-800 p-4 shadow lg:flex-row lg:gap-x-4">
      <div className="h-48 w-full animate-pulse bg-zinc-700 lg:h-55.5 lg:w-74" />
      <div>
        <div className="mt-4 h-6 w-3/4 animate-pulse bg-zinc-700 lg:mt-0 lg:w-60" />
        <div className="mt-1 h-5 w-1/2 animate-pulse bg-zinc-700 lg:w-2/3" />
        <div className="mt-4 h-9 w-1/3 animate-pulse bg-zinc-700 lg:mt-2.25 lg:w-1/2" />
        <div className="mt-3 h-6 w-30 animate-pulse bg-zinc-700" />
        <div className="mt-1.75 h-6 w-28 animate-pulse bg-zinc-700" />
        <div className="mt-1.75 h-6 w-32 animate-pulse bg-zinc-700" />
        <div className="mt-1.75 h-6 w-24 animate-pulse bg-zinc-700" />
      </div>
    </div>
  );
}
