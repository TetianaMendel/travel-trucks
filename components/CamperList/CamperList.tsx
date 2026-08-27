"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import CamperItem from "@/components/CamperItem/CamperItem";
import { getCampers } from "@/lib/api/clientApi";

import styles from "./CamperList.module.css";

const PER_PAGE = 4;

export default function CamperList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["campers"],

    queryFn: ({ pageParam }) =>
      getCampers({
        page: pageParam,
        perPage: PER_PAGE,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  const campers =
    data?.pages.flatMap((page) => page.campers) ?? [];

  if (isLoading) {
    return (
      <p className={styles.message}>
        Loading campers...
      </p>
    );
  }

  if (isError) {
    return (
      <p className={styles.error}>
        Failed to load campers.
      </p>
    );
  }

  if (campers.length === 0) {
    return (
      <p className={styles.message}>
        No campers found.
      </p>
    );
  }

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {campers.map((camper) => (
          <CamperItem
            key={camper.id}
            item={camper}
          />
        ))}
      </ul>

      {hasNextPage && (
        <button
          type="button"
          className={styles.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading..."
            : "Load More"}
        </button>
      )}
    </section>
  );
}