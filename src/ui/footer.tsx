import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";
import ExternalLink from "./components/external-link";

export default function Footer() {
  return (
    <footer className="border-border relative w-full border-t">
      <div className="px-4 pt-2 pb-4 lg:px-6 lg:py-2">
        <div className="mx-auto grid max-w-7xl items-center justify-items-center gap-2.5 lg:grid-cols-3 lg:justify-items-start">
          <div className="-ml-2.5 flex items-center gap-x-0.5">
            <ExternalLink
              href="https://facebook.com/"
              className="text-primary-500 p-2"
            >
              <IconBrandFacebook aria-hidden />
              <span className="sr-only">Facebook</span>
            </ExternalLink>
            <ExternalLink
              href="https://instagram.com/"
              className="text-primary-500 p-2"
            >
              <IconBrandInstagram aria-hidden />
              <span className="sr-only">Instagram</span>
            </ExternalLink>
            <ExternalLink
              href="https://tiktok.com/"
              className="text-primary-500 p-2"
            >
              <IconBrandTiktok aria-hidden />
              <span className="sr-only">Tiktok</span>
            </ExternalLink>
          </div>
          <div className="mt-6 flex items-center gap-x-2.5 justify-self-center lg:mt-0">
            <div className="text-primary-500 text-sm font-medium">
              PIB: 1234000056
            </div>
            <div className="h-4 w-px bg-white" aria-hidden />
            <div className="text-primary-500 text-sm font-medium">
              MB: 98765432
            </div>
          </div>
          <div className="text-sm font-light text-white lg:justify-self-end">
            Company Name &copy; All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
