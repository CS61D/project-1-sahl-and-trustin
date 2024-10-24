import { ImageMimeTypes } from "@/lib/constants";
import { useDropzone } from "react-dropzone";
import { useTaskList } from "../providers/TaskContext";
import { createTask } from "../types/task";

export const Dropzone = () => {
  const { addTask, taskList, setTaskList } = useTaskList();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ImageMimeTypes,
    onDrop: (files: File[]) => {
      console.log("Files dropped:", files);

      // Add all files from the drop to the task list
      const newTasks = files.map((file) => createTask(file));
      console.log("ok");

      //* Remember to use the custom state updater functions you write! addTask is feeling left out :(
      // Update the taskList by appending new tasks
      setTaskList((prevList) => [...prevList, ...newTasks]);
    },
  });

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
    </div>
  );
};
