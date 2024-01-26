import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="sm:absolute bottom-0 w-full sm:h-[8vh] h-fit bg-slate-800 px-5 py-2">
      <div className="w-full h-full flex sm:flex-row justify-center py-2 items-center flex-col text-white">
        <div className="sm:w-[70%] w-full text-center sm:text-left sm:mb-0 mb-5 tracking-wider">Created by Saksham Jain with Appwrite</div>
        <div className="sm:w-[30%] w-full flex justify-around sm:justify-end">
        <Link to={'https://www.linkedin.com/in/saksham-jain-15bab2205/'} target="_blank"><i className="fa-brands fa-linkedin sm:mx-5 text-lg cursor-pointer hover:text-gray-500"/></Link>
        <Link to={'https://twitter.com/SakshamJain0464'} target="_blank"><i className="fa-brands fa-x-twitter sm:mx-5 text-lg cursor-pointer hover:text-gray-500" /></Link>
        <Link to={'https://www.instagram.com/__saksham_jain'} target="_blank"><i className="fa-brands fa-instagram sm:mx-5 text-lg cursor-pointer hover:text-gray-500" /></Link>
        <Link to={'https://github.com/sakshamjain0464'} target="_blank"><i className="fa-brands fa-github sm:mx-5 text-lg cursor-pointer hover:text-gray-500"></i></Link>
        </div>
      </div>
    </footer>
  );
}
