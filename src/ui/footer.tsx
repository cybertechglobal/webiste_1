import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";
import ExternalLink from "./components/external-link";

export default function Footer() {
  return (
    <footer className="w-full relative border-t border-border">
      <div className="max-w-7xl mx-auto pb-4 pt-2 lg:py-2 px-4 lg:px-6 grid gap-2.5 lg:grid-cols-3 justify-items-center lg:justify-items-start items-center">
        <div className="flex items-center -ml-2.5 gap-x-0.5">
          <ExternalLink
            href="https://facebook.com/"
            className="p-2 text-primary"
          >
            <IconBrandFacebook aria-hidden />
            <span className="sr-only">Facebook</span>
          </ExternalLink>
          <ExternalLink
            href="https://instagram.com/"
            className="p-2 text-primary"
          >
            <IconBrandInstagram aria-hidden />
            <span className="sr-only">Instagram</span>
          </ExternalLink>
          <ExternalLink href="https://tiktok.com/" className="p-2 text-primary">
            <IconBrandTiktok aria-hidden />
            <span className="sr-only">Tiktok</span>
          </ExternalLink>
        </div>
        <div className="flex mt-6 lg:mt-0 gap-x-2.5 items-center justify-self-center">
          <div className="text-sm font-medium text-primary">
            PIB: 1234000056
          </div>
          <div className="w-px h-4 bg-white" aria-hidden />
          <div className="text-sm font-medium text-primary">MB: 98765432</div>
        </div>
        <div className="font-light text-sm text-white lg:justify-self-end">
          Company Name &copy; All rights reserved.
        </div>
      </div>
    </footer>
  );
}
