import { useState } from "react";
import type { Task, options } from "../types/task";

type FileBoxProps = {
  task: Task;
  updateTask: (task: Task, options: options) => void;
  handleConvert: (task: Task) => void;
  handleDownload: (url: string, filename: string) => void;
  onRemove: (task: Task) => void;
};

const FileBox = ({
  task,
  updateTask,
  handleConvert,
  handleDownload,
  onRemove,
}: FileBoxProps) => {
  //* This works, but you could have saved yourself some effort by using formatFileSize in utils.ts
  const getFileSize = (size: number) => {
    return (size / 1024).toFixed(2);
  };
  const fileSizeKB = getFileSize(task.inputFile.size);
  const outputSizeKB = task.downloadInfo
    ? getFileSize(task.downloadInfo.filesize)
    : "";

  const renderDownloadButton = () => {
    return (
      <div className="flex items-center space-x-4 p-2">
        <button
          className="text-sm text-blue-500 hover:text-blue-700"
          type="button"
          onClick={() => {
            if (task.downloadInfo) {
              handleDownload(
                task.downloadInfo.url,
                `${task.output.basename}.${task.output.format}`,
              );
            }
          }} //
        >
          Download
        </button>
      </div>
    );
  };

  const renderConvertButton = () => {
    return (
      <div className="flex items-center space-x-4 p-2">
        <button
          className="text-sm text-blue-500 hover:text-blue-700"
          type="button"
          onClick={() => {
            handleConvert(task);
          }} // Trigger convert function
        >
          Convert
        </button>
      </div>
    );
  };

  const renderFileSize = () => {
    return (
      <div className="min-w-20">
        <label htmlFor="file-size">File Size</label>
        <p id="file-size" className="text-sm text-gray-500">
          {outputSizeKB ? `${outputSizeKB} KB` : ""}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between p-6 border border-gray-300 rounded-lg mb-4 shadow-lg bg-white">
      <div className="flex flex-col min-w-40">
        <p className="text-lg font-semibold text-gray-800">
          {task.inputFile.name}
        </p>
        <p className="text-sm text-gray-500">{fileSizeKB} KB</p>
      </div>

      <div>
        <label htmlFor="output-name" className="min-w-20">
          Output Name
        </label>
        <input
          className="border-2 border-gray-300 rounded-lg bg-white min-w-20 p-2 px-px"
          type="text"
          id="output-name"
          name="output-name"
          placeholder={task.output.basename}
          defaultValue={task.output.basename}
          onChange={(e) => {
            updateTask(task, { ...task.output, basename: e.target.value });
          }}
        />
      </div>

      <div>
        <label htmlFor="file-format">File Format</label>
        <select
          className="border-2 bg-white rounded-lg p-2"
          id="file-format"
          name="file-format"
          onChange={(e) => {
            updateTask(task, { ...task.output, format: e.target.value });
          }}
        >
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WEBP</option>
        </select>
      </div>

      {/* //* It probably would have been a bit clearer if you had moved the conditional rendering logic into the renderFileSize() function itself, rather than having it inline */}
      {outputSizeKB ? renderFileSize() : ""}

      <div>
        {task.downloadInfo ? renderDownloadButton() : renderConvertButton()}
      </div>

      <div className="flex items-center space-x-4 p-2">
        <button
          className="text-sm text-red-500 hover:text-red-700"
          type="button"
          onClick={() => onRemove(task)} // Trigger onRemove function
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default FileBox;
