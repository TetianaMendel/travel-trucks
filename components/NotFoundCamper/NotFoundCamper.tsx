import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

import css from "./NotFoundCamper.module.css";

interface EmptyStateProps {
  title: string;
  text: React.ReactNode;
  onClearFilters?: () => void;
}

export default function NotFoundCamper({
  title,
  text,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className={css.container}>
      <Image
        src="/images/camper-empty.webp"
        alt="No campers found"
        width={488}
        height={463}
        className={css.image}
      />

      <h2 className={css.title}>{title}</h2>

      <p className={css.text}>{text}</p>

      <div className={css.buttons}>
        <button
          type="button"
          className={css.clearButton}
          onClick={onClearFilters}
        >
          <IoClose
            className={css.clearIcon}
            aria-hidden="true"
          />

          Clear filters
        </button>

        <Link
          href="/catalog"
          className={css.viewAllButton}
        >
          View all campers
        </Link>
      </div>
    </div>
  );
}