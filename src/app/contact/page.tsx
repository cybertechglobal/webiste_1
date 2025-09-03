import ExternalLink from "@/ui/components/external-link";
import GoBack from "@/ui/components/go-back";
import Input from "@/ui/components/input";
import Textarea from "@/ui/components/text-area";
import { IconViber } from "@/ui/icons/viber";
import { IconBrandTelegram, IconBrandWhatsapp } from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page",
  description: "This is the contact page description",
  keywords: "These, are, the, contact, page, keywords",
};

export default function Page() {
  return (
    <main className="relative mx-auto mt-5 mb-14 max-w-7xl grow px-4 lg:mb-15 lg:px-6">
      <GoBack />
      <h1 className="mt-1 text-[50px]/12.5 text-[40px] font-medium text-white lg:mt-4 lg:text-[50px]/12.5">
        Get in <span className="text-primary-500">touch</span>
      </h1>
      <div className="mt-7.5 grid gap-x-5 lg:mt-4 lg:mb-16 lg:grid-cols-2">
        <div>
          <p className="text-base/7 text-white">
            Posuere ullamcorper egestas et massa. Risus habitant enim ac et
            aliquam mi. Natoque massa massa tortor vestibulum viverra.
          </p>
          <form className="relative mb-12.5 lg:mb-0">
            <div className="mt-5 grid gap-x-5 gap-y-2.5 lg:grid-cols-2">
              <Input placeholder="Name & Surname*" />
              <Input placeholder="Company Name" />
            </div>
            <div className="mt-2.5 grid gap-x-5 gap-y-2.5 lg:mt-3.25 lg:grid-cols-2">
              <Input placeholder="Email address*" />
              <Input placeholder="Phone number" />
            </div>
            <div className="mt-2.5 lg:mt-3.25">
              <Textarea
                placeholder="Your message*"
                rows={8}
                className="max-h-[500px]"
              />
            </div>
            <div className="mt-6 grid gap-x-5.75 lg:mt-4 lg:grid-cols-2">
              <button className="btn-primary px-6 py-2.5 text-lg">
                Send a message
              </button>
            </div>
          </form>
        </div>
        <div className="self-end overflow-hidden">
          <iframe
            title="Google maps of company"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.9765787601254!2d20.466317525248122!3d44.81021800724598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa501a8a9f3%3A0xc6a381731628cb98!2sSt.%20Mark%20Orthodox%20Church!5e0!3m2!1sen!2srs!4v1756829733164!5m2!1sen!2srs"
            width="588"
            height="295"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-65"
          />
          <div className="mt-6.5 flex items-center gap-x-2 pb-3">
            <div className="mr-1 text-white">Also available on:</div>
            <ExternalLink
              href="#"
              className="mr-1"
              aria-label="Contact on viber"
            >
              <IconViber className="text-primary-500" />
            </ExternalLink>
            <ExternalLink href="#">
              <IconBrandWhatsapp
                className="text-primary-500 size-6.5 stroke-[1.75]"
                aria-label="Contact on whatsapp"
              />
            </ExternalLink>
            <ExternalLink href="#">
              <IconBrandTelegram
                className="text-primary-500 size-6.5 stroke-[1.75]"
                aria-label="Contact on telegram"
              />
            </ExternalLink>
          </div>
        </div>
      </div>
    </main>
  );
}
