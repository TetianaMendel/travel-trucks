import Image from 'next/image';
import Link from 'next/link';

import type { CamperListItem } from '@/types/camper';

import styles from './CamperItem.module.css';

type Props = {
  item: CamperListItem;
};

const CamperItem = ({ item }: Props) => {
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
            €{item.price.toFixed(2)}
          </p>
        </div>

        <div className={styles.meta}>
          <span className={styles.rating}>
            ★ {item.rating} ({item.totalReviews} reviews)
          </span>

          <span className={styles.location}>
            📍 {item.location}
          </span>
        </div>

        <p className={styles.description}>
          {item.description}
        </p>

        <div className={styles.features}>
          <span className={styles.feature}>
            {item.engine}
          </span>

          <span className={styles.feature}>
            {item.transmission}
          </span>

          <span className={styles.feature}>
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