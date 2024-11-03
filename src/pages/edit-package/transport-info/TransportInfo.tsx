import React from "react";
import { Select, Date } from "@src/components";
import { ITransportInfo } from "../interface";
import {
  cityOptions,
  transportOptions,
  transportPersonCounts,
} from "../constants";
import { RiDeleteBinLine } from "react-icons/ri";

interface TransportInfoProps {
  entries: ITransportInfo[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof ITransportInfo, value: any) => void;
}

export const TransportInfo: React.FC<TransportInfoProps> = ({
  entries,
  onAdd,
  onRemove,
  onChange,
}) => (
  <div className="flex flex-col items-start justify-center gap-5">
    <div className="divider">
      <span className="text-5xl">Transport Info</span>
    </div>
    {entries.map((entry, index) => (
      <div key={index} className="flex items-end justify-center gap-4 w-full">
        <div className="grid grid-cols-4 gap-3 w-[90%]">
          <Select
            label="City:"
            name="transportCity"
            value={entry.transportCity}
            onChange={(e) => onChange(index, "transportCity", e.target.value)}
            options={cityOptions}
          />
          <Select
            label="Transport:"
            name="transport"
            value={entry.transport}
            onChange={(e) => onChange(index, "transport", e.target.value)}
            options={transportOptions}
          />
          <Select
            label="No of Person:"
            name="transportPersonCount"
            value={entry.transportPersonCount}
            onChange={(e) =>
              onChange(index, "transportPersonCount", e.target.value)
            }
            options={transportPersonCounts}
          />
          <Date
            label="Date:"
            name="transportDate"
            value={entry.transportDate}
            onChange={(e) => onChange(index, "transportDate", e.target.value)}
          />
        </div>
        <button
          disabled={entries?.length === 1}
          className="btn btn-error btn-circle text-2xl"
          onClick={() => onRemove(index)}
        >
          <RiDeleteBinLine />
        </button>
      </div>
    ))}
    <button className="btn btn-primary" onClick={onAdd}>
      Add More
    </button>
  </div>
);
