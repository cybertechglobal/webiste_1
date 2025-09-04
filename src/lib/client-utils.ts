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

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const formatted = formatter.format(price);
  return `€ ${formatted}`;
}

export function formatMileage(mileage: number) {
  if (mileage >= 1000) {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(mileage / 1000) + "km"
    );
  }
  return mileage + "km";
}
