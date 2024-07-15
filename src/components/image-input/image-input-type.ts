export interface FileWithUrl {
  name: string;
  getUrl: string;
  isError: boolean;
  isLoading: boolean;
}
export type ImageInputAction =
  | {
      type: "ADD_FILES_BEFORE_UPLOAD";
      payload: { files: File[] };
    }
  | {
      type: "UPADTE_FILE_STATE_AFTER_UPLOAD";
      payload: { file: FileWithUrl };
    }
  | {
      type: "REMOVE_FILE_FROM_INPUT";
      payload: { index: number };
    }
  | {
      type: "MOVE_ITEM_UP";
      payload: { index: number };
    }
  | {
      type: "MOVE_ITEM_DOWN";
      payload: { index: number };
    }
  | {
      type: "SET_FILES";
      payload: { files: FileWithUrl[] };
    };

export type ImageState = FileWithUrl[];

//just in case user upload two files with the same name
export const namingFile = (name: string, index: number) => `${name}-${index}`;
