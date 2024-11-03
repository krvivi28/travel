import React from "react";
import { Select, Date } from "@src/components";
import { IHotelInfo, IInfoProps } from "../interface";
import { cityOptions, hotelOptions, roomCategoryOptions } from "../constants";

interface HotelInfoProps extends IInfoProps<IHotelInfo> {}

export const HotelInfo: React.FC<HotelInfoProps> = ({
  entries,
  onAdd,
  onRemove,
  onChange,
}) => (
  <div className="flex flex-col items-center justify-center gap-5">
    <h2 className="text-5xl">Hotel Info</h2>
    {entries.map((entry, index) => (
      <div key={index} className="grid grid-cols-3 gap-4 w-full">
        <Select
          label="City:"
          name="city"
          value={entry.city}
          onChange={(e) => onChange(index, "city", e.target.value)}
          options={cityOptions}
        />
        <Select
          label="Hotels:"
          name="hotel"
          value={entry.hotel}
          onChange={(e) => onChange(index, "hotel", e.target.value)}
          options={hotelOptions}
        />
        <Select
          label="Room Category:"
          name="roomCategory"
          value={entry.roomCategory}
          onChange={(e) => onChange(index, "roomCategory", e.target.value)}
          options={roomCategoryOptions}
        />
        <Date
          label="Check In Date:"
          name="checkInDate"
          value={entry.checkInDate}
          onChange={(e) => onChange(index, "checkInDate", e.target.value)}
        />
        <Select
          label="Nights:"
          name="nights"
          value={entry.nights}
          onChange={(e) => onChange(index, "nights", e.target.value)}
          options={Array.from({ length: 5 }, (_, i) => ({
            label: `${i + 1}`,
            value: i + 1,
          }))}
        />
        <Select
          label="Extra Adult:"
          name="exAdult"
          value={entry.exAdult}
          onChange={(e) => onChange(index, "exAdult", e.target.value)}
          options={Array.from({ length: 5 }, (_, i) => ({
            label: `${i}`,
            value: i,
          }))}
        />
        <Select
          label="Extra Child:"
          name="exChild"
          value={entry.exChild}
          onChange={(e) => onChange(index, "exChild", e.target.value)}
          options={Array.from({ length: 5 }, (_, i) => ({
            label: `${i}`,
            value: i,
          }))}
        />
        <button onClick={() => onRemove(index)} className="btn btn-error">
          Remove
        </button>
      </div>
    ))}
    <button onClick={onAdd} className="btn btn-primary">
      Add More
    </button>
  </div>
);
