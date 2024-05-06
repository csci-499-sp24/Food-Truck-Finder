// components/ImageDropzone.js

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = ({ onDrop }) => {
  const onDropHandler = useCallback((acceptedFiles) => {
    // Do something with the dropped files
    if (onDrop) {
      onDrop(acceptedFiles);
    }
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropHandler });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`} >
      <input {...getInputProps()} />
      <p>Drag 'n' drop an image here, or click to select an image</p>
    </div>
  );
};

export default ImageDropzone;
