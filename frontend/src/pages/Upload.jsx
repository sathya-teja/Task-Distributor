import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { FaUpload } from 'react-icons/fa';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  // Allowed extensions per your requirement
  const allowedExtensions = ['csv', 'xlsx', 'xls'];

  const handleFile = (e) => {
    setMsg('');
    setError('');
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      setError('Invalid file type. Only CSV, XLSX, XLS files are allowed.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (!file) {
      setError("Please choose a valid file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/lists/upload`;

      await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      setMsg('File uploaded and tasks distributed successfully');
    } catch (err) {
      console.error('Upload error:', err.response || err.message || err);
      setMsg(err.response?.data?.message || 'Error uploading file');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 bg-gray-50 max-w-7xl mx-auto w-full transition-all duration-300 overflow-x-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Upload File</h2>

        {/* Upload Card */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <FaUpload className="text-purple-600 text-3xl mb-2" />
              <p className="text-gray-600">
                {file ? file.name : 'Drag & drop or click to upload a file'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                (CSV, XLSX, XLS files only)
              </p>
              <input
                id="file-upload"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFile}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={handleUpload}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <FaUpload className="text-sm" />
            <span>Upload</span>
          </button>

          {/* Feedback Messages */}
          {msg && <p className="text-green-600 font-semibold mt-3 text-center">{msg}</p>}
          {error && <p className="text-red-500 font-semibold mt-3 text-center">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default Upload;