import React from 'react';
import { Task } from '../types/task';

interface FileListProps {
    files: Task[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
    return (
        <div>
            {files.length > 0 ? (
                <ul>
                    {files.map((task, index) => (
                        <li key = {index}>
                            {task.fileObject.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No files uploaded yet.</p>
            )}
        </div>
    )
}

export default FileList;