import { Date } from "@components/date";
import { Select } from "@components/select";
import { IInfoProps } from "..";
import { cityOptions, sightSeeingOptions } from "../constants";

export const SightseeingInfo: React.FC<IInfoProps> = ({
  formData,
  handleChange,
}) => (
  <div className="flex flex-col items-center justify-center gap-5">
    <div className="divider">
      <span className="text-5xl">Sight Seeing Info</span>
    </div>
    <div className="grid grid-cols-3 gap-4 w-full">
      <Select
        label="City:"
        name="sightseeingCity"
        value={formData.sightseeingCity}
        onChange={handleChange}
        options={cityOptions}
      />
      <Select
        label="Sightseeing:"
        name="sightseeing"
        value={formData.sightseeing}
        onChange={handleChange}
        options={sightSeeingOptions}
      />
      <Select
        label="No Of Adults:"
        name="noOfAdultSightseeing"
        value={formData.noOfAdultSightseeing}
        onChange={handleChange}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: `${i + 1}`,
          value: i + 1,
        }))}
      />
      <Select
        label="No Of Children:"
        name="noOfChildSightseeing"
        value={formData.noOfChildSightseeing}
        onChange={handleChange}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: `${i}`,
          value: i,
        }))}
      />
      <Date
        label="Date:"
        name="sightseeingDate"
        value={formData.sightseeingDate}
        onChange={handleChange}
      />
    </div>
  </div>
);
