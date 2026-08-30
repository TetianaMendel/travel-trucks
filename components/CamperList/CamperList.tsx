"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import CamperFilters from "@/components/CamperFilters/CamperFilters";
import CamperItem from "@/components/CamperItem/CamperItem";
import Loader from "@/components/Loader/Loader";
import NotFoundCamper from "@/components/NotFoundCamper/NotFoundCamper";

import { getCampers } from "@/lib/api/clientApi";

import type {
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "@/types/camper";

import styles from "./CamperList.module.css";

const PER_PAGE = 4;

export default function CamperList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCleared, setIsCleared] = useState(false);

  const locationParam =
    searchParams.get("location");

  const formParam =
    searchParams.get("form");

  const engineParam =
    searchParams.get("engine");

  const transmissionParam =
    searchParams.get("transmission");

  const location =
    locationParam || undefined;

  const form = formParam
    ? (formParam as CamperForm)
    : undefined;

  const engine = engineParam
    ? (engineParam as CamperEngine)
    : undefined;

  const transmission = transmissionParam
    ? (transmissionParam as CamperTransmission)
    : undefined;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      "campers",
      location,
      form,
      engine,
      transmission,
    ],

    queryFn: ({ pageParam }) =>
      getCampers({
        page: pageParam,
        perPage: PER_PAGE,
        location,
        form,
        engine,
        transmission,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (
        lastPage.page <
        lastPage.totalPages
      ) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  const campers =
    data?.pages.flatMap(
      (page) => page.campers
    ) ?? [];

  const handleClearFilters = () => {
    setIsCleared(true);
    router.replace("/catalog");
  };

  if (isError) {
    return (
      <section className={styles.section}>
        <div className={styles.layout}>
          <CamperFilters
            key={`error-${isCleared}`}
            isCleared={true}
          />

          <div className={styles.results}>
            <p className={styles.error}>
              Failed to load campers.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {isFetching &&
        !isFetchingNextPage && <Loader />}

      <section className={styles.section}>
        <div className={styles.layout}>
          <CamperFilters
            key={`${searchParams.toString()}-${isCleared}`}
            isCleared={isCleared}
          />

          <div className={styles.results}>
            {campers.length === 0 ? (
              <NotFoundCamper
                title="No campers found"
                text={
                  <>
                    We couldn&apos;t find any
                    campers that match your
                    filters.
                    <br />
                    Try adjusting your search
                    or clearing some filters.
                  </>
                }
                onClearFilters={
                  handleClearFilters
                }
              />
            ) : (
              <>
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
                    onClick={() =>
                      fetchNextPage()
                    }
                    disabled={
                      isFetchingNextPage
                    }
                  >
                    {isFetchingNextPage
                      ? "Loading..."
                      : "Load More"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}