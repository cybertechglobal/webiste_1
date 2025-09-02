import { IconMapPinFilled, IconPhoneFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-10 min-h-14 pt-5 lg:pt-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 px-4 lg:px-6">
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
          <div className="flex items-center gap-x-2 text-sm font-light text-white">
            <div>Address name 123, City 90321</div>
            <IconMapPinFilled className="text-primary size-3.5 shrink-0" />
          </div>
          <div className="flex items-center justify-end gap-x-2 text-sm font-light text-white">
            <Link href="tel:+381 69 123 456">+381 69 123 456</Link>
            <IconPhoneFilled className="text-primary size-3.5 shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}
