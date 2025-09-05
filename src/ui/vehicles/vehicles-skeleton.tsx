export default function VehiclesSkeleton() {
  return (
    <>
      <div className="mt-1 flex flex-col flex-wrap justify-between gap-x-4 md:flex-row md:items-center lg:mt-4">
        <div className="h-10 w-40 animate-pulse bg-zinc-700 lg:h-12 lg:w-54.5" />
        <div className="relative mt-2 h-6 w-34 md:order-3 md:basis-full">
          <div className="absolute inset-0 w-36 animate-pulse bg-zinc-700"></div>
        </div>
        <div className="mt-7.5 h-10 w-full animate-pulse bg-zinc-700 md:mt-0 md:w-44" />
      </div>

      <div className="mt-10 lg:mt-7.5">
        <div className="grid gap-5 sm:grid-cols-2">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col bg-zinc-800 p-4 shadow lg:flex-row lg:gap-x-4"
            >
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
          ))}
        </div>
        <div className="mx-auto mt-10 h-11 w-70 animate-pulse bg-zinc-700 lg:mt-15" />
      </div>
    </>
  );
}
