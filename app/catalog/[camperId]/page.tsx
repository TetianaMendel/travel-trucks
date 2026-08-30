import {
 HydrationBoundary,
 QueryClient,
 dehydrate,
} from "@tanstack/react-query";

import CamperDetailsClient from "./CamperDetails.client";
import { getSingleCamper } from "@/lib/api/serverApi";
import type { Metadata } from "next";

type Props = {
 params: Promise<{ camperId: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await getSingleCamper(camperId);

    return {
      title: `${camper.name} | TravelTrucks`,
      description: camper.description,
    };
  } catch {
    return {
      title: "TravelTrucks",
      description: "Find the perfect camper for your next adventure.",
    };
  }
}


const CamperDetails = async ({ params }: Props) => {
 const { camperId } = await params;
 const queryClient = new QueryClient();
 await queryClient.prefetchQuery({
   queryKey: ["camper", camperId],
   queryFn: () => getSingleCamper(camperId),
 });


 return (
   <HydrationBoundary state={dehydrate(queryClient)}>
     <CamperDetailsClient />
   </HydrationBoundary>
 );
};

export default CamperDetails;
