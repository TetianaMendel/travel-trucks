"use client";

import {
  ChangeEvent,
  FormEvent,
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

const CamperFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(
    searchParams.get("location") ?? ""
  );

  const [form, setForm] = useState<
    CamperForm | undefined
  >(
    (searchParams.get("form") as CamperForm) ||
      undefined
  );

  const [engine, setEngine] = useState<
    CamperEngine | undefined
  >(
    (searchParams.get("engine") as CamperEngine) ||
      undefined
  );

  const [transmission, setTransmission] =
    useState<
      CamperTransmission | undefined
    >(
      (searchParams.get(
        "transmission"
      ) as CamperTransmission) || undefined
    );

  const handleLocationChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setLocation(event.target.value);
  };

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setForm(
      event.target.value as CamperForm
    );
  };

  const handleEngineChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEngine(
      event.target.value as CamperEngine
    );
  };

  const handleTransmissionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setTransmission(
      event.target.value as CamperTransmission
    );
  };

  const handleSearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const params = new URLSearchParams();

    const normalizedLocation =
      location.trim();

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

    router.push(pathname);
  };

  return (
    <form
      className={styles.filters}
      onSubmit={handleSearch}
    >
      <div className={styles.locationField}>
        <label
          htmlFor="location"
          className={styles.label}
        >
          Location
        </label>

        <div className={styles.inputWrapper}>
          <GrMapLocation
            className={styles.locationIcon}
            aria-hidden="true"
          />

          <input
            id="location"
            name="location"
            type="text"
            value={location}
            onChange={handleLocationChange}
            className={styles.input}
          />
        </div>
      </div>

      <h2 className={styles.title}>
        Filters
      </h2>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>
          Camper form
        </legend>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="form"
            value="alcove"
            checked={form === "alcove"}
            onChange={handleFormChange}
            className={styles.radio}
          />

          <span>Alcove</span>
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="form"
            value="panel_van"
            checked={form === "panel_van"}
            onChange={handleFormChange}
            className={styles.radio}
          />

          <span>Panel Van</span>
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="form"
            value="integrated"
            checked={form === "integrated"}
            onChange={handleFormChange}
            className={styles.radio}
          />

          <span>Integrated</span>
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
            className={styles.radio}
          />

          <span>Semi-integrated</span>
        </label>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>
          Engine
        </legend>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="engine"
            value="diesel"
            checked={engine === "diesel"}
            onChange={handleEngineChange}
            className={styles.radio}
          />

          <span>Diesel</span>
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="engine"
            value="petrol"
            checked={engine === "petrol"}
            onChange={handleEngineChange}
            className={styles.radio}
          />

          <span>Petrol</span>
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="engine"
            value="hybrid"
            checked={engine === "hybrid"}
            onChange={handleEngineChange}
            className={styles.radio}
          />

          <span>Hybrid</span>
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="engine"
            value="electric"
            checked={engine === "electric"}
            onChange={handleEngineChange}
            className={styles.radio}
          />

          <span>Electric</span>
        </label>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>
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
            className={styles.radio}
          />

          <span>Automatic</span>
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
            className={styles.radio}
          />

          <span>Manual</span>
        </label>
      </fieldset>

      <div className={styles.buttons}>
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
            className={styles.clearIcon}
            aria-hidden="true"
          />

          Clear filters
        </button>
      </div>
    </form>
  );
};

export default CamperFilters;