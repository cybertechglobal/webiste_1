import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function getBgImage(segment: string) {
  const bgMap = {
    home: "/home-page/hero.webp",
    about: "/about-page/hero.webp",
    services: "/services-page/hero.webp",
    contact: "/contact-page/hero.webp",
  };

  return bgMap[segment as keyof typeof bgMap] || null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
