"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { getReviews, getSingleCamper } from "@/lib/api/clientApi";
import styles from "./CamperDetails.module.css";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import CamperReviews from "@/components/CamperReviews/CamperReviews";
import BookingForm from "@/components/BookingForm/BookingForm";

const CamperDetailsClient = () => {
  const { camperId } = useParams<{
    camperId: string;
  }>();

  const {
    data: camper,
    isLoading: isCamperLoading,
    isError: isCamperError,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getSingleCamper(camperId),
    enabled: Boolean(camperId),
    refetchOnMount: false,
  });

  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => getReviews(camperId),
    enabled: Boolean(camperId),
    refetchOnMount: false,
  });

  if (isCamperLoading || isReviewsLoading) {
    return (
      <main className={styles.page}>
        <p className={styles.message}>Loading...</p>
      </main>
    );
  }

  if (
    isCamperError ||
    isReviewsError ||
    !camper
  ) {
    return (
      <main className={styles.page}>
        <p className={styles.error}>
          Something went wrong...
        </p>
      </main>
    );
  }

  const formattedLocation = camper.location
    .split(",")
    .map((part) => part.trim())
    .reverse()
    .join(", ");

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.topSection}>
          <div className={styles.galleryColumn}>
            <CamperGallery
              gallery={camper.gallery}
            />
          </div>

          <div className={styles.infoColumn}>
            <section className={styles.infoCard}>
              <h1 className={styles.title}>
                {camper.name}
              </h1>

              <div className={styles.meta}>
                <span className={styles.rating}>
                  <FaStar
                    className={styles.ratingIcon}
                    aria-hidden="true"
                  />

                  {camper.rating.toFixed(1)} (
                  {camper.totalReviews} Reviews)
                </span>

                <span className={styles.location}>
                  <GrMapLocation
                    className={styles.locationIcon}
                    aria-hidden="true"
                  />

                  {formattedLocation}
                </span>
              </div>

              <p className={styles.price}>
                €{camper.price.toFixed(0)}
              </p>

              <p className={styles.description}>
                {camper.description}
              </p>
            </section>

            <section className={styles.detailsCard}>
              <h2 className={styles.detailsTitle}>
                Vehicle details
              </h2>

              <div className={styles.amenities}>
                <span className={styles.amenity}>
                  {camper.transmission}
                </span>

                {camper.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className={styles.amenity}
                  >
                    {amenity}
                  </span>
                ))}

                <span className={styles.amenity}>
                  {camper.engine}
                </span>

                <span className={styles.amenity}>
                  {camper.form}
                </span>
              </div>

              <div className={styles.divider} />

              <div className={styles.specifications}>
                <div className={styles.specification}>
                  <span>Form</span>
                  <span>{camper.form}</span>
                </div>

                <div className={styles.specification}>
                  <span>Length</span>
                  <span>{camper.length}</span>
                </div>

                <div className={styles.specification}>
                  <span>Width</span>
                  <span>{camper.width}</span>
                </div>

                <div className={styles.specification}>
                  <span>Height</span>
                  <span>{camper.height}</span>
                </div>

                <div className={styles.specification}>
                  <span>Tank</span>
                  <span>{camper.tank}</span>
                </div>

                <div className={styles.specification}>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className={styles.bottomSection}>
          <h2 className={styles.reviewsTitle}>
            Reviews
          </h2>

          <div className={styles.reviewBlocksContainer}>
            <CamperReviews reviews={reviews} />

            <BookingForm camperId={camper.id} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default CamperDetailsClient;
