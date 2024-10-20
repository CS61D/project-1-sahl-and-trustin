import type React from "react";

import FileBox from "../components/FileBox";

import type { Task, options } from "../types/task";
import { useTaskList } from "../providers/TaskContext";

import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { convertFile } from "../lib/utils";

import { downloadFile } from "../lib/utils";

interface FileListProps {
  files: Task[];
  converter: FFmpeg;
}

export const FileList: React.FC<FileListProps> = ({ files, converter }) => {
  const { taskList, setTaskList } = useTaskList();

  const updateTask = (task: Task, options: options) => {
    const newTaskList = taskList.map((t) => {
      if (t.inputFile === task.inputFile) {
        return { ...task, output: options };
      }
      return t;
    });
    setTaskList(newTaskList);
  };

  const handleConvert = async (task: Task) => {
    const data = await convertFile(
      converter,
      task.inputFile,
      `${task.output.basename}.${task.output.format}`,
    );
    task.downloadInfo = {
      url: data.outputObjectUrl,
      filesize: data.outputFileSize,
    };
    // rerender the list
    setTaskList((prevList) => [...prevList]);
  };

  const removeFile = (fileToRemove: Task) => {
    setTaskList((prevList) =>
      prevList.filter((task) => task.inputFile !== fileToRemove.inputFile),
    );
  };

  return (
    <div>
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <FileBox
              key={index}
              task={file}
              updateTask={updateTask}
              onRemove={removeFile}
              handleConvert={handleConvert}
              handleDownload={downloadFile}
            />
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileList;
