"use client";

import { cn } from "@/lib/client-utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Ref, TextareaHTMLAttributes, useState } from "react";

export default function Textarea({
  className,
  ref,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: Ref<HTMLTextAreaElement>;
}) {
  const radius = 250;
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
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
      <textarea
        className={cn(
          "shadow-input bg-card text-border flex w-full border-none px-4 py-2.5 text-sm transition duration-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 in-hover:shadow-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
}
