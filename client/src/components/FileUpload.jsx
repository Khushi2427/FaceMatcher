import React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

export default function FileUpload({ onUpload, disabled }) {
  const [preview, setPreview] = useState(null);
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.warn('Rejected files:', rejectedFiles);
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setPreview(reader.result);
      onUpload(file);
    };
    
    reader.readAsDataURL(file);
  }, [onUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    disabled: disabled
  });
  
  const clearPreview = (e) => {
    e && e.stopPropagation();
    setPreview(null);
    onUpload(null);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-green-500 bg-green-100' : 'border-gray-300 hover:border-gray-400'}
          ${preview ? 'p-0 border-0' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-cover rounded-lg"
            />
            {!disabled && (
              <button
                onClick={clearPreview}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <FiX className="text-gray-700" />
              </button>
            )}
          </div>
        ) : (
          <>
            <input {...getInputProps()} />
            <FiUpload className="mx-auto text-3xl text-gray-400 mb-3" />
            <p className="text-gray-600">
              {isDragActive ? 
                'Drop the image here' : 
                'Drag & drop an image, or click to select'}
            </p>
            <p className="text-sm text-gray-500 mt-2">Supports: JPG, PNG (Max 5MB)</p>
          </>
        )}
      </div>
    </div>
  );
}