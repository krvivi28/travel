import React from "react";
import { Select, Date } from "@src/components";
import { ISightseeingInfo } from "../interface";
import { cityOptions, sightSeeingOptions } from "../constants";

interface SightseeingInfoProps {
  entries: ISightseeingInfo[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof ISightseeingInfo, value: any) => void;
}

export const SightseeingInfo: React.FC<SightseeingInfoProps> = ({
  entries,
  onAdd,
  onRemove,
  onChange,
}) => (
  <div className="flex flex-col gap-5">
    <h2 className="text-xl font-semibold">Sightseeing Info</h2>
    {entries.map((entry, index) => (
      <div key={index} className="grid grid-cols-3 gap-4">
        <Select
          label="City"
          name="sightseeingCity"
          value={entry.sightseeingCity}
          onChange={(e) => onChange(index, "sightseeingCity", e.target.value)}
          options={cityOptions}
        />
        <Select
          label="Sightseeing"
          name="sightseeing"
          value={entry.sightseeing}
          onChange={(e) => onChange(index, "sightseeing", e.target.value)}
          options={sightSeeingOptions}
        />
        <Select
          label="No of Adults"
          name="noOfAdultSightseeing"
          value={entry.noOfAdultSightseeing}
          onChange={(e) =>
            onChange(index, "noOfAdultSightseeing", e.target.value)
          }
          options={Array.from({ length: 5 }, (_, i) => ({
            label: `${i + 1}`,
            value: i + 1,
          }))}
        />
        <Select
          label="No of Children"
          name="noOfChildSightseeing"
          value={entry.noOfChildSightseeing}
          onChange={(e) =>
            onChange(index, "noOfChildSightseeing", e.target.value)
          }
          options={Array.from({ length: 5 }, (_, i) => ({
            label: `${i + 1}`,
            value: i + 1,
          }))}
        />
        <Date
          label="Date"
          name="sightseeingDate"
          value={entry.sightseeingDate}
          onChange={(e) => onChange(index, "sightseeingDate", e.target.value)}
        />
        <button className="btn btn-error" onClick={() => onRemove(index)}>
          Remove
        </button>
      </div>
    ))}
    <button className="btn btn-primary" onClick={onAdd}>
      Add More
    </button>
  </div>
);
