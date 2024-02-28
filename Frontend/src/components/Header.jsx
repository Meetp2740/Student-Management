import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import { useRef, useState } from "react";
import AdminAuth from "../OtherComponents/AdminAuth";
import CommonAuth from "../OtherComponents/CommonAuth";

const Header = () => {

    let [open, setOpen] = useState(false);
    const ref = useRef(null);
    const { currentUser } = useSelector((state) => state.user)
    const adminAuth = AdminAuth()
    const commonAuth = CommonAuth()

    return (
        <div ref={ref} className='shadow-md w-full sticky top-0 left-0 z-50'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-centertext-gray-800'>
                    <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                        <ion-icon name="logo-ionic"></ion-icon>
                    </span>
                    SNC.CO
                </div>

                <div onClick={() => setOpen(!open)} className='text-2xl absolute right-8 top-6 cursor-pointer md:hidden'>
                    <RiMenu2Fill ></RiMenu2Fill>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 z-50transition-all duration-500 ease-in ${open ? 'top-14 ' : 'top-[-490px]'}`}>
                    <li className="md:ml-8 text-xl md:my-0 my-7"><Link to="/" className=' text-gray-800 hover:text-gray-400 duration-500'>Home</Link></li>
                    {commonAuth ? "" 
                    : <li className="md:ml-8 text-xl md:my-0 my-7"><Link to="/sign-in" className=' text-gray-800 hover:text-gray-400 duration-500'>Sign-in</Link></li>
                      }
                    <li className="md:ml-8 text-xl md:my-0 my-7"><Link to="/about" className=' text-gray-800 hover:text-gray-400 duration-500'>About</Link></li>
                    {adminAuth ?
                        <li className="md:ml-8 text-xl md:my-0 my-7"><Link to="/admin/dashboard" className=' text-gray-800 hover:text-gray-400 duration-500'>Dashboard</Link></li>
                        : ""}
                    {commonAuth ?
                        <li className="md:ml-8 text-xl md:my-0 my-7"><Link to="/profile" className=' text-gray-800 hover:text-gray-400 duration-500'>Profile</Link></li>
                        : ""}
                </ul>
            </div>
        </div>
    )
}

export default Header;