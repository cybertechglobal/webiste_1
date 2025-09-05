import { servicesCards } from "@/lib/definitions";
import GoBackButton from "@/ui/components/go-back-button";
import ServicesCard from "@/ui/services-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Page",
  description: "This is the services page description",
  keywords: "These, are, the, services, page, keywords",
};

export default function Page() {
  return (
    <main className="relative grow">
      <div className="mt-5 mb-14 px-4 lg:mb-15 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <GoBackButton />
          <h1 className="mt-1 text-[50px]/12.5 text-[40px] font-medium text-white lg:mt-4 lg:text-[50px]/12.5">
            Our <span className="text-primary-500">services</span>
          </h1>
          <div className="mt-7.5 text-base/7 text-white lg:mt-4">
            <p>
              Arcu ipsum senectus nullam amet imperdiet. Turpis pellentesque eu
              sapien diam eu tempor. Convallis sollicitudin gravida aenean
              turpis nec faucibus in ac. Tristique enim amet pellentesque elit
              ornare ac duis faucibus dolor. Suspendisse iaculis diam nascetur
              placerat vel eget lobortis nullam. Consectetur at massa augue
              tellus quis morbi rhoncus. Ut et cursus quis nunc mauris euismod
              quisque mi. Egestas morbi eget sagittis volutpat blandit erat
              mauris mi integer. In suspendisse integer aliquam leo ut faucibus
              nunc. Leo vitae malesuada arcu integer donec.
            </p>
            <p className="mt-3">
              Egestas quisque quam ullamcorper eu urna volutpat amet ultrices.
              Odio massa urna ornare eget commodo. Lacus morbi ut blandit nisl
              sed vitae. Pharetra velit vestibulum enim faucibus eget malesuada.
              Vestibulum nunc ut vulputate id turpis egestas suspendisse amet.
            </p>
            <div className="mt-7.5 grid gap-5 md:grid-cols-3">
              {servicesCards.map(({ id, title, Icon, body }) => (
                <ServicesCard key={id} title={title} Icon={Icon} body={body} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
