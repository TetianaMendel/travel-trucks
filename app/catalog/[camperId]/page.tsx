import {
 HydrationBoundary,
 QueryClient,
 dehydrate,
} from "@tanstack/react-query";

import CamperDetailsClient from "./CamperDetails.client";
import { getSingleCamper } from "@/lib/api/serverApi";

type Props = {
 params: Promise<{ camperId: string }>;
};

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
