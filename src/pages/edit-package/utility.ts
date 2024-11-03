import {
  IBasicInfo,
  IHotelInfo,
  IPricing,
  ISightseeingInfo,
  ITransportInfo,
} from "./interface";

export const createInitialHotelState = (): IHotelInfo => ({
  city: "",
  hotel: "",
  roomCategory: "",
  checkInDate: "",
  nights: 1,
  exAdult: 0,
  exChild: 0,
});

export const createInitialTransportState = (): ITransportInfo => ({
  transport: "",
  transportPersonCount: "1-4 PAX",
  transportDate: "",
  transportCity: "",
});

export const createInitialSightseeingState = (): ISightseeingInfo => ({
  sightseeing: "",
  sightseeingCity: "",
  noOfAdultSightseeing: 0,
  noOfChildSightseeing: 0,
  sightseeingDate: "",
  remarks: "",
});

export const createInitialBasicState = (): IBasicInfo => ({
  customerName: "",
  phoneNumber: "",
  travelDate: "",
  noOfNights: 0,
  noOfAdult: 0,
  noOfChild: 0,
});
export const createInitialPricingState = (): IPricing => ({
  thbToInrRate: 0,
  serviceCharge: 0,
  totalThb: 0,
});
