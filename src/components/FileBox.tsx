import React from 'react';
import { Task } from '../types/task';

interface FileBoxProps {
    file: Task;
}

const FileBox: React.FC<FileBoxProps> = ({ file }) => {
    const fileSizeKB = (file.fileObject.size / 1024).toFixed(2);

    return (
        <div className = "flex items-center justify-between p-2 border border-gray-300 rounded-mb mb-2">
            <p className = "text-sm font-semibold">{file.fileObject.name}</p>
            <p className = "text-xs text-gray-500">{fileSizeKB}</p>
        </div>
    )
}

export default FileBox;