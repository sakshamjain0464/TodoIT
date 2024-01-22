import { useRef } from 'react';
import ShowMessage from '../Message/Message';

const FileUploader = ({file}) => {

    const [selectedFile, setSelectedFile] = file
    const fileInput = useRef()

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      const allowedTypes = ['image/jpeg', 'image/png'];
        
      if (!allowedTypes.includes(uploadedFile.type)) {
        ShowMessage("Only JPG and PNG are accepted", 'warning')
        handleRemoveChoosenFile()
        return;
      }

      const maxSizeInBytes = 10 * 1024 * 1024; // 5MB
      if (uploadedFile.size > maxSizeInBytes) {
        ShowMessage("Maximum File Size in 10GB", 'warning')
        handleRemoveChoosenFile()
        return;
      }

      setSelectedFile(uploadedFile);
    }
  };

  const handleRemoveChoosenFile = () => {
    fileInput.current.value = null;
    setSelectedFile(null);
  }

  return (
    <div className="w-full sm:max-w-md sm:w-fit mx-auto p-4 border-dashed border-2 border-gray-300 rounded-md">
      <input type="file" accept=".jpg, .png" onChange={handleFileChange} ref={fileInput}/>

      {selectedFile && (
        <div className="mt-4">
          <p className="text-gray-700">Selected File:</p>
          <p className="text-slate-800">{selectedFile.name} <i className='fa-solid fa-remove text-lg ml-1' onClick={handleRemoveChoosenFile}/></p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
