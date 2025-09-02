import { ComponentProps } from "react";

export default function ExternalLink({
  children,
  ...restProps
}: ComponentProps<"a">) {
  return (
    <a {...restProps} rel="noreferrer noopener" target="_blank">
      {children}
    </a>
  );
}
