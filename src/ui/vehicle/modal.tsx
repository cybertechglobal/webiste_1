"use client";

import { Dialog, DialogBackdrop } from "@headlessui/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

import { VehiclePhotos } from "@/lib/data/get-vehicle-photos";
import useKeypress from "@/lib/use-keypress";
import ModalContent from "./modal-content";

type ModalProps = {
  images: VehiclePhotos;
  onClose?: () => void;
  open: boolean;
  curIndex: number;
  onChangePhotoId: (index: number) => void;
};

export default function Modal({
  images,
  onClose,
  open,
  curIndex,
  onChangePhotoId,
}: ModalProps) {
  const [direction, setDirection] = useState(0);

  const overlayRef = useRef(null);

  useKeypress("ArrowRight", () => {
    if (curIndex + 1 < images.length) {
      changePhotoId(curIndex + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (curIndex > 0) {
      changePhotoId(curIndex - 1);
    }
  });

  function handleClose() {
    onClose?.();
  }

  function changePhotoId(newVal: number) {
    if (newVal > curIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    onChangePhotoId(newVal);
  }

  return (
    <div className="mx-auto contents max-w-490 p-4">
      <Dialog
        open={open}
        onClose={handleClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-10 mx-auto flex items-center justify-center"
      >
        <DialogBackdrop
          ref={overlayRef}
          as={motion.div}
          key="backdrop"
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <ModalContent
          index={curIndex}
          direction={direction}
          images={images.map((img, index) => ({ ...img, id: String(index) }))}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
        />
      </Dialog>
    </div>
  );
}
