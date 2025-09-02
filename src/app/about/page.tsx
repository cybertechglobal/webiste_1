import { logos } from "@/lib/data/static";
import GoBack from "@/ui/components/go-back";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Page",
  description: "This is the about page description",
  keywords: "These, are, the, about, page, keywords",
};

export default function Page() {
  return (
    <main className="relative mx-auto mt-5 mb-9 max-w-7xl grow px-4 lg:mb-11 lg:px-6">
      <GoBack />
      <h1 className="mt-1 text-[50px]/12.5 font-medium text-white lg:mt-4">
        Who are <span className="text-primary">we</span>?
      </h1>
      <div className="mt-7.5 flex flex-col gap-7.5 min-[1180px]:flex-row lg:mt-4">
        <div className="text-base/7 text-white">
          <p>
            Posuere ullamcorper egestas et massa. Risus habitant enim ac et
            aliquam mi. Natoque massa massa tortor vestibulum viverra.
            Consectetur consequat luctus est a sit sapien ultricies quis. Ipsum
            amet urna feugiat aenean. Faucibus ornare porttitor vitae vivamus
            nisi volutpat.
          </p>
          <p className="mt-3">
            Ut ut ornare in mattis. Viverra etiam cursus natoque vivamus amet
            elit sit faucibus euismod. Suspendisse suspendisse mattis lorem
            malesuada egestas in luctus. Purus risus bibendum neque turpis
            pharetra. At aliquet mi et sem pretium vitae odio massa vulputate.
            Ornare sagittis imperdiet vitae dui eget venenatis rhoncus. Id amet
            ut risus leo. Suspendisse arcu nulla neque at. Eu sapien
            pellentesque non ac nulla sed imperdiet vitae dui.
          </p>
        </div>
        <Image
          src="/about-page/company.jpg"
          alt="Company name"
          width={588}
          height={273}
          className="max-h-[273px]"
        />
      </div>
      <h2 className="mt-7.5 text-3xl font-medium text-white lg:mt-10">
        Our partners:
      </h2>
      <div className="no-scrollbar md:scrollbar mt-7.5 flex gap-x-7.5 overflow-x-scroll pb-5">
        {logos.map(({ id, make, src }) => (
          <Image
            key={id}
            src={src}
            alt={make}
            width={82}
            height={35}
            className="shrink-0 select-none md:select-auto"
            draggable={false}
          />
        ))}
        {logos.map(({ id, make, src }) => (
          <Image
            key={id}
            src={src}
            alt={make}
            width={82}
            height={35}
            className="shrink-0 select-none md:select-auto"
            draggable={false}
          />
        ))}
      </div>
    </main>
  );
}
