"use client";

import type { Review } from "@/types/details";
import styles from "./CamperReviews.module.css";

type Props = {
  reviews: Review[];
};

const CamperReviews = ({ reviews }: Props) => {
  if (reviews.length === 0) {
    return (
      <section className={styles.reviews}>
        <p className={styles.empty}>
          No reviews yet.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.reviews}>
      <div className={styles.list}>
        {reviews.map((review) => (
          <article
            key={review.id}
            className={styles.review}
          >
            <div className={styles.header}>
              <div className={styles.avatar}>
                {review.reviewer_name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className={styles.info}>
                <p className={styles.name}>
                  {review.reviewer_name}
                </p>

                <div
                  className={styles.rating}
                  aria-label={`Rating: ${review.reviewer_rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map(
                    (_, index) => (
                      <span
                        key={index}
                        className={
                          index <
                          review.reviewer_rating
                            ? styles.starActive
                            : styles.star
                        }
                      >
                        ★
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <p className={styles.comment}>
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CamperReviews;