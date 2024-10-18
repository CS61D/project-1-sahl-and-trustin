import React from 'react';
import { Task } from '../types/task';
import FileBox from '../components/FileBox';

interface FileListProps {
    files: Task[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
    return (
        <div>
            {files.length > 0 ? (
                <ul>
                    {files.map((file, index) => (
                        <FileBox 
                            key = {index}
                            file = {file}
                        />
                    ))}
                </ul>
            ) : (
                <p>No files uploaded yet.</p>
            )}
        </div>
    )
}

export default FileList;