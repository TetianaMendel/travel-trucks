import Image from "next/image";
import Link from "next/link";
import {
  FaCog,
  FaGasPump,
  FaStar,
  FaTruck,
} from "react-icons/fa";

import { GrMapLocation } from "react-icons/gr";
import type { CamperListItem } from "@/types/camper";
import styles from "./CamperItem.module.css";

type Props = {
  item: CamperListItem;
};

const CamperItem = ({ item }: Props) => {
  const formattedLocation = item.location
    .split(",")
    .map((part) => part.trim())
    .reverse()
    .join(", ");

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.coverImage}
          alt={item.name}
          width={219}
          height={240}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h2 className={styles.name}>
            {item.name}
          </h2>

          <p className={styles.price}>
            €{item.price.toFixed(0)}
          </p>
        </div>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <FaStar
              className={styles.ratingIcon}
              aria-hidden="true"
            />

            {item.rating} (
            {item.totalReviews} Reviews)
          </span>

          <span className={styles.location}>
            <GrMapLocation
              className={styles.locationIcon}
              aria-hidden="true"
            />

            {formattedLocation}
          </span>
        </div>

        <p className={styles.description}>
          {item.description}
        </p>

        <div className={styles.features}>
          <span className={styles.feature}>
            <FaGasPump
              className={styles.featureIcon}
              aria-hidden="true"
            />

            {item.engine}
          </span>

          <span className={styles.feature}>
            <FaCog
              className={styles.featureIcon}
              aria-hidden="true"
            />

            {item.transmission}
          </span>

          <span className={styles.feature}>
            <FaTruck
              className={styles.featureIcon}
              aria-hidden="true"
            />

            {item.form}
          </span>
        </div>

        <Link
          href={`/catalog/${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Show more
        </Link>
      </div>
    </li>
  );
};

export default CamperItem;