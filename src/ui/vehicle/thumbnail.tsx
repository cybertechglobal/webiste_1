import { scrollIntoView } from "@/lib/client-utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useImperativeHandle, useRef, useState } from "react";

type ThumbnailProps = {
  photo: {
    url: string;
    thumbnailUrl: string;
    id: string;
    originalName: string;
  };
  onClick: () => void;
  selected: boolean;
  ref?: React.Ref<{ scrollTo: () => void }>;
  alt: string;
};

export default function Thumbnail({
  photo,
  onClick,
  selected,
  ref,
  alt,
}: ThumbnailProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      scrollTo: () => {
        scrollIntoView(elementRef.current);
      },
    }),
    [],
  );

  const handleClick = () => {
    onClick();
    scrollIntoView(elementRef.current);
  };

  return (
    <motion.div
      layout
      ref={elementRef}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="relative shrink-0 pb-3.75"
    >
      <button
        className="relative h-17 w-22.5 cursor-pointer"
        onClick={handleClick}
      >
        <Image
          src={photo.thumbnailUrl}
          alt={alt}
          fill
          draggable={false}
          onLoad={() => setImageLoaded(true)}
          className="select-none"
        />
      </button>
      {selected && imageLoaded ? (
        <motion.div
          layoutId="image-layout"
          aria-hidden
          className="bg-primary-500 absolute bottom-0 h-1.5 w-22.5"
        />
      ) : null}
    </motion.div>
  );
}
