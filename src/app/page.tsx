import { logos, navigation } from "@/lib/data/static";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page description",
  keywords: "These, are, the, home, page, keywords",
};

export default function Page() {
  return (
    <div className="relative pt-10 sm:pt-16 pb-15 grow">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center lg:px-6">
        <h1 className="text-center font-medium text-white text-[50px]/12.5">
          Risus quis at <span className="text-primary">nisi nunc</span>
        </h1>
        <p className="mt-4 text-center text-white lg:mt-2">
          Eget libero venenatis integer senectus tincidunt adipiscing enim elit.
          Non netus enim id lacinia morbi id ornare malesuada amet.
        </p>
        <nav className="mt-12.5">
          <ul className="divide-y divide-white">
            {navigation.map((navItem) => (
              <li
                key={navItem.id}
                className=" text-xl py-4 px-9 first:border-t border-white last:border-b"
              >
                <Link
                  href={navItem.href}
                  prefetch={false}
                  className="text-white hover:text-white/80"
                >
                  {navItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-15 lg:mt-29 overflow-x-scroll no-scrollbar @container">
        <div className="flex gap-x-7.5 -mx-8 @min-md:mx-0 @min-md:justify-center">
          {logos.map(({ id, make, src }) => (
            <Link
              key={id}
              href={`/vehicles?make=${make}`}
              className="shrink-0"
              prefetch={false}
            >
              <Image
                src={src}
                alt={make}
                width={82}
                height={35}
                className="hover:brightness-150 transition-[filter]"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
