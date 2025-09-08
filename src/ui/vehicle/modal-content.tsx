"use client";

import { animationVariants, downloadPhoto, range } from "@/lib/client-utils";
import type {
  VehiclePhoto,
  VehiclePhotos,
} from "@/lib/data/get-vehicle-photos";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconExternalLink,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import ExternalLink from "../components/external-link";

type ModalContentProps = {
  index: number;
  images: VehiclePhotos;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  direction?: number;
};

export default function ModalContent({
  index,
  images,
  changePhotoId,
  closeModal,
  direction,
}: ModalContentProps) {
  const [loaded, setLoaded] = useState(false);

  const currentImageUrl = images[index].url;

  const filteredImages = images.filter((img: VehiclePhoto) =>
    range(index - 15, index + 15).includes(Number(img.id)),
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] size-full max-w-7xl items-center"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={animationVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute will-change-[transform,opacity]"
              >
                <Image
                  src={currentImageUrl}
                  width={1280}
                  height={853}
                  priority
                  alt="Car image"
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              <>
                {index > 0 && (
                  <button
                    className="absolute top-[calc(50%-16px)] left-3 cursor-pointer rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changePhotoId(index - 1)}
                  >
                    <IconChevronLeft className="size-6" />
                  </button>
                )}
                {index + 1 < images.length ? (
                  <button
                    className="absolute top-[calc(50%-16px)] right-3 cursor-pointer rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changePhotoId(index + 1)}
                  >
                    <IconChevronRight className="size-6" />
                  </button>
                ) : null}
              </>
              <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                <ExternalLink
                  href={currentImageUrl}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  title="Open fullsize version"
                >
                  <IconExternalLink className="size-5" />
                </ExternalLink>

                <button
                  onClick={() => downloadPhoto(currentImageUrl, `${index}.jpg`)}
                  className="cursor-pointer rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  title="Download fullsize version"
                >
                  <IconDownload className="size-5" />
                </button>
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="cursor-pointer rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  <IconX className="size-5" />
                </button>
              </div>
            </div>
          )}
          {/* Bottom Nav bar */}
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div
              initial={false}
              className="mx-auto my-6 flex aspect-[3/2] h-14 gap-x-1"
            >
              <AnimatePresence initial={false}>
                {filteredImages.map(({ id, thumbnailUrl }) => (
                  <motion.button
                    initial={{
                      width: "0%",
                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    }}
                    animate={{
                      scale: Number(id) === index ? 1.25 : 1,
                      width: "100%",
                      x: `${Math.max(index * -100, 15 * -100)}%`,
                    }}
                    exit={{ width: "0%" }}
                    onClick={() => changePhotoId(Number(id))}
                    key={id}
                    className={clsx(
                      "relative inline-block w-full shrink-0 transform-gpu cursor-pointer overflow-hidden focus:outline-none",
                      Number(id) === index
                        ? "z-20 shadow shadow-black/50"
                        : "z-10",
                    )}
                  >
                    <Image
                      alt="thumbnail"
                      width={180}
                      height={120}
                      className={clsx(
                        "h-full transform object-cover transition",
                        Number(id) === index
                          ? "brightness-110 hover:brightness-110"
                          : "brightness-50 contrast-125 hover:brightness-75",
                      )}
                      src={thumbnailUrl}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
