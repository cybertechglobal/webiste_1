"use client";

import { getBgImage } from "@/lib/client-utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] || "home";
  const bgImage = getBgImage(segment);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-cover bg-center"
      style={bgImage ? { backgroundImage: `url('${bgImage}')` } : undefined}
      role="main"
      aria-label={`${
        segment.charAt(0).toUpperCase() + segment.slice(1)
      } page background`}
    >
      {bgImage && <div className="absolute inset-0 bg-black/80" aria-hidden />}

      {children}
    </div>
  );
}
