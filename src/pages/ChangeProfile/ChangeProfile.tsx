import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import { Input } from "../../Components/input/index";
import { TextArea } from "../../Components/text-area/index";

const ChangeProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    contactPersonName: "",
    username: "b2b@yaronkisawari.com",
    password: "",
    companyName: "yaronkisawari holidays",
    phoneNumber: "6291235923",
    address: "Darjeeling",
    referredBy: "",
    uploadLogo: null,
    uploadDocument: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-xl max-w-7xl m-auto">
      <h2 className="text-2xl font-bold mb-6">Agent Profile</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Input
            label="Contact Person Name*"
            name="contactPersonName"
            value={formData.contactPersonName}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              showPasswordToggle
            />

            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <TextArea
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Logo</span>
            </label>
            <input
              type="file"
              name="uploadLogo"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">
                Upload Company Document
              </span>
            </label>
            <input
              type="file"
              name="uploadDocument"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <Input
            label="Referred by"
            name="referredBy"
            value={formData.referredBy}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          className="btn btn-primary w-48"
          onClick={() => console.log("Profile updated", formData)}
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default ChangeProfile;
