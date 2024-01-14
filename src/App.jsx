import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import MainSection from './Components/MainSection/MainSection'
import './App.css'
import Footer from './Components/Footer/Footer'
import {AuthenticationProvider} from './Context/UserContext/AuthenticationContext'
import authenticator from './Appwrite/authentication'
import { ToastContainer } from 'react-toastify'

function App() {
  const [user, setUser] = useState(null);

  const createAccount = (email, password, name) => {
    console.log("Account Created")
  }

  const autoLogin = () => {
    console.log('autologin')
  }

  const loginViaEmail = async (email, password) => {
    const userData = await authenticator.loginViaEmail(email, password);
    setUser(userData)
  }

  const logout = () => {
    console.log("logout")
  }

  return (
    <AuthenticationProvider value={{user,autoLogin, loginViaEmail, logout, createAccount}}>
      <Navbar />
      <MainSection />
      <Footer/>
      <ToastContainer />
    </AuthenticationProvider>
  )
}

export default App
