import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface FilePreviewProps {
  fileUrl: string;
  onRemove?: () => void;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FilePreview: React.FC<FilePreviewProps> = ({ fileUrl, onRemove }) => {
  const isImage = /\.(jpeg|jpg|png|gif)$/i.test(fileUrl);
  const isPdf = /\.pdf$/i.test(fileUrl);

  return (
    <div className="relative w-64 h-64 border border-gray-300 rounded-lg overflow-hidden shadow-md">
      {isImage && (
        <img
          src={fileUrl}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      )}
      {isPdf && (
        <Document
          file={fileUrl}
          className="w-full h-full flex justify-center items-center"
        >
          <Page pageNumber={1} width={200} />
        </Document>
      )}
      {!isImage && !isPdf && (
        <p className="text-gray-500 flex items-center justify-center h-full">
          Unsupported file type
        </p>
      )}

      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full focus:outline-none hover:bg-red-600"
          aria-label="Remove File"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default FilePreview;
