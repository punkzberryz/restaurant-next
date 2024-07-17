"use client";

import { useReducer } from "react";
import {
  MultipleImagesInputAction,
  MultipleImagesState,
  namingFile,
  SingleImageInputAction,
  SingleImageState,
} from "./image-input-type";

//For single image upload input
export const useSingleImageUploadReducer = () => {
  return useReducer(
    (state: SingleImageState | null, action: SingleImageInputAction) => {
      switch (action.type) {
        case "ADD_FILE_BEFORE_UPLOAD": {
          return {
            name: action.payload.file.name,
            getUrl: URL.createObjectURL(action.payload.file),
            size: action.payload.file.size,
            isLoading: true,
            isError: false,
          };
        }
        case "UPDATE_FILE_STATE_AFTER_UPLOAD": {
          return action.payload.file;
        }
        case "REMOVE_FILE_FROM_INPUT": {
          return null;
        }
        case "SET_FILE": {
          return action.payload.file;
        }
        default:
          return state;
      }
    },
    null,
  );
};

//For multiple image upload input
export const useMultipleImagesUploadReducer = () => {
  return useReducer(
    (state: MultipleImagesState, action: MultipleImagesInputAction) => {
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
    },
    [],
  );
};
