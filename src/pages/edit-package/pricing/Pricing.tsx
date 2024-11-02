import { IInfoProps } from "..";
import { Input } from "@components/input";

export const Pricing: React.FC<IInfoProps> = ({ formData, handleChange }) => (
  <div className="flex flex-col items-center justify-center gap-5">
    <div className="divider">
      <span className="text-5xl">Pricing</span>
    </div>
    <div className="grid grid-cols-3 gap-4 w-full">
      <Input
        label="Total THB:"
        name="totalThb"
        value={formData.totalThb}
        onChange={handleChange}
      />
      <Input
        label="THB to INR Rate:"
        name="thbToInrRate"
        value={formData.thbToInrRate}
        onChange={handleChange}
      />
      <Input
        label="Service Charge Per Person INR:"
        name="serviceCharge"
        value={formData.serviceCharge}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => alert("Calculate Pricing")}
        className="btn btn-primary mt-6 col-span-3"
      >
        Calculate
      </button>
    </div>
  </div>
);
