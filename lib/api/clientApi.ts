import { api } from "./api";

import type {
  CamperFilterParams,
  CamperListResponse,
} from "@/types/camper";

import type {
  BookingRequest,
  BookingResponse,
  CamperDetails,
} from "@/types/details";

export const getCampers = async (
  params: CamperFilterParams
): Promise<CamperListResponse> => {
  const { data } = await api.get<CamperListResponse>("/campers", {
    params,
  });

  return data;
};

export const getSingleCamper = async (
  camperId: string
): Promise<CamperDetails> => {
  const { data } = await api.get<CamperDetails>(
    `/campers/${camperId}`
  );

  return data;
};

export const createBooking = async (
  camperId: string,
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/bookings`,
    bookingData
  );

  return data;
};