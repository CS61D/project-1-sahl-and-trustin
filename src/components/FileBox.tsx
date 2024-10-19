import React from 'react';
import { Task } from '../types/task';

interface FileBoxProps {
    file: Task;
    onRemove: (file: Task) => void;
}

const FileBox: React.FC<FileBoxProps> = ({ file, onRemove }) => {
    const fileSizeKB = (file.fileObject.size / 1024).toFixed(2);
  
    return (
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between p-6 border border-gray-300 rounded-lg mb-4 shadow-lg bg-white">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800">{file.fileObject.name}</p>
          <p className="text-sm text-gray-500">{fileSizeKB} KB</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="text-sm text-red-500 hover:text-red-700" 
            onClick={() => onRemove(file)} // Trigger onRemove function
          >
            Discard
          </button>
        </div>
      </div>
    );
};

export default FileBox;