"use client";

import { useState } from "react";

export default function Map() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[1.13] lg:aspect-[2] lg:h-[290px]">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}
      <iframe
        title="Google maps of company"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.2990348458707!2d20.45687177623027!3d44.81547227107068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab26602c4f1%3A0x936e3ddf31594d2e!2z0JrQvdC10LfQsCDQnNC40YXQsNC40LvQsCA1LCDQkdC10L7Qs9GA0LDQtCAxMTAwMA!5e0!3m2!1ssr!2srs!4v1757061365166!5m2!1ssr!2srs"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full grayscale-65"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
