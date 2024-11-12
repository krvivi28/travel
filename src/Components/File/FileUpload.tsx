import React from "react";
import { useDropzone } from "react-dropzone";
import upload from "../../assets/upload.svg"

interface FileUploadProps {
  onFileUpload: (content: string | ArrayBuffer | null, fileType: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        onFileUpload(content, file.type);
      };
      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="flex py-4 relative top-8 px-6 rounded-lg flex-col items-center gap-1 border border-[#EAECF0] bg-white"
    >
      <input {...getInputProps()} />
      <img className="h-10" src={upload} alt="Upload Icon" />
      <p className="text-sm text-[#475467] hover:cursor-pointer">
        Drag 'n' drop some files here, or{" "}
        <span className="font-semibold text-[#175CD3]">
          click to select files
        </span>{" "}
      </p>
      <p className="font-normal text-xs text-[#475467]">
        Only pdf, docx, png and jpg files will be accepted
      </p>
    </div>
  );
};

export default FileUpload;
