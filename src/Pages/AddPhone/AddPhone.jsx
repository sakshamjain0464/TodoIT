import { useEffect, useState } from 'react'
import { Authentication } from '../../Context/UserContext/AuthenticationContext'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import Loader from '../../Components/Loader/Loader'
import ShowMessage from '../../Components/Message/Message'
export default function AddPhone() {

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [phoneHidden, setPhoneHidden] = useState(false)
    const [passwordHidden, setPasswordHidden] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {user, addPhoneNumber} = Authentication()
    const navigate = useNavigate()

    useEffect(() => {
        if(user == null){
            navigate('/login')
        }
    })

    useEffect(() => {
      if (validator.isMobilePhone(phone) && phone[0] == '+') {
        setPhoneHidden(false);
        setSubmitDisabled(false);
      } else {
        setPhoneHidden(true);
        setSubmitDisabled(true);
      }
  
      if (password.length < 8) {
        setPasswordHidden(true);
        setSubmitDisabled(true);
      } else {
        setPasswordHidden(false);
        setSubmitDisabled(false);
      }
    }, [phone, password]);

    const hanldeAddPhoneNumber = async (e) =>{
      e.preventDefault()
      setIsLoading(true)
      const data = await addPhoneNumber(phone, password);
      if(data){
        ShowMessage("Phone Number Added", "success");
        navigate('/')
      }
      else{
        ShowMessage("Cannot add phone number", "error")
        navigate('/login')
      }
    }

  return (
    <div className="sm:w-fit sm:h-fit h-[85%] w-[85%] border-[0.5px] border-slate-900 rounded-lg py-5 sm:px-8 px-5 sm:mt-0 mt-5 text-center">
        <h1 className="text-3xl">Add/Update Phone Number</h1>
        <p className='text-xs mt-2'>*Use Country Code With Phone Number</p>
        <form action="" className="flex flex-col" onSubmit={hanldeAddPhoneNumber}>
        <label htmlFor="phone" className="mb-1 sm:mt-3 w-full text-left">
          Phone
        </label>
        <input
          type="tel"
          name=""
          id="phone"
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 w-full px-3 py-2 rounded-md"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <p className="w-full text-left text-xs text-red-700">
          {phoneHidden ? "Enter a valid phone number" : ""}
        </p>
        <label htmlFor="" className="mb-1 mt-3 w-full text-left">
          Password:
        </label>
        <input
          type="password"
          name=""
          id=""
          className="border-[0.5px] active:outline-none focus:outline-0 border-slate-600 w-full px-3 py-2 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className="w-full text-left text-xs text-red-700">
          {passwordHidden ? "Password must be 8 characters long" : ""}
        </p>
        {isLoading ? (
          <Loader />
        ) : (
          <input
            type="submit"
            value="Add Phone Number"
            className="my-5 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md cursor-pointer"
            disabled={submitDisabled}
          />
        )}

        <Link
          to={"/login"}
          className="mb-2 px-2 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-md cursor-pointer">
          Login
        </Link>
      </form>
    </div>
  )
}
