"use client";

import { VEHICLES_PER_PAGE } from "@/lib/definitions";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoadMoreButton({
  currentPage,
  maxPage,
  count,
}: {
  currentPage: number;
  maxPage: number;
  count: number;
}) {
  const { replace } = useRouter();
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [params]);

  const itemsShown = currentPage * VEHICLES_PER_PAGE;
  const remainingItems = Math.min(VEHICLES_PER_PAGE, count - itemsShown);

  const handleClick = () => {
    if (isLoading || currentPage >= maxPage) return;

    setIsLoading(true);

    const newParams = new URLSearchParams(params);
    const newPage = currentPage + 1;

    newParams.set("page", String(newPage));
    replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || currentPage >= maxPage}
      className={clsx(
        "btn-primary mx-auto mt-10 flex h-11 w-70 items-center justify-center px-20 lg:mt-15",
        isLoading ||
          (currentPage >= maxPage && "cursor-not-allowed opacity-50"),
      )}
    >
      {isLoading ? (
        <div className="size-5 animate-spin rounded-full border-2 border-gray-800 border-t-transparent"></div>
      ) : (
        `Load ${remainingItems} more`
      )}
    </button>
  );
}
