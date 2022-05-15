import Image from 'next/image'
import React, { useState } from 'react'


const Navbar = () => {
    let Links = [
        { name: "Home", link: "/" },
        { name: "Cadastre-se", link: "/signup" },
        { name: "Login", link: "/login" },
    ];

    let [open, setOpen] = useState(false);
    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md_c:flex items-center justify-between bg-white py-4 md_c:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer items-center font-[Poppins] text-gray-800'>
                    {/* div do logo */}
                    <a href="/" className="flex items-center">
                        <Image src="/images/logo.png" width={80} height={80} />
                        <span className="self-center text-[26px] sm_c:text-[30px] font-luck whitespace-nowrap text-red-900">My Bookshelf</span>
                    </a>
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md_c:hidden'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md_c:flex md_c:items-center md_c:pb-0 pb-12 absolute md_c:static bg-white md_c:z-auto z-[-1] left-0 w-full md_c:w-auto md_c:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-15 ' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className='md_c:ml-8 text-xl md_c:my-0 my-7'>
                                <a href={link.link} className='break-words items-center pr-8 pl-8 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-900 hover:bg-orange-500 duration-500'>{link.name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    );
}

export default Navbar;