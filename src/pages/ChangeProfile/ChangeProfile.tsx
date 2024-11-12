import React, { useEffect, useState, useRef } from "react";
import Button from "../../Components/Button/Button";
import { Input } from "../../Components/input/index";
import { TextArea } from "../../Components/text-area/index";
import FileUpload from "@src/Components/File/FileUpload";
import { updateProfile } from "@src/store/slices/auth.slice";
import { useAppDispatch } from "@src/store/store";

interface UserData {
  contact_person: string;
  agency_name: string;
  email: string;
  profileImg: { url: string; public_id: string };
  contact_number: string;
  address: string;
  ref_by: string;
  uploadDocument: {};
}

const ChangeProfile: React.FC = () => {
  const storedData = localStorage.getItem("user");
  const userData: UserData | null = storedData ? JSON.parse(storedData) : null;
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File>();
  const [formData, setFormData] = useState<UserData>({
    contact_person: userData?.contact_person || "",
    email: userData?.email || "",
    agency_name: userData?.agency_name || "",
    contact_number: userData?.contact_number || "",
    address: userData?.address || "",
    ref_by: userData?.ref_by || "",
    profileImg: userData?.profileImg || {url : "", public_id : ""},
    uploadDocument: {},
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "meracloud16");

      fetch("https://api.cloudinary.com/v1_1/meracloud16/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...userData, profileImg: data })
          );
          setFormData((prev) => ({ ...prev, profileImg: data.url }));
          dispatch(updateProfile({ ...formData, profileImg: data.url }));
        })
        .catch((err) => console.error("Error uploading image", err));
    }
  }, [image]);

  const handleFileUpload = (
    fileContent: string | ArrayBuffer | null,
    fileType: string
  ) => {
    setFormData((prev) => ({ ...prev, [fileType]: fileContent }));
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg max-w-7xl m-auto">
      <h2 className="text-2xl font-bold mb-6">Agent Profile</h2>

      <div className="flex justify-center mb-4">
        <div onClick={handleImageClick} className="cursor-pointer">
          {formData.profileImg.url ? (
            <img
              src={formData.profileImg.url}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <span>{formData.agency_name && formData.agency_name[0] + formData.agency_name[1]}</span>
              </div>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Input
            label="Contact Person Name*"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
          />
          <Input
            label="Company Name"
            name="agency_name"
            value={formData.agency_name}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Username"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
            />
          </div>
          <TextArea
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            label="Referred by"
            name="ref_by"
            value={formData.ref_by}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-4">
          <FileUpload onFileUpload={handleFileUpload} />
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
