import React, { useState } from 'react';

export const FileUploader = () => {
  
  const [photoFiles, setPhotoFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);


  const handleFileUpload = (files, type) => {
    if (type === 'photo') {
      setPhotoFiles([...photoFiles, ...files]);
    } else if (type === 'document') {
      setDocumentFiles([...documentFiles, ...files]);
    }
  };

  
  const handleFileDelete = (index, type) => {
    if (type === 'photo') {
      const updatedFiles = [...photoFiles];
      updatedFiles.splice(index, 1);
      setPhotoFiles(updatedFiles);
    } else if (type === 'document') {
      const updatedFiles = [...documentFiles];
      updatedFiles.splice(index, 1);
      setDocumentFiles(updatedFiles);
    }
  };

  return (
    <div>
      <div>
        <h3>Foto</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e.target.files, 'photo')}
          multiple
        />
        <div>
          {photoFiles.map((file, index) => (
            <div key={index}>
              <span>{file.name}</span>
              <button onClick={() => handleFileDelete(index, 'photo')}>Smazat</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Documenty</h3>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e.target.files, 'document')}
          multiple
        />
        <div>
          {documentFiles.map((file, index) => (
            <div key={index}>
              <span>{file.name}</span>
              <button onClick={() => handleFileDelete(index, 'document')}>Smazat</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


