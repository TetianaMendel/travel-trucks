import { CamperListItem } from '@/types/camper';
import Image from 'next/image';
import Link from 'next/link';


type Props = {
  item: CamperListItem;
};

const CamperItem = ({ item }: Props) => {
  return (
    <li>
      <Image
        src={item.coverImage}
        alt={item.name}
        width={219}
        height={240}
      />

      <h2>{item.name}</h2>

      <p>€{item.price}</p>

      <p>
        ★ {item.rating} ({item.totalReviews} reviews)
      </p>

      <p>{item.location}</p>

      <p>{item.form}</p>

      <p>{item.transmission}</p>

      <p>{item.engine}</p>
     
      <Link href={`/catalog/${item.id}`}>
        View details
      </Link>
    </li>
  );
};

export default CamperItem;