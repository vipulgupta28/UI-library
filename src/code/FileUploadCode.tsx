const FileUploadCode = `
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className=" max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">File Upload</h1>
          <p className="text-gray-400">Drag & drop files or click to browse</p>
        </div>

        {/* Main Upload Zone */}
        <div 
          className="perspective-1000"
          style={{ perspective: '1000px' }}
        >
          <div
            ref={dropZoneRef}
            className={\`
              relative w-full h-80  rounded-2xl cursor-pointer
              transition-all duration-300 ease-out
              \${isDragOver 
                ? 'border-white bg-white/5 scale-105' 
                : 'border-gray-600 hover:border-gray-400'
              }
              \${isHovered ? 'shadow-2xl' : 'shadow-xl'}
            \`}
            style={{
              transform: isHovered 
                ? \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateZ(20px)\`
                : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFileDialog}
          >
            {/* 3D Background Layers */}
            <div 
              className="absolute bg-white rounded-2xl"
              style={{ transform: 'translateZ(-10px)' }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl"
              style={{ transform: 'translateZ(-5px)' }}
            />

            {/* Main Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center p-8 bg-gray-900/20 rounded-2xl backdrop-blur-sm">
              <div className={\`
                transition-all duration-300 transform
                \${isHovered ? 'scale-110 translateZ-20' : 'scale-100'}
                \${isDragOver ? 'scale-125' : ''}
              \`}>
                <Upload className={\`
                  w-16 h-16 mb-4 mx-auto transition-colors duration-300
                  \${isDragOver ? 'text-white' : 'text-gray-400'}
                \`} />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {isDragOver ? 'Drop files here!' : 'Upload your files'}
              </h3>
              
              <p className="text-gray-400 mb-6 max-w-md">
                Drag and drop files here, or click to select files from your computer. 
                Support for images, videos, documents and more.
              </p>

              <div className="flex space-x-4">
                <button 
                  className={\`
                    px-6 py-3 bg-white text-black font-medium rounded-lg
                    transition-all duration-300 transform hover:scale-105
                    \${isHovered ? 'shadow-lg' : 'shadow-md'}
                  \`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                >
                  Browse Files
                </button>
                
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <File className="w-4 h-4" />
                  <span>All formats</span>
                </div>
              </div>
            </div>

            {/* 3D Border Effect */}
            <div 
              className="absolute inset-0 rounded-2xl border border-white/10"
              style={{ transform: 'translateZ(5px)' }}
            />
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        {/* Upload Progress Section */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Upload Progress ({uploadedFiles.length} files)
            </h3>
            
            {uploadedFiles.map((file) => (
              <div 
                key={file.id}
                className="bg-black rounded-lg p-4  hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-400">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <p className="text-white font-medium truncate max-w-md">
                        {file.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {file.status === 'completed' && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={\`h-2 rounded-full transition-all duration-300 \${file.status === 'completed' 
                      ? 'bg-white' 
                      : file.status === 'error'
                      ? 'bg-red-400'
                      : 'bg-white'}\`}
                    style={{ width: \`\${file.progress}%\` }}
                  />
                </div>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className={\`\${file.status === 'completed' 
                    ? 'text-white' 
                    : file.status === 'error'
                    ? 'text-red-400'
                    : 'text-gray-400'}\`}>
                    {file.status === 'completed' 
                      ? 'Upload complete' 
                      : file.status === 'error'
                      ? 'Upload failed'
                      : 'Uploading...'}
                  </span>
                  <span className="text-gray-400">
                    {Math.round(file.progress)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
;

export default FileUploadCode;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className=" max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">File Upload</h1>
          <p className="text-gray-400">Drag & drop files or click to browse</p>
        </div>

        {/* Main Upload Zone */}
        <div 
          className="perspective-1000"
          style={{ perspective: '1000px' }}
        >
          <div
            ref={dropZoneRef}
            className={\`
              relative w-full h-80  rounded-2xl cursor-pointer
              transition-all duration-300 ease-out
              \${isDragOver 
                ? 'border-white bg-white/5 scale-105' 
                : 'border-gray-600 hover:border-gray-400'
              }
              \${isHovered ? 'shadow-2xl' : 'shadow-xl'}
            \`}
            style={{
              transform: isHovered 
                ? \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateZ(20px)\`
                : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFileDialog}
          >
            {/* 3D Background Layers */}
            <div 
              className="absolute bg-white rounded-2xl"
              style={{ transform: 'translateZ(-10px)' }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl"
              style={{ transform: 'translateZ(-5px)' }}
            />

            {/* Main Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center p-8 bg-gray-900/20 rounded-2xl backdrop-blur-sm">
              <div className={\`
                transition-all duration-300 transform
                \${isHovered ? 'scale-110 translateZ-20' : 'scale-100'}
                \${isDragOver ? 'scale-125' : ''}
              \`}>
                <Upload className={\`
                  w-16 h-16 mb-4 mx-auto transition-colors duration-300
                  \${isDragOver ? 'text-white' : 'text-gray-400'}
                \`} />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {isDragOver ? 'Drop files here!' : 'Upload your files'}
              </h3>
              
              <p className="text-gray-400 mb-6 max-w-md">
                Drag and drop files here, or click to select files from your computer. 
                Support for images, videos, documents and more.
              </p>

              <div className="flex space-x-4">
                <button 
                  className={\`
                    px-6 py-3 bg-white text-black font-medium rounded-lg
                    transition-all duration-300 transform hover:scale-105
                    \${isHovered ? 'shadow-lg' : 'shadow-md'}
                  \`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                >
                  Browse Files
                </button>
                
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <File className="w-4 h-4" />
                  <span>All formats</span>
                </div>
              </div>
            </div>

            {/* 3D Border Effect */}
            <div 
              className="absolute inset-0 rounded-2xl border border-white/10"
              style={{ transform: 'translateZ(5px)' }}
            />
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        {/* Upload Progress Section */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Upload Progress ({uploadedFiles.length} files)
            </h3>
            
            {uploadedFiles.map((file) => (
              <div 
                key={file.id}
                className="bg-black rounded-lg p-4  hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-400">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <p className="text-white font-medium truncate max-w-md">
                        {file.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {file.status === 'completed' && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={\`h-2 rounded-full transition-all duration-300 \${file.status === 'completed' 
                      ? 'bg-white' 
                      : file.status === 'error'
                      ? 'bg-red-400'
                      : 'bg-white'}\`}
                    style={{ width: \`\${file.progress}%\` }}
                  />
                </div>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className={\`\${file.status === 'completed' 
                    ? 'text-white' 
                    : file.status === 'error'
                    ? 'text-red-400'
                    : 'text-gray-400'}\`}>
                    {file.status === 'completed' 
                      ? 'Upload complete' 
                      : file.status === 'error'
                      ? 'Upload failed'
                      : 'Uploading...'}
                  </span>
                  <span className="text-gray-400">
                    {Math.round(file.progress)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
`

export default FileUploadCode