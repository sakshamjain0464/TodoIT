import { useState, useEffect } from "react";
import FileUploader from "../../Components/FileUploader/FileUploader";
import ShowMessage from "../../Components/Message/Message";
import { Authentication } from "../../Context/UserContext/AuthenticationContext";
import Loader from "../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function UploadProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { uploadProfilePhoto, user } = Authentication();
  const navigate = useNavigate();

  const handlePhotoUpload = async () => {
    setLoading(true);
    if (selectedFile) {
      const uploaded = await uploadProfilePhoto(selectedFile);
      if (uploaded) {
        ShowMessage("Uploaded", "success");
        navigate("/profile");
      } else {
        ShowMessage("Cannot Upload File Uploaded", "error");
      }
    } else {
      ShowMessage("Please Choose a File", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  });

  return (
    <div className="sm:mt-0 mt-10 w-[80%] h-full flex items-center justify-center flex-col">
      <h1 className="text-xl text-slate-800 mb-3">
        Upload Your Profile Picture
      </h1>
      <FileUploader file={[selectedFile, setSelectedFile]} />
      {loading ? (
        <Loader />
      ) : (
        <button
          className="text-sm mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md"
          onClick={handlePhotoUpload}>
          Submit
        </button>
      )}
    </div>
  );
}
