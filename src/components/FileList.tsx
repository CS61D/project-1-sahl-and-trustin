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
  //* You should NOT import the taskList from context AND pass it as a prop. Choosing either approach is fine, although it probably makes more sense to use context if you have already set it up. With that being said, importing it from context and passing it as a prop makes it confusing which you are actually using, and leads you to think they are referencing different values, when in fact they are the same value.
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

    //* This task should really be stored in state, which would mean that you don't have to rerender the list at the end. Your current implementation somewhat works, but generally breaks the rules of how react state is supposed to be implemented (https://react.dev/learn/updating-objects-in-state#treat-state-as-read-only). A better approach would be to have a state updater function to update the DownloadInfo for a specific task, somewhat like how you have the addTask function in your context.
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
        //* This isn't that important, but you shouldn't use a ul unless you are nesting li items within it https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
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
