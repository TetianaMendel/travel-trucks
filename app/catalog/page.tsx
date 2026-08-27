import CamperList from "@/components/CamperList/CamperList";

import styles from "./CatalogPage.module.css";

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
