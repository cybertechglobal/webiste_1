import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function GoBackButton() {
  return (
    <Link
      href="/"
      className="text-primary-500 group flex w-fit items-center"
      prefetch={false}
    >
      <IconArrowLeft />
      <div className="text-lg font-medium transition-transform duration-200 group-hover:translate-x-0.5">
        Go back
      </div>
    </Link>
  );
}
