import React, { useEffect, useState } from 'react'
import { Authentication } from '../../Context/UserContext/AuthenticationContext'
import ShowMessage from '../../Components/Message/Message'

export default function ConfirmForgotPassword() {

    const [password, setPassword] = useState('')
    const [passwordHidden, setPasswordHidden] =useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordHidden, setConfirmPasswordHidden] =useState(false)

    const {completeForgotPassword} = Authentication()

    useEffect(() => {
        if(password.length >= 8){
            setPasswordHidden(false);
        }
        else{
            setPasswordHidden(true)
        }

        if(password == confirmPassword){
            setConfirmPasswordHidden(false)
        }
        else{
            setConfirmPasswordHidden(true)
        }
    }, [password, confirmPassword])

    const handleConfirmForgotPassword = async (e) => {
        e.preventDefault()
        let urlSearchParams = new URLSearchParams(window.location.search);
        let secret = urlSearchParams.get("secret");
        let userId = urlSearchParams.get("userId");
        const completed = await completeForgotPassword(userId, secret, password, confirmPassword);
        if(completed){
            ShowMessage('Password changed SuccessFully, Login Again', 'success');
        }
        else{
            ShowMessage('An Error Occurred', 'error');
        }
    }


  return (
    <div className='sm:mt-0 mt-10 w-[80%] h-full flex items-center justify-center flex-col'>
        <form action="" className='flex flex-col items-center border border-slate-950 rounded-lg py-5 px-8' onSubmit={handleConfirmForgotPassword}>
            <h1 className='text-xl'>Enter Your Email</h1>
            <input type="text" name="" value={password} id="" className='border border-slate-950 mt-5 px-2 py-1 sm:w-80 w-[90vw] rounded-md' onChange={(e) => setPassword(e.target.value)}/>
            <p className={`text-xs text-red-700 ${(passwordHidden)?'block':'hidden'} text-left w-full`}>*Password Must be 8 characters long</p> 
            <input type="text" name="" value={confirmPassword} id="" className='border border-slate-950 mt-5 px-2 py-1 sm:w-80 w-[90vw] rounded-md' onChange={(e) => setConfirmPassword(e.target.value)}/>
            <p className={`text-xs text-red-700 ${(confirmPasswordHidden)?'block':'hidden'} text-left w-full`}>*Password and Confirm Password Should Match</p> 
            <input type="submit" value="Submit" className='rounded-md py-1 px-2 mt-5 bg-slate-800 hover:bg-slate-700 text-white cursor-pointer' disabled={confirmPasswordHidden && passwordHidden}/>
        </form>
    </div>
  )
}
