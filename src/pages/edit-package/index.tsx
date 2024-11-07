import React, { useState } from "react";
import { BasicInfo } from "./basic-info/BasicInfo";
import { HotelInfo } from "./hotel-info/HotelInfo";
import { TransportInfo } from "./transport-info/TransportInfo";
import { SightseeingInfo } from "./sight-seeing-info/SightSeeingInfo";
import { Pricing } from "./pricing/Pricing";
import {
  createInitialBasicState,
  createInitialHotelState,
  createInitialPricingState,
  createInitialSightseeingState,
  createInitialTransportState,
} from "./utility";
import {
  IBasicInfo,
  IHotelInfo,
  IPricing,
  ISightseeingInfo,
  ITransportInfo,
} from "./interface";
import { TextArea } from "@src/components";

{}

const EditTravelPackage: React.FC = () => {
  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    createInitialBasicState()
  );
  const [hotelInfo, setHotelInfo] = useState<IHotelInfo[]>([
    createInitialHotelState(),
  ]);
  const [transportInfo, setTransportInfo] = useState<ITransportInfo[]>([
    createInitialTransportState(),
  ]);
  const [sightseeingInfo, setSightseeingInfo] = useState<ISightseeingInfo[]>([
    createInitialSightseeingState(),
  ]);
  const [pricing, setPricing] = useState<IPricing>(createInitialPricingState());
  const [remarks, setRemarks] = useState<string>("");

  const handleAdd = <T,>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    creator: () => T
  ) => {
    setter((prev) => [...prev, creator()]);
  };

  const handleRemove =
    <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>) =>
    (index: number) => {
      setter((prev) => prev.filter((_, i) => i !== index));
    };

  const handleChange =
    <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>) =>
    (index: number, field: keyof T, value: T[keyof T]) => {
      setter((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      );
    };

  return (
    <div className="p-6 card gap-10">
      <span className="text-5xl">Make Your Thailand Package</span>
      <div className="w-full flex flex-col gap-10 p-5">
        <BasicInfo basicInfo={basicInfo} setBasicInfo={setBasicInfo} />
        <HotelInfo
          entries={hotelInfo}
          onAdd={() => handleAdd(setHotelInfo, createInitialHotelState)}
          onRemove={handleRemove(setHotelInfo)}
          onChange={handleChange(setHotelInfo)}
        />
        <TransportInfo
          entries={transportInfo}
          onAdd={() => handleAdd(setTransportInfo, createInitialTransportState)}
          onRemove={handleRemove(setTransportInfo)}
          onChange={handleChange(setTransportInfo)}
        />
        <SightseeingInfo
          entries={sightseeingInfo}
          onAdd={() =>
            handleAdd(setSightseeingInfo, createInitialSightseeingState)
          }
          onRemove={handleRemove(setSightseeingInfo)}
          onChange={handleChange(setSightseeingInfo)}
        />
        <div>
          <div className="divider divider-info" />
          <TextArea
            label="Remarks"
            name="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <Pricing pricing={pricing} setPricing={setPricing} />
      </div>
    </div>
  );
};

export default EditTravelPackage;
