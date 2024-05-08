// components/ImageDropzone.js

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/ImageDrop.css";

const ImageDropzone = ({ onDrop }) => {
  const onDropHandler = useCallback(
    (acceptedFiles) => {
      // Do something with the dropped files
      if (onDrop) {
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropHandler,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      <p>Drag files or click to upload</p>
    </div>
  );
};

export default ImageDropzone;
