// import { Input } from 'postcss'
import React, { useState } from 'react'
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';


function NavBar({toggleSidebar}) {


    return (
        <nav className='h-16 flex justify-between items-center px-5 py-10 sticky top-0 bg-[#f5f7f8] w-full '>
            <div className='font-bold text-2xl'>
                <p>Hello</p>
            </div>
            <div className='flex gap-5 justify-between items-center'>

                <div className="relative w-56 h-12 rounded-lg lg:block sm:block hidden">
                    <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 h-10 bg-[#f5f7f8] pt-4 w-56 text-sm text-black border-2 border-gray-400 rounded-lg bg-transparent  appearance-none focus:ring-0 focus:border-black peer" placeholder="" />
                    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-slate-600 bg-white peer-focus:dark:text-slate-900 mt-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Search</label>
                </div>
                <UserCircleIcon className="h-10 w-6 text-blue-gray-500 " />
                <Bars3Icon className='h-10 w-6 text-blue-gray-500 lg:hidden md:hidden sm:block block' onClick={toggleSidebar} />
                <Cog6ToothIcon className="h-10 w-6 text-blue-gray-500" />
            </div>
        </nav>
    )
}

export default NavBar



