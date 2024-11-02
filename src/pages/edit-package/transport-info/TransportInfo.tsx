import { Select } from "@components/select";
import { Date } from "@components/date";
import { IInfoProps } from "..";
import {
  cityOptions,
  transportOptions,
  transportPersonCounts,
} from "../constants";
import { TextArea } from "@src/components/text-area";

export const TransportInfo: React.FC<IInfoProps> = ({
  formData,
  handleChange,
}) => (
  <div className="flex flex-col items-center justify-center gap-5">
    <div className="divider">
      <span className="text-5xl">Transport Info</span>
    </div>
    <div className="grid grid-cols-3 gap-4 w-full">
      <Select
        label="City:"
        name="transportCity"
        value={formData.transportCity}
        onChange={handleChange}
        options={cityOptions}
      />
      <Select
        label="Transport:"
        name="transport"
        value={formData.transport}
        onChange={handleChange}
        options={transportOptions}
      />
      <Select
        label="No Of Person:"
        name="transportPersonCount"
        value={formData.transportPersonCount}
        onChange={handleChange}
        options={transportPersonCounts}
      />
      <Date
        label="Date:"
        name="transportDate"
        value={formData.transportDate}
        onChange={handleChange}
      />
    </div>
    <div className="w-full">
      <TextArea
        label="Remarks:"
        name="remarks"
        value={formData.remarks}
        onChange={handleChange}
      />
    </div>
  </div>
);
