import { api } from "./api";

import type {
  CamperFilterParams,
  CamperListResponse,
} from "@/types/camper";

import type { CamperDetails } from "@/types/details";

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