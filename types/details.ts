import type {
  CamperAmenity,
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "./camper";

export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface CamperDetails {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: CamperAmenity[];
  gallery: CamperImage[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingRequest {
  name: string;
  email: string;
}

export interface BookingResponse {
  message: string;
}