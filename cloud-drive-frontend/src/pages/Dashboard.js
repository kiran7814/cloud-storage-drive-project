import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("⚠️ Please select a file first.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("⚠️ User not authenticated. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadStatus('✅ File uploaded successfully!');
        setUploadedUrl(data.fileUrl || '');
      } else {
        setUploadStatus(data.message || '❌ Upload failed.');
      }
    } catch (error) {
      setUploadStatus('⚠️ Error during upload.');
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h2 className="dashboard-title">📁 Upload Your Files</h2>

        <div className="upload-box">
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button onClick={handleUpload} className="upload-button">
            Upload File
          </button>
        </div>

        {uploadStatus && (
          <div className="upload-message">
            <p>{uploadStatus}</p>
            {uploadedUrl && (
              <p>
                File URL:{' '}
                <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                  {uploadedUrl}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
