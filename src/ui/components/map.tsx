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
        />
      )}
      <iframe
        title="Google maps of company"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.0355637631624!2d19.78954837625261!3d45.22684827107099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b0e32b860fa05%3A0x18f5d0bf4a73c9f6!2sKamenjar%2083%2C%20Novi%20Sad%20404801!5e0!3m2!1sen!2srs!4v1756991742944!5m2!1sen!2srs"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full grayscale-65"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
