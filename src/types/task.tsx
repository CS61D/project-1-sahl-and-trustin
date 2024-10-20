import { splitExtension } from "../lib/utils";

export type options = {
  basename: string;
  format: string;
};

type downloadInfo = {
  url: string;
  filesize: number;
};

export type Task = {
  inputFile: File;
  output: options;
  downloadInfo?: downloadInfo;
};

export const createTask = (file: File) => {
  const { name, extension } = splitExtension(file.name);

  const options = {
    basename: name,
    format: extension,
  };
  return {
    inputFile: file,
    output: options,
    downloadInfo: undefined,
  };
};
