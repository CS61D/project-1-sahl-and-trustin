import { splitExtension } from "../lib/utils";

//* It's convention to always have types be capitalized, so it would be Options
export type options = {
  basename: string;
  format: string;
};

//* It's convention to always have types be capitalized, so it would be DownloadInfo
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
