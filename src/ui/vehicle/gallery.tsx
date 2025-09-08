"use client";

import { Vehicle } from "@/lib/data/get-vehicle";
import { VehiclePhotos } from "@/lib/data/get-vehicle-photos";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Modal from "./modal";
import Thumbnail from "./thumbnail";

export default function Gallery({
  vehiclePhotos,
  vehicle,
}: {
  vehiclePhotos: VehiclePhotos | null;
  vehicle: Vehicle;
}) {
  const [curIndex, setCurIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const scrollableContainer = useRef<HTMLDivElement | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const thumbnailRefs = useRef<(null | { scrollTo: () => void })[]>([]);

  const hasVehiclePhotos = vehiclePhotos && vehiclePhotos.length > 0;
  const commonImageAlt = `${vehicle.make} ${vehicle.model}${vehicle.typeName ? ` ${vehicle.typeName}` : ""}`;

  const refPassthrough = (el: HTMLDivElement) => {
    handlers.ref(el);
    scrollableContainer.current = el;
  };

  const handlers = useSwipeable({
    onSwipeStart: () => {
      setIsSwiping(true);
    },
    onSwiping: (eventData) => {
      if (scrollableContainer.current && isSwiping) {
        document.body.style.userSelect = "none";
        scrollableContainer.current.scrollLeft -= eventData.deltaX / 20;
      }
    },
    onSwiped: () => {
      setIsSwiping(false);
      document.body.style.userSelect = "";
    },
    trackMouse: true,
    trackTouch: false,
  });

  if (!hasVehiclePhotos)
    return <FallBackComponent imgAlt={`${vehicle.make} ${vehicle.model}`} />;

  return (
    <>
      <div className="flex flex-col gap-y-4 overflow-hidden">
        <Image
          src={
            hasVehiclePhotos
              ? vehiclePhotos[curIndex].url
              : "/vehicles-page/placeholder.png"
          }
          alt={commonImageAlt}
          height={472}
          width={630}
          loading="eager"
          onClick={() => setOpen(true)}
          className={clsx(
            "max-h-[447px] w-full max-w-[calc(100vw-32px)] object-cover object-center lg:max-h-[473px]",
            hasVehiclePhotos && "cursor-zoom-in",
          )}
          fetchPriority="high"
        />

        <div
          {...handlers}
          ref={refPassthrough}
          className={clsx(
            "no-scrollbar relative flex shrink-0 cursor-grab items-center gap-x-5 overflow-x-scroll pt-1 active:cursor-grabbing",
            isSwiping && "*:pointer-events-none",
          )}
        >
          {vehiclePhotos.map((photo, index) => (
            <Thumbnail
              key={photo.id}
              ref={(el) => {
                thumbnailRefs.current[index] = el;
              }}
              photo={photo}
              selected={index === curIndex}
              onClick={() => setCurIndex(index)}
              alt={`${commonImageAlt}, image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <Modal
        open={open}
        curIndex={curIndex}
        images={vehiclePhotos}
        alt={commonImageAlt}
        onClose={() => setOpen(false)}
        onChangePhotoId={(index) => {
          thumbnailRefs.current[index]?.scrollTo();
          setCurIndex(index);
        }}
      />
    </>
  );
}

function FallBackComponent({ imgAlt }: { imgAlt: string }) {
  return (
    <Image
      src="/vehicles-page/placeholder.png"
      alt={imgAlt}
      height={472}
      width={630}
      loading="eager"
      className="max-h-[447px] w-full max-w-[calc(100vw-32px)] object-cover object-center lg:max-h-[473px]"
      fetchPriority="high"
    />
  );
}
