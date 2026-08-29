"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import CamperFilters from "@/components/CamperFilters/CamperFilters";
import CamperItem from "@/components/CamperItem/CamperItem";
import Loader from "@/components/Loader/Loader";

import { getCampers } from "@/lib/api/clientApi";

import type {
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "@/types/camper";

import styles from "./CamperList.module.css";

const PER_PAGE = 4;

const DEFAULT_LOCATION = "Kyiv";
const DEFAULT_FORM: CamperForm = "panel_van";
const DEFAULT_ENGINE: CamperEngine = "petrol";
const DEFAULT_TRANSMISSION: CamperTransmission =
  "automatic";

export default function CamperList() {
  const searchParams = useSearchParams();

  const locationParam = searchParams.get("location");
  const formParam = searchParams.get("form");
  const engineParam = searchParams.get("engine");
  const transmissionParam =
    searchParams.get("transmission");

  const location =
    locationParam === null
      ? DEFAULT_LOCATION
      : locationParam;

  const form =
    formParam === null
      ? DEFAULT_FORM
      : formParam
        ? (formParam as CamperForm)
        : undefined;

  const engine =
    engineParam === null
      ? DEFAULT_ENGINE
      : engineParam
        ? (engineParam as CamperEngine)
        : undefined;

  const transmission =
    transmissionParam === null
      ? DEFAULT_TRANSMISSION
      : transmissionParam
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
      transmission,
      engine,
    ],

    queryFn: ({ pageParam }) =>
      getCampers({
        page: pageParam,
        perPage: PER_PAGE,
        location: location || undefined,
        form,
        transmission,
        engine,
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

  if (isError) {
    return (
      <section className={styles.section}>
        <div className={styles.layout}>
          <CamperFilters />

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
      {isFetching && !isFetchingNextPage && (
        <Loader />
      )}

      <section className={styles.section}>
        <div className={styles.layout}>
          <CamperFilters />

          <div className={styles.results}>
            {campers.length === 0 ? (
              <p className={styles.message}>
                No campers found.
              </p>
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
                    disabled={isFetchingNextPage}
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
