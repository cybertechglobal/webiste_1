import { IconMapPinFilled, IconPhoneFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="min-h-14 relative pt-5 lg:pt-10 z-10">
      <div className="flex flex-wrap gap-x-8 items-center justify-between max-w-7xl mx-auto px-4 lg:px-6">
        <Link href="/" aria-label="Go to homepage" prefetch={false}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={183}
            height={54}
            className="transition-opacity duration-200"
          />
        </Link>
        <div className="ml-auto">
          <div className="text-sm text-white font-light items-center flex gap-x-2">
            <div>Address name 123, City 90321</div>
            <IconMapPinFilled className="text-primary size-3.5 shrink-0" />
          </div>
          <div className="text-sm justify-end text-white font-light items-center flex gap-x-2">
            <Link href="tel:+381 69 123 456">+381 69 123 456</Link>
            <IconPhoneFilled className="text-primary size-3.5 shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}
