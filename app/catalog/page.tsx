import CamperList from "@/components/CamperList/CamperList";
import styles from "./CatalogPage.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camper Catalog | TravelTrucks",
  description:
    "Browse our camper catalog and find the perfect camper for your next adventure with TravelTrucks.",
};

const Catalog = () => {
  return (
    <main>
      <section className={styles.container}>
        <CamperList />
      </section>
    </main>
  );
};

export default Catalog;
