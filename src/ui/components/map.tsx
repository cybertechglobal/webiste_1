"use client";

import { useState } from "react";

export default function Map() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[1.13] -translate-y-0.5 lg:aspect-[2] lg:h-[290px]">
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gray-300"
          aria-live="polite"
          role="status"
        ></div>
      )}
      <iframe
        title="Google maps of company"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.9765787601254!2d20.466317525248122!3d44.81021800724598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa501a8a9f3%3A0xc6a381731628cb98!2sSt.%20Mark%20Orthodox%20Church!5e0!3m2!1sen!2srs!4v1756829733164!5m2!1sen!2srs"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full grayscale-65"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
