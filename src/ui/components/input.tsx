"use client";

import { cn } from "@/lib/client-utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { InputHTMLAttributes, MouseEvent, Ref, useState } from "react";

export default function Input({
  className,
  type,
  ref,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
}) {
  const radius = 100;
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--color-primary-500) 0%,
              transparent 80%
            )
          `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-0.5 transition duration-300"
    >
      <input
        type={type}
        className={cn(
          "shadow-input bg-card text-border flex h-10 w-full border-none px-4 py-2.5 text-sm transition duration-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 in-hover:shadow-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
}
