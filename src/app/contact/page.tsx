import ExternalLink from "@/ui/components/external-link";
import GoBackButton from "@/ui/components/go-back-button";
import Input from "@/ui/components/input";
import Textarea from "@/ui/components/text-area";
import { IconViber } from "@/ui/icons/viber";
import Map from "@/ui/map";
import { IconBrandTelegram, IconBrandWhatsapp } from "@tabler/icons-react";
import { domAnimation, LazyMotion } from "motion/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Welcome to the contact page of [Dealership Name], your trusted destination for premium vehicles and exceptional customer service. Reach out to our friendly team for inquiries about our extensive inventory, financing options, or to schedule a test drive. Whether you're looking for a new car, a certified pre-owned vehicle, or professional auto services, we're here to assist you every step of the way. Contact us via phone, email, or our convenient online form, and let us help you find your dream car today!",
  keywords:
    "Car Dealership, Contact Us, Auto Sales, Vehicle Financing, Test Drive, Customer Service, New Cars, Pre-Owned Vehicles, Automotive Services, Car Inquiry",
};

export default function Page() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="relative grow">
        <div className="mt-5 mb-14 px-4 lg:mb-15 lg:px-6">
          <div className="mx-auto max-w-7xl">
            <GoBackButton />
            <h1 className="mt-1 text-[50px]/12.5 text-[40px] font-medium text-white lg:mt-4 lg:text-[50px]/12.5">
              Get in <span className="text-primary-500">touch</span>
            </h1>
            <div className="mt-7.5 grid gap-x-5 lg:mt-4 lg:mb-16 lg:grid-cols-2">
              <div>
                <p className="text-base/7 text-white">
                  Posuere ullamcorper egestas et massa. Risus habitant enim ac
                  et aliquam mi. Natoque massa massa tortor vestibulum viverra.
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
                      className="max-h-44 resize-none"
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
                <Map />
                <div className="mt-3.5 flex items-center pb-2">
                  <div className="mr-2 text-white">Also available on:</div>
                  <ExternalLink
                    href="#"
                    className="text-primary-500 hover:text-primary-700 rounded-sm p-2 transition-colors"
                    aria-label="Contact on viber"
                  >
                    <IconViber />
                  </ExternalLink>
                  <ExternalLink
                    href="#"
                    className="text-primary-500 hover:text-primary-700 rounded-sm p-2 transition-colors"
                  >
                    <IconBrandWhatsapp
                      className="size-7 stroke-[1.75]"
                      aria-label="Contact on whatsapp"
                    />
                  </ExternalLink>
                  <ExternalLink
                    href="#"
                    className="text-primary-500 hover:text-primary-700 rounded-sm p-2 transition-colors"
                  >
                    <IconBrandTelegram
                      className="size-7 stroke-[1.75]"
                      aria-label="Contact on telegram"
                    />
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LazyMotion>
  );
}
