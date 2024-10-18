import { ImageMimeTypes } from "@/lib/constants";
import { useDropzone } from "react-dropzone";
import { useTaskList } from "../providers/TaskContext";
import type { Task } from "../types/task";

export const Dropzone = () => {
  const { addTask } = useTaskList();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ImageMimeTypes,
    onDrop: (files: File[]) => {
      console.log("Files dropped:", files);
      // TODO: Do something with the dropped files
      for (const f of files) {
        addTask({
          fileObject: f,
          cliOptions: [],
        });
      }
    },
  });

  return (
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
  );
};
