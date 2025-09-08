import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Vehicle } from "./data/get-vehicle";

export function getBgImage(segment: string) {
  //contact uses same bg as aobut page
  const bgMap = {
    home: "/home-page/hero.webp",
    about: "/about-page/hero.webp",
    services: "/services-page/hero.webp",
    contact: "/about-page/hero.webp",
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

export function convertPower(value: number, unit: "hp" | "kw"): number {
  const HP_TO_KW = 0.7457;
  const KW_TO_HP = 1.341;

  if (unit === "hp") {
    return Math.round(value * HP_TO_KW);
  } else {
    return Math.round(value * KW_TO_HP);
  }
}

export function formatPowerText(power: number, powerUnit: "hp" | "kw") {
  let powerInHp;
  let powerInKw;
  const convertedPower = convertPower(power, powerUnit);

  if (powerUnit === "hp") {
    powerInHp = power;
    powerInKw = convertedPower;
  } else if (powerUnit === "kw") {
    powerInKw = power;
    powerInHp = convertedPower;
  }

  return `${powerInKw} kW (${powerInHp} HP)`;
}

function forceDownload(blobUrl: string, filename: string) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function downloadPhoto(url: string, filename?: string) {
  const defaultFilename = url.split(/[\\/]/).pop() || "downloaded_file";

  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename ?? defaultFilename);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((e) => console.error("Download failed:", e));
}

export const animationVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export function range(start: number, end: number) {
  const output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += 1) {
    output.push(i);
  }
  return output;
}

export function resolvePrice(vehicle: Vehicle) {
  return (
    vehicle.retailPrice ??
    vehicle.prices.find(
      (p: { type: string; value: number }) => p.type === "retail",
    )?.value ??
    vehicle.prices[0]?.value ??
    null
  );
}

export function formatRegistration(dateString: string | null) {
  if (!dateString) return "--";
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${year}`;
}

export function scrollIntoView(element: HTMLElement | null) {
  if (!element) return;

  element.scrollIntoView({
    container: "nearest",
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  } as ScrollIntoViewOptions);
}
