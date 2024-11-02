import React, { useState } from "react";
import { BasicInfo } from "./basic-info/BasicInfo";
import { HotelInfo } from "./hotel-info/HotelInfo";
import { TransportInfo } from "./transport-info/TransportInfo";
import { SightseeingInfo } from "./sight-seeing-info/SightSeeingInfo";
import { Pricing } from "./pricing/Pricing";

const EditTravelPackage: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    customerName: "",
    phoneNumber: "",
    travelDate: "",
    noOfNights: 0,
    noOfAdult: 0,
    noOfChild: 0,
    city: "Bangkok",
    hotel: "Grand Alpine Hotel 3*",
    roomCategory: "Superior Room",
    nights: 1,
    exAdult: 1,
    exChild: 4,
    checkInDate: "",
    transportCity: "All",
    transport: "01 Way Taxi From Bangkok Hotel to ...",
    transportPersonCount: "5-10 PAX",
    transportDate: "",
    sightseeingCity: "Bangkok",
    sightseeing: "Sky walk daytime Tickets (Bangkok)",
    noOfAdultSightseeing: 5,
    noOfChildSightseeing: 4,
    sightseeingDate: "",
    remarks: "",
    thbToInrRate: 2.6,
    serviceCharge: 5,
    totalThb: 15820,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log({ formData });

  return (
    <div className="p-6 card gap-10">
      <span className="text-5xl">Make Your Thailand Package</span>
      <div className="w-full flex flex-col gap-20 p-5">
        <BasicInfo formData={formData} handleChange={handleChange} />
        <HotelInfo formData={formData} handleChange={handleChange} />
        <TransportInfo formData={formData} handleChange={handleChange} />
        <SightseeingInfo formData={formData} handleChange={handleChange} />
        <Pricing formData={formData} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default EditTravelPackage;

interface IFormData {
  customerName: string;
  phoneNumber: string;
  travelDate: string;
  noOfNights: number;
  noOfAdult: number;
  noOfChild: number;
  city: string;
  hotel: string;
  roomCategory: string;
  nights: number;
  exAdult: number;
  exChild: number;
  checkInDate: string;
  transportCity: string;
  transport: string;
  transportPersonCount: string;
  transportDate: string;
  sightseeingCity: string;
  sightseeing: string;
  noOfAdultSightseeing: number;
  noOfChildSightseeing: number;
  sightseeingDate: string;
  remarks: string;
  thbToInrRate: number;
  serviceCharge: number;
  totalThb: number;
}

export interface IInfoProps {
  formData: IFormData;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}