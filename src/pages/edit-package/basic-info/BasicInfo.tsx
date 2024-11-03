import { Date, Input, Select } from "@src/components";
import React from "react";
import { IBasicInfo } from "../interface";

interface BasicInfoProps {
  basicInfo: IBasicInfo;
  setBasicInfo: React.Dispatch<React.SetStateAction<IBasicInfo>>;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({
  basicInfo,
  setBasicInfo,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-5xl">Basic Info</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        <Input
          label="Customer Name:"
          name="customerName"
          value={basicInfo.customerName}
          onChange={handleChange}
        />
        <Input
          label="Phone Number:"
          name="phoneNumber"
          value={basicInfo.phoneNumber}
          onChange={handleChange}
        />
        <Date
          label="Travel Date:"
          name="travelDate"
          value={basicInfo.travelDate}
          onChange={handleChange}
        />
        <Select
          label="No of Nights:"
          name="noOfNights"
          value={basicInfo.noOfNights}
          onChange={handleChange}
          options={Array.from({ length: 5 }, (_, i) => ({
            label: `${i + 1}`,
            value: i + 1,
          }))}
        />
        <Select
          label="No of Adults:"
          name="noOfAdult"
          value={basicInfo.noOfAdult}
          onChange={handleChange}
          options={Array.from({ length: 5 }, (_, i) => ({
            label: `${i + 1}`,
            value: i + 1,
          }))}
        />
        <Select
          label="No of Children:"
          name="noOfChild"
          value={basicInfo.noOfChild}
          onChange={handleChange}
          options={Array.from({ length: 5 }, (_, i) => ({
            label: `${i}`,
            value: i,
          }))}
        />
      </div>
    </div>
  );
};
