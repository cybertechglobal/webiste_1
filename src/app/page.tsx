import Image from "next/image";
import Link from "next/link";

const navigation = [
  {
    id: 1,
    label: "Vehicles List",
    href: "/vehicles",
  },
  {
    id: 2,
    label: "About Us",
    href: "/about",
  },
  {
    id: 3,
    label: "Services",
    href: "/services",
  },
  {
    id: 4,
    label: "Contact Us",
    href: "/contact",
  },
];

const logos = [
  {
    id: 1,
    src: "/home-page/logo1.png",
    make: "maserati",
  },
  {
    id: 2,
    src: "/home-page/logo2.png",
    make: "ford",
  },
  {
    id: 3,
    src: "/home-page/logo3.png",
    make: "bmw",
  },
  {
    id: 4,
    src: "/home-page/logo4.png",
    make: "audi",
  },
  {
    id: 5,
    src: "/home-page/logo5.png",
    make: "kia",
  },
];

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
