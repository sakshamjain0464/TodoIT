import {useRef, useState, useEffect} from 'react'
import FileUploader from '../../Components/FileUploader/FileUploader'
import ShowMessage from '../../Components/Message/Message';
import { Authentication } from '../../Context/UserContext/AuthenticationContext';
import Loader from '../../Components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

export default function UploadBanner() {

    const [selectedFile, setSelectedFile] = useState(null);
    const {uploadBanner, uploadBannerFromUnsplash, user} = Authentication()
    const [loading, setLoading] = useState(false)
    const urlInput = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        if (user == null) {
          navigate("/");
        }
      });

    const handleBannerUpload = async () => {
        setLoading(true)
        console.log(selectedFile)
        if(selectedFile){
            const uploaded = await uploadBanner(selectedFile)
            if(uploaded){
                ShowMessage("Banner Uploaded", 'success')
            }
            else{
                ShowMessage("Cannot Upload Banner", 'success')
            }
            navigate('/profile')
        }
        else{
            ShowMessage("Please Choose a File", 'error')
        }
        setLoading(false)
    }
    
    const handleBannerUploadFromUnsplash = async() => {
        const url = urlInput.current.value
        if(url == ''){
            ShowMessage("Enter a valid unsplash url");
        }
        else{
            if(validator.isURL(url)){
                setLoading(true)
                const uploaded = await uploadBannerFromUnsplash(url);
                if(uploaded){
                    ShowMessage("Banner Uploaded", 'success')
                }
                else{
                    ShowMessage("Cannot Upload Banner", 'success')
                }
                navigate('/profile')
            }
            else{
                ShowMessage("Please Choose a File", 'error')
            }
            setLoading(false)
        }
    }

  return (
    <div className='sm:mt-0 mt-10 w-[80%] h-full flex items-center justify-center flex-col'>
        <h1 className='text-xl text-slate-800 mb-3'>Upload Your Banner Picture</h1>
      <FileUploader file={[selectedFile, setSelectedFile]}/>
      {loading?<Loader/>:<button className='text-sm mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md' onClick={handleBannerUpload}>Submit</button>}
      <div className='w-full mt-5 h-fit sm:w-md sm:max-w-md border-2 border-slate-900 flex flex-col px-3 rounded-lg py-8 items-center'>
        <h1 className='text-xl text-slate-800 mb-3'>Upload From Unsplash</h1>
        <input type="url" name="" id="" placeholder='Enter Unsplash URL' className='w-full focus:outline-none border border-slate-900 px-2 py-1 rounded-md' ref={urlInput}/>
        {loading?<Loader/>:<button className='text-sm mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md' onClick={handleBannerUploadFromUnsplash}>Submit</button>}
        <p className='text-xs italic mt-3'>*Go to <a href="https://sakshamjain0464.github.io/ShufflIt/" className='underline'>Shufflit</a>, search your image, go to that image and click on download button, copy the url of the image and paste it in the above box</p>
      </div>
    </div>
  )
}
