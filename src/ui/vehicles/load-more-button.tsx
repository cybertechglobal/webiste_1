import clsx from "clsx";

type LoadMoreButtonProps = {
  remainingItems: number;
  handleLoadMore: () => void;
  pending: boolean;
};

export default function LoadMoreButton({
  remainingItems,
  handleLoadMore,
  pending,
}: LoadMoreButtonProps) {
  return (
    <button
      onClick={handleLoadMore}
      disabled={pending}
      aria-disabled={pending}
      aria-label={
        pending
          ? "Loading more vehicles"
          : `Load ${remainingItems} more vehicles`
      }
      className={clsx(
        "btn-primary mx-auto mt-10 flex h-11 w-70 items-center justify-center px-20 lg:mt-15",
        pending && "cursor-not-allowed opacity-50",
      )}
    >
      {pending ? (
        <>
          <span className="sr-only">Loading</span>
          <div className="size-5 animate-spin rounded-full border-2 border-gray-800 border-t-transparent" />
        </>
      ) : (
        `Load ${remainingItems} more`
      )}
    </button>
  );
}
