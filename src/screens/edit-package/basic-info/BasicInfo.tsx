import { Input } from "@components/input";
import { IInfoProps } from "..";
import { Date } from "@components/date";
import { Select } from "@components/select";

export const BasicInfo: React.FC<IInfoProps> = ({ formData, handleChange }) => (
  <div className="flex flex-col items-center justify-center gap-5">
    <div className="divider">
      <span className="text-5xl">Basic Info</span>
    </div>
    <div className="grid grid-cols-3 gap-4 w-full">
      <Input
        label="Customer Name:"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
      />
      <Input
        label="Phone Number:"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <Date
        label="Travel Date:"
        name="travelDate"
        value={formData.travelDate}
        onChange={handleChange}
      />
      <Select
        label="No of Nights:"
        name="noOfNights"
        value={formData.noOfNights}
        onChange={handleChange}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: `${i + 1}`,
          value: i + 1,
        }))}
      />
      <Select
        label="No of Adults:"
        name="noOfAdult"
        value={formData.noOfAdult}
        onChange={handleChange}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: `${i + 1}`,
          value: i + 1,
        }))}
      />
      <Select
        label="No of Children:"
        name="noOfChild"
        value={formData.noOfChild}
        onChange={handleChange}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: `${i}`,
          value: i,
        }))}
      />
    </div>
  </div>
);
