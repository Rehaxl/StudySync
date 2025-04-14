import React, { useState } from 'react';
import axios from 'axios';

const PYQUploader = () => {
  const [files, setFiles] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('pyq', files.pyq);
    formData.append('syllabus', files.syllabus);
    formData.append('book', files.book);

    const res = await axios.post('http://localhost:5000/api/ai/upload-files', formData);
    setResult(res.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Upload Files</h1>
      <input type="file" name="pyq" onChange={handleChange} accept="application/pdf" />
      <input type="file" name="syllabus" onChange={handleChange} accept="application/pdf" />
      <input type="file" name="book" onChange={handleChange} accept="application/pdf" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-2">Generate Report</button>

      {result && (
        <div className="mt-4">
          <p>Report Summary: {result.summary}</p>
          <a href={result.reportUrl} target="_blank" className="text-blue-600">Download Report</a>
        </div>
      )}
    </div>
  );
};

export default PYQUploader;
