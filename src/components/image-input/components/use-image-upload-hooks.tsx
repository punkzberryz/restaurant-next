"use client";

import { useState } from "react";

export const useImageUploadHooks = (
  handleUploadFile: (file: FileList) => void,
) => {
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  // triggers when file is selected with click
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUploadFile(e.target.files);
    }
  };
  // triggers when file is dropped
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
  return { dragActive, handleDrag, handleChange, handleDrop };
};
