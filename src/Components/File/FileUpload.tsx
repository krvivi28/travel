import React from "react";
import { useDropzone } from "react-dropzone";
import upload from "../../assets/upload.svg";
interface DroppableFileInputProps {
  onFileDrop: (files: File[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const DroppableFileInput: React.FC<DroppableFileInputProps> = ({
  onFileDrop,
  disabled = false,
  isLoading = false,
}) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop: onFileDrop,
      disabled,
    });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg px-1 py-10 text-center flex flex-col gap-2 items-center justify-center cursor-pointer 
        ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"}
        ${isDragActive ? "border-blue-500 bg-slate-50" : "border-gray-300"}
        ${isDragReject ? "border-red-500" : ""}`}
    >
      <input {...getInputProps()} />
      <div>
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <img src={upload} alt="" />
        )}
      </div>
      {isDragReject ? (
        <p className="text-red-500">Unsupported file type</p>
      ) : isDragActive ? (
        <p className="text-blue-500">Drop the files here...</p>
      ) : (
        <p className="text-sm font-semibold">
          {disabled ? "File upload disabled" : "Drag and drop files here,"}{" "}
          <span className="text-blue-700"> or click to select files</span>
        </p>
      )}
    </div>
  );
};

export default DroppableFileInput;
