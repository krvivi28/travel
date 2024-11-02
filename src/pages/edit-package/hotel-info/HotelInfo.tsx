import { Select } from "@components/select";
import { Date } from "@components/date";
import { IInfoProps } from "..";
import { cityOptions, hotelOptions, roomCategoryOptions } from "../constants";

export const HotelInfo: React.FC<IInfoProps> = ({ formData, handleChange }) => (
  <div className="flex flex-col items-center justify-center gap-5">
    <div className="divider">
      <span className="text-5xl">Hotel Info</span>
    </div>
    <div className="grid grid-cols-3 gap-4 w-full">
      <Select
        label="City:"
        name="city"
        value={formData.city}
        onChange={handleChange}
        options={cityOptions}
      />
      <Select
        label="Hotels:"
        name="hotel"
        value={formData.hotel}
        onChange={handleChange}
        options={hotelOptions}
      />
      <Select
        label="Room Category:"
        name="roomCategory"
        value={formData.roomCategory}
        onChange={handleChange}
        options={roomCategoryOptions}
      />
      <Date
        label="Check In Date:"
        name="checkInDate"
        value={formData.checkInDate}
        onChange={handleChange}
      />
      <Select
        label="Nights:"
        name="nights"
        value={formData.nights}
        onChange={handleChange}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: `${i + 1}`,
          value: i + 1,
        }))}
      />
      <Select
        label="Extra Adult:"
        name="exAdult"
        value={formData.exAdult}
        onChange={handleChange}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: `${i}`,
          value: i,
        }))}
      />
      <Select
        label="Extra Child:"
        name="exChild"
        value={formData.exChild}
        onChange={handleChange}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: `${i}`,
          value: i,
        }))}
      />
    </div>
  </div>
);
