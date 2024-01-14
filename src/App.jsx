import { useState } from 'react'
import authentication from './Appwrite/authentication'
import Navbar from './Components/Navbar/Navbar'
import MainSection from './Components/MainSection/MainSection'
import './App.css'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
      <Navbar />
      <MainSection />
      <Footer/>
    </>
  )
}

export default App
