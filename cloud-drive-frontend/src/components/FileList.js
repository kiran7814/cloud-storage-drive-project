import React from 'react';
import './FileList.css';

function FileList({ files }) {
  return (
    <div className="file-list-container">
      <h3>Uploaded Files</h3>
      {files && files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
}

export default FileList;
