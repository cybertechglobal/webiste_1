import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function GoBack() {
  return (
    <Link href="/" className="text-primary flex items-center" prefetch={false}>
      <IconArrowLeft />
      <div className="text-lg font-medium">Go back</div>
    </Link>
  );
}
