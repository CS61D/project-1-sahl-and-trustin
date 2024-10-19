import { ImageMimeTypes } from "@/lib/constants";
import { useDropzone } from "react-dropzone";
import { useTaskList } from "../providers/TaskContext";
import  { Task } from "../types/task";
import FileList from "./FileList";


export const Dropzone = () => {
  const { addTask, taskList, setTaskList } = useTaskList();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ImageMimeTypes,
    onDrop: (files: File[]) => {
      console.log("Files dropped:", files);

      // Add all files from the drop to the task list
      const newTasks = files.map((file) => ({
        fileObject: file,
        cliOptions: [], // Add any other properties here
      }));

      // Update the taskList by appending new tasks
      setTaskList((prevList) => [...prevList, ...newTasks]);
    },
  });

  const removeFile = (fileToRemove: Task) => {
    setTaskList((prevList) => prevList.filter(task => task.fileObject !== fileToRemove.fileObject));
  };

  return (
    <div>
      <div className="h-64 w-96 rounded-lg border-2 border-gray-300 border-dashed p-2 flex items-center justify-center">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              Drag & drop an image here, or click to select files
            </p>
            <p className="text-sm text-gray-500">
              Supported input formats: png, jpeg, bmp, ico, tiff, gif
            </p>
          </div>
        </div>
      </div>
      <FileList files={taskList} removeFile={removeFile} />
    </div>
  );
};
