import React, { useEffect, useState, useRef } from "react";
import Button from "../../Components/Button/Button";
import { Input } from "../../Components/input/index";
import { TextArea } from "../../Components/text-area/index";
import FileUpload from "@src/Components/File/FileUpload";
import { updateProfile } from "@src/store/slices/auth.slice";
import { RootState, useAppDispatch } from "@src/store/store";
import { useSelector } from "react-redux";
import { uploadImage } from "@src/store/slices/fileUpload.slice";
import { IUser } from "@src/store/slices/interfaces";
import Avatar from "@src/components/Avatar/Avatar";
import { APIRequestState } from "@src/store/utils";
import ImagePreview from "@src/components/Preview/Preview";
import { updateUserDetails } from "@src/store/slices/user.slice";
import toast from "react-hot-toast";
interface IUserData {
  contact_person?: string;
  agency_name: string;
  email: string;
  contact_number: string;
  address: string;
  ref_by: string;
}
const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: fileData,
    isFileUploading,
    error,
  } = useSelector((state: RootState) => state.fileUpload);

  const {
    userDetails,
    error: userDetilsError,
    isUserDetailsLoading,
    action,
  } = useSelector((state: RootState) => state.user);

  const [isProfileAvatarUploading, setIsProfileAvatarUploading] =
    useState(false);

  const [userData, setUserData] = useState<IUserData>({
    contact_person: "",
    agency_name: "",
    email: "",
    contact_number: "",
    address: "",
    ref_by: "",
  });

  useEffect(() => {
    setUserData({
      contact_number: userDetails?.contact_number || "",
      agency_name: userDetails?.agency_name || "",
      contact_person: userDetails?.contact_person || "",
      address: userDetails?.address || "",
      ref_by: userDetails?.ref_by || "",
      email: userDetails?.email || "",
    });
  }, [userDetails]);

  useEffect(() => {
    if (fileData) {
      isProfileAvatarUploading
        ? dispatch(
            updateUserDetails({
              profileImg: {
                public_id: (fileData as any)?.public_id,
                url: (fileData as any)?.url,
              },
            } as any)
          )
        : dispatch(
            updateUserDetails({
              document: {
                public_id: (fileData as any)?.public_id,
                url: (fileData as any)?.url,
              },
            } as any)
          );
    }
  }, [fileData]);

  const uploadFile = (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "meracloud16");
    dispatch(uploadImage(data));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setIsProfileAvatarUploading(true);
    if (file) uploadFile(file);
  };

  const onFileDrop = (files: File[]) => {
    const file = files[0];
    setIsProfileAvatarUploading(false);
    uploadFile(file);
  };

  const handleProfileUpdate = () => {
    dispatch(updateUserDetails(userData as any));
  };

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: "none" }}
          />
          <Avatar
            onClick={() => {
              fileInputRef.current?.click();
            }}
            url={userDetails?.profileImg?.url}
            tooltipText="click to edit"
            name={userData?.agency_name}
            isVerified={userDetails?.isVerified}
          />
          {isFileUploading === APIRequestState.LOADING &&
            isProfileAvatarUploading && (
              <div className="flex gap-1 items-center">
                <span className="loading loading-spinner text-black"></span>
                <span className="text-blue-600"> updating...</span>
              </div>
            )}

          <Input
            label="Company Name"
            name="agency_name"
            value={userData?.agency_name}
            onChange={(e) =>
              setUserData({ ...userData, agency_name: e.target.value })
            }
          />
          <Input
            label="Contact Person Name*"
            name="contact_person"
            value={userData?.contact_person}
            onChange={(e) =>
              setUserData({ ...userData, contact_person: e.target.value })
            }
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Email"
              name="email"
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Input
              label="Phone Number"
              name="contact_number"
              value={userData?.contact_number}
              onChange={(e) =>
                setUserData({ ...userData, contact_number: e.target.value })
              }
            />
          </div>
          <TextArea
            label="Address"
            name="address"
            value={userData?.address || ""}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />
          <Input
            label="Referred by"
            name="ref_by"
            value={userData?.ref_by}
            onChange={(e) =>
              setUserData({ ...userData, ref_by: e.target.value })
            }
          />
          <button
            onClick={handleProfileUpdate}
            className="btn btn-primary w-full mt-3"
          >
            {isUserDetailsLoading === APIRequestState.LOADING && (
              <span className="loading loading-spinner"></span>
            )}
            {isUserDetailsLoading === APIRequestState.LOADING
              ? "Updating..."
              : "Update Profile"}
          </button>
        </div>

        <div className="pl-4">
          <h2 className="text-2xl font-bold mb-6">Documents</h2>
          {userDetails?.document?.url && (
            <div className="badge badge-accent mb-1">1</div>
          )}
          <div className="">
            <FileUpload
              isLoading={
                isFileUploading === APIRequestState.LOADING &&
                !isProfileAvatarUploading
              }
              onFileDrop={onFileDrop}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
