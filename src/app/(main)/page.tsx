import { logos, navigation } from "@/lib/definitions";
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
    <main className="relative grow pt-10 pb-15 sm:pt-16">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center lg:px-6">
        <h1 className="text-center text-[50px]/12.5 font-medium text-white">
          Risus quis at <span className="text-primary-500">nisi nunc</span>
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
                className="border-white px-9 py-4 text-xl first:border-t last:border-b"
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

      <div className="no-scrollbar @container mt-15 overflow-x-scroll lg:mt-29">
        <div className="-mx-8 flex gap-x-7.5 @min-md:mx-0 @min-md:justify-center">
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
                className="transition-[filter] hover:brightness-150"
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
