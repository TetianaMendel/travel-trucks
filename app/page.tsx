
import Link from 'next/link';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>
            Campers of your dreams
          </h1>

          <p>
            You can find everything you want
            in our catalog
          </p>

          <Link
            href="/catalog"
            className={styles.button}
          >
            View Now
          </Link>
        </div>
      </div>
    </main>
  );
}