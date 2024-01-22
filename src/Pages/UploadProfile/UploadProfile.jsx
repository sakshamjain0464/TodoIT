import {useState} from 'react'
import FileUploader from '../../Components/FileUploader/FileUploader'
import ShowMessage from '../../Components/Message/Message';
import { Authentication } from '../../Context/UserContext/AuthenticationContext';

export default function UploadProfile() {

    const [selectedFile, setSelectedFile] = useState(null);
    const {uploadProfilePhoto} = Authentication()

    const handlePhotoUpload = async () => {
        console.log(selectedFile)
        if(selectedFile){
            const uploaded = await uploadProfilePhoto(selectedFile)
            if(uploaded){
                ShowMessage("Uploaded", 'success')
            }
            else{
                ShowMessage("NUploaded", 'success')
            }
        }
        else{
            ShowMessage("Please Choose a File", 'error')
        }
    }
    

  return (
    <div className='sm:mt-0 mt-10 w-[80%] h-full flex items-center justify-center flex-col'>
        <h1 className='text-xl text-slate-800 mb-3'>Upload Your Profile Picture</h1>
      <FileUploader file={[selectedFile, setSelectedFile]}/>
      <button className='text-sm mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md' onClick={handlePhotoUpload}>Submit</button>
    </div>
  )
}
