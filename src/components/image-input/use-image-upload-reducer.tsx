"use client";

import { useReducer } from "react";
import { ImageInputAction, ImageState, namingFile } from "./image-input-type";

export const useImageUploadReducer = () => {
  return useReducer((state: ImageState, action: ImageInputAction) => {
    switch (action.type) {
      case "ADD_FILES_BEFORE_UPLOAD": {
        const newFiles = action.payload.files.map((file, index) => ({
          name: namingFile(file.name, index),
          getUrl: URL.createObjectURL(file),
          size: file.size,
          isLoading: true,
          isError: false,
        }));
        return [...state, ...newFiles];
      }
      case "UPADTE_FILE_STATE_AFTER_UPLOAD": {
        //search for the file with the same name and update it
        const newState = state.map((file) => {
          if (file.name === action.payload.file.name) {
            return action.payload.file;
          }
          return file;
        });
        return [...newState];
      }
      case "REMOVE_FILE_FROM_INPUT": {
        const newState = [...state];
        //remove one element, at position "index"
        newState.splice(action.payload.index, 1);
        return [...newState];
      }

      case "MOVE_ITEM_UP": {
        const index = action.payload.index;
        if (index === 0) return state;
        const newState = [...state];
        const item = newState[index];
        newState[index] = newState[index - 1];
        newState[index - 1] = item;
        return [...newState];
      }
      case "MOVE_ITEM_DOWN": {
        const index = action.payload.index;
        if (index === state.length - 1) return state;
        const newState = [...state];
        const item = newState[index];
        newState[index] = newState[index + 1];
        newState[index + 1] = item;
        return [...newState];
      }
      case "SET_FILES": {
        return [...action.payload.files];
      }
      default:
        return state;
    }
  }, []);
};
