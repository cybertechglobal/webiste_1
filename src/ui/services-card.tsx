import { FC } from "react";

type CardProps = {
  title: string;
  Icon: FC;
  body: string;
};

export default function ServicesCard({ title, Icon, body }: CardProps) {
  return (
    <div className="bg-card px-4.5 py-5.5">
      <div className="mx-auto mt-3.5 w-fit text-white">
        <Icon />
      </div>
      <div className="text-primary-500 mx-auto mt-4.5 w-fit text-3xl font-semibold">
        {title}
      </div>
      <p className="mt-2 text-center text-sm font-light">{body}</p>
    </div>
  );
}
