import React from "react";
import { Select, Date, TextArea } from "@src/components";
import { ITransportInfo } from "../interface";
import {
  cityOptions,
  transportOptions,
  transportPersonCounts,
} from "../constants";

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
  <div className="flex flex-col gap-5">
    <h2 className="text-xl font-semibold">Transport Info</h2>
    {entries.map((entry, index) => (
      <div key={index} className="grid grid-cols-3 gap-4">
        <Select
          label="City"
          name="transportCity"
          value={entry.transportCity}
          onChange={(e) => onChange(index, "transportCity", e.target.value)}
          options={cityOptions}
        />
        <Select
          label="Transport"
          name="transport"
          value={entry.transport}
          onChange={(e) => onChange(index, "transport", e.target.value)}
          options={transportOptions}
        />
        <Select
          label="No of Person"
          name="transportPersonCount"
          value={entry.transportPersonCount}
          onChange={(e) =>
            onChange(index, "transportPersonCount", e.target.value)
          }
          options={transportPersonCounts}
        />
        <Date
          label="Date"
          name="transportDate"
          value={entry.transportDate}
          onChange={(e) => onChange(index, "transportDate", e.target.value)}
        />
        <TextArea
          label="Remarks"
          name="remarks"
          value={entry.remarks}
          onChange={(e) => onChange(index, "remarks", e.target.value)}
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
