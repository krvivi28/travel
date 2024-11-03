import React from "react";
import { Input } from "@src/components";
import { IPricing } from "../interface";

interface PricingProps {
  pricing: IPricing;
  setPricing: React.Dispatch<React.SetStateAction<IPricing>>;
}

export const Pricing: React.FC<PricingProps> = ({ pricing, setPricing }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricing({ ...pricing, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-5xl">Pricing</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        <Input
          label="Total THB:"
          name="totalThb"
          value={pricing.totalThb}
          onChange={handleChange}
        />
        <Input
          label="THB to INR Rate:"
          name="thbToInrRate"
          value={pricing.thbToInrRate}
          onChange={handleChange}
        />
        <Input
          label="Service Charge Per Person INR:"
          name="serviceCharge"
          value={pricing.serviceCharge}
          onChange={handleChange}
        />
        <button
          onClick={() => alert("Calculate Pricing")}
          className="btn btn-primary mt-6 col-span-3"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};
