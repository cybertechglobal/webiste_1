import { getCompany } from "@/lib/company/get-company";
import { IconMapPinFilled, IconPhoneFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const company = await getCompany();

  return (
    <header className="relative z-10 min-h-14 pt-5 lg:pt-10">
      <div className="px-4 lg:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-5">
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
              <div>
                {company?.address}, {company?.city} {company?.postalCode}
              </div>
              <IconMapPinFilled className="text-primary-500 size-3.5 shrink-0" />
            </div>
            <div className="flex items-center justify-end gap-x-2 text-sm font-light text-white">
              <a href={company?.phone ? `tel:${company.phone}` : ""}>
                {company?.phone}
              </a>
              <IconPhoneFilled className="text-primary-500 size-3.5 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
