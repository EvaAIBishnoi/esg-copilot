
import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'uploaded' | 'error';
}

interface UploadDocsProps {
  onFilesUploaded: (files: File[]) => void;
}

const UploadDocs: React.FC<UploadDocsProps> = ({ onFilesUploaded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload process
    newFiles.forEach(file => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'uploaded' as const }
              : f
          )
        );
      }, 1000 + Math.random() * 2000);
    });

    onFilesUploaded(files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-300 transform-style-3d perspective-1000
          ${dragActive 
            ? 'border-kpmg-accent bg-kpmg-accent/10 scale-105 rotate-1' 
            : 'border-kpmg-blue/30 hover:border-kpmg-blue/50 hover:scale-102'
          }
          glass-morphism backdrop-blur-sm
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            p-4 rounded-full transition-all duration-300
            ${dragActive 
              ? 'bg-kpmg-accent/20 scale-110 animate-pulse3d' 
              : 'bg-kpmg-blue/20 hover:bg-kpmg-blue/30'
            }
          `}>
            <Upload className={`
              w-8 h-8 transition-colors duration-300
              ${dragActive ? 'text-kpmg-accent' : 'text-kpmg-blue'}
            `} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-kpmg-navy mb-2">
              {dragActive ? 'Drop files here' : 'Upload ESG/Audit Documents'}
            </h3>
            <p className="text-sm text-kpmg-blue/70">
              Drag & drop files here, or click to browse
            </p>
            <p className="text-xs text-kpmg-blue/50 mt-1">
              Supports PDF, DOC, DOCX, TXT, CSV, XLSX
            </p>
          </div>
        </div>
        
        {/* Floating Decoration */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-kpmg-accent/20 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-kpmg-blue/20 rounded-full animate-ping" />
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-kpmg-navy">Uploaded Documents</h4>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 rounded-lg glass-morphism border border-white/20 animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-kpmg-blue/20">
                    <File className="w-4 h-4 text-kpmg-blue" />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-kpmg-navy truncate max-w-48">
                      {file.name}
                    </p>
                    <p className="text-xs text-kpmg-blue/70">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'uploading' && (
                    <div className="w-4 h-4 border-2 border-kpmg-blue border-t-transparent rounded-full animate-spin" />
                  )}
                  
                  {file.status === 'uploaded' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 rounded-full hover:bg-red-500/20 text-red-500 transition-colors duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocs;
