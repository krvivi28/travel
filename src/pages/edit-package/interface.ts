export interface IBasicInfo {
  customerName: string;
  phoneNumber: string;
  travelDate: string;
  noOfNights: number;
  noOfAdult: number;
  noOfChild: number;
}
export interface IPricing {
  thbToInrRate: number;
  serviceCharge: number;
  totalThb: number;
}

export interface IHotelInfo {
  city: string;
  hotel: string;
  roomCategory: string;
  nights: number;
  exAdult: number;
  exChild: number;
  checkInDate: string;
}

export interface ITransportInfo {
  remarks: string;
  transportCity: string;
  transport: string;
  transportPersonCount: string;
  transportDate: string;
}

export interface ISightseeingInfo {
  sightseeingCity: string;
  sightseeing: string;
  noOfAdultSightseeing: number;
  noOfChildSightseeing: number;
  sightseeingDate: string;
  remarks: string;
}

export interface IInfoProps<T> {
  entries: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof T, value: T[keyof T]) => void;
}
