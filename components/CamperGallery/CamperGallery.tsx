// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Swiper, SwiperSlide,} from "swiper/react";
// import { Thumbs } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import type { CamperImage } from "@/types/details";
// import "swiper/css";
// import styles from "./CamperGallery.module.css";

// type Props = {
//   images: CamperImage[];
//   name: string;
// };

// const CamperGallery = ({ images, name }: Props) => {
//   const [thumbsSwiper, setThumbsSwiper] =
//     useState<SwiperType | null>(null);

//   const sortedImages = [...images].sort(
//     (a, b) => a.order - b.order
//   );

//   if (!sortedImages.length) {
//     return null;
//   }

//   return (
//     <div className={styles.gallery}>
//       <Swiper
//         modules={[Thumbs]}
//         thumbs={{
//           swiper:
//             thumbsSwiper &&
//             !thumbsSwiper.destroyed
//               ? thumbsSwiper
//               : null,
//         }}
//         spaceBetween={10}
//         className={styles.mainSwiper}
//       >
//         {sortedImages.map((image) => (
//           <SwiperSlide
//             key={image.id}
//             className={styles.mainSlide}
//           >
//             <div
//               className={styles.mainImageWrapper}
//             >
//               <Image
//                 src={image.original}
//                 alt={`${name} camper`}
//                 fill
//                 priority
//                 sizes="(max-width: 900px) 100vw, 640px"
//                 className={styles.mainImage}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <Swiper
//         modules={[Thumbs]}
//         onSwiper={setThumbsSwiper}
//         watchSlidesProgress
//         spaceBetween={16}
//         slidesPerView={4}
//         className={styles.thumbsSwiper}
//       >
//         {sortedImages.map((image) => (
//           <SwiperSlide
//             key={image.id}
//             className={styles.thumbSlide}
//           >
//             <div className={styles.thumbWrapper}>
//               <Image
//                 src={
//                   image.thumb ||
//                   image.original
//                 }
//                 alt={`${name} thumbnail`}
//                 fill
//                 sizes="100px"
//                 className={styles.thumbImage}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default CamperGallery;

"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/thumbs";
import css from "./CamperGallery.module.css";
import { CamperImage } from "@/types/details";

interface CamperGalleryProps {
  gallery: CamperImage[];
}

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <section className={css.gallery}>
      <Swiper
        modules={[Thumbs]}
        thumbs={{
          swiper: thumbsSwiper,
        }}
        spaceBetween={10}
        slidesPerView={1}
        className={css.mainSwiper}
      >
        {gallery.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.original}
              alt="Camper"
              width={638}
              height={505}
              className={css.mainImage}
              loading="eager"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        spaceBetween={32}
        slidesPerView={4}
        className={css.thumbsSwiper}
      >
        {gallery.map((image) => (
          <SwiperSlide key={image.id}>
            <div className={css.thumbWrapper}>
              <Image
                src={image.thumb}
                alt="Camper thumbnail"
                width={136}
                height={144}
                className={css.thumbImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}