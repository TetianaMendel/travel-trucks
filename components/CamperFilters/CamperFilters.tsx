"use client";

import {
  ChangeEvent,
  SubmitEvent,
  useState,
} from "react";

import { GrMapLocation } from "react-icons/gr";
import { IoClose } from "react-icons/io5";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type {
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "@/types/camper";

import styles from "./CamperFilters.module.css";

interface CamperFiltersProps {
  isCleared?: boolean;
}

const CamperFilters = ({
  isCleared = false,
}: CamperFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(
    isCleared
      ? ""
      : searchParams.get("location") ?? "Kyiv"
  );

  const [form, setForm] = useState<
    CamperForm | undefined
  >(
    isCleared
      ? undefined
      : (searchParams.get("form") as CamperForm | null) ??
          "panel_van"
  );

  const [engine, setEngine] = useState<
    CamperEngine | undefined
  >(
    isCleared
      ? undefined
      : (searchParams.get("engine") as CamperEngine | null) ??
          "petrol"
  );

  const [transmission, setTransmission] =
    useState<CamperTransmission | undefined>(
      isCleared
        ? undefined
        : (searchParams.get(
            "transmission"
          ) as CamperTransmission | null) ??
            "automatic"
    );

  const handleLocationChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setLocation(event.target.value);
  };

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setForm(event.target.value as CamperForm);
  };

  const handleEngineChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEngine(event.target.value as CamperEngine);
  };

  const handleTransmissionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setTransmission(
      event.target.value as CamperTransmission
    );
  };

  const handleSearch = (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const params = new URLSearchParams();

    const normalizedLocation = location.trim();

    if (normalizedLocation) {
      params.set(
        "location",
        normalizedLocation
      );
    }

    if (form) {
      params.set("form", form);
    }

    if (engine) {
      params.set("engine", engine);
    }

    if (transmission) {
      params.set(
        "transmission",
        transmission
      );
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );
  };

  const handleClearFilters = () => {
    setLocation("");
    setForm(undefined);
    setEngine(undefined);
    setTransmission(undefined);

    router.replace(pathname);
  };

  return (
    <form
      className={styles.filters}
      onSubmit={handleSearch}
    >
      <div className={styles.locationSection}>
        <label
          htmlFor="location"
          className={styles.locationLabel}
        >
          Location
        </label>

        <div className={styles.locationInputWrapper}>
          <GrMapLocation
            className={`${styles.locationIcon} ${
              location
                ? styles.locationIconActive
                : ""
            }`}
            aria-hidden="true"
          />

          <input
            id="location"
            name="location"
            type="text"
            placeholder="Kyiv"
            value={location}
            onChange={handleLocationChange}
            className={styles.locationInput}
          />
        </div>
      </div>

      <p className={styles.filtersLabel}>
        Filters
      </p>

      <div className={styles.filterWrapper}>
        <fieldset className={styles.filterGroup}>
          <legend className={styles.filterTitle}>
            Camper form
          </legend>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="form"
              value="alcove"
              checked={form === "alcove"}
              onChange={handleFormChange}
            />
            Alcove
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="form"
              value="panel_van"
              checked={form === "panel_van"}
              onChange={handleFormChange}
            />
            Panel Van
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="form"
              value="integrated"
              checked={form === "integrated"}
              onChange={handleFormChange}
            />
            Integrated
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="form"
              value="semi_integrated"
              checked={
                form === "semi_integrated"
              }
              onChange={handleFormChange}
            />
            Semi-integrated
          </label>
        </fieldset>

        <fieldset className={styles.filterGroup}>
          <legend className={styles.filterTitle}>
            Engine
          </legend>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="engine"
              value="diesel"
              checked={engine === "diesel"}
              onChange={handleEngineChange}
            />
            Diesel
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="engine"
              value="petrol"
              checked={engine === "petrol"}
              onChange={handleEngineChange}
            />
            Petrol
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="engine"
              value="hybrid"
              checked={engine === "hybrid"}
              onChange={handleEngineChange}
            />
            Hybrid
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="engine"
              value="electric"
              checked={engine === "electric"}
              onChange={handleEngineChange}
            />
            Electric
          </label>
        </fieldset>

        <fieldset className={styles.filterGroup}>
          <legend className={styles.filterTitle}>
            Transmission
          </legend>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="transmission"
              value="automatic"
              checked={
                transmission === "automatic"
              }
              onChange={
                handleTransmissionChange
              }
            />
            Automatic
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="transmission"
              value="manual"
              checked={
                transmission === "manual"
              }
              onChange={
                handleTransmissionChange
              }
            />
            Manual
          </label>
        </fieldset>
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.searchButton}
        >
          Search
        </button>

        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClearFilters}
        >
          <IoClose
            className={styles.btnIcon}
            aria-hidden="true"
          />
          Clear filters
        </button>
      </div>
    </form>
  );
};

export default CamperFilters;