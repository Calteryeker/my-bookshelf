import Image from 'next/image'
import React, { useState } from 'react'
import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import Index from '../pages/home/index';

export default function Navbar({ bgColor, tittleColor, image, user }) {

    const handleClick = () => {
        setShowOptions(!showOptions);
    };

    const handleLogout = () => {
        destroyCookie(undefined, 'mybookshelf-token');
        Router.replace('/')
    };

    const [showOptions, setShowOptions] = useState(false);

    const switchBgColor = ` bg-${bgColor}`;
    const switchtittleColor = ` text-${tittleColor}`;
    const switchImage = image ? `/images/${image}` : `/images/logonova.png`
    const username = user ? user.nome : ''

    let [open, setOpen] = useState(false);
    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className={switchBgColor + ' md_c:flex items-center justify-between sm_c:py-4 sm_c:px-7 md_c:px-10 md_c:py-6'}>
                <div className='font-bold text-2xl cursor-pointer items-center font-[Poppins] text-gray-800'>
                    <a href="/" className="flex items-center">
                        <Image src={switchImage} width={80} height={78} className={switchBgColor} />
                        <span className={` self-center text-[26px] sm_c:text-[30px] font-luck whitespace-nowrap ` + switchtittleColor}>My Bookshelf</span>
                    </a>
                </div>

                <div className=" sm_c:absolute sm_c:right-1 sm_c:top-0  md_c:right-14">
                    <div>
                        <button onClick={handleClick} type="button" className=" inline-flex sm_c:mt-5 sm_c:ml-20 border border-solid sm_c:ring-2 sm_c:ring-amber-600 border-romantic-1 sm_c:rounded-full" id="menu-button" aria-expanded="true" aria-haspopup="true">
                            <img src="/images/coruja.png" width={40} className='sm_c:w-[40px] md_c:w-[60px] ' />
                        </button>

                    </div>
                    <div className='sm_c:text-sm sm_c:font-bold sm_c:font-lekton sm_c:items-end sm_c:text-romantic-1 sm_c:flex sm_c:flex-col sm_c:justify-end md_c:flex md_c:flex-col'>
                        <h3 onClick={handleClick} className="cursor-pointer">Bem Vindo(a)</h3>
                        <h3 onClick={handleClick} className="cursor-pointer">{username}</h3>
                    </div>
                    {showOptions && (
                        <div className=" divide-y divide-gray-100 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-brow_pod-1 ring-opacity-5 focus:outline-none " role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div className="py-1 ">
                                <a href="/profile/view" className="text-brow_pod-1 block px-4 py-2 text-sm hover:bg-romantic-1 hover:text-brow_pod-1" >Meu Perfil</a>
                                <a href="/suport" className="text-brow_pod-1  block px-4 py-2 text-sm hover:bg-romantic-1 hover:text-brow_pod-1">Suporte</a>
                                <a onClick={handleLogout} className=" text-brow_pod-1  block px-4 py-2 text-sm hover:bg-romantic-1 hover:text-brow_pod-1">Sair</a>
                            </div>
                            <div className="py-1 md_c:hidden">
                                <a href="book/create" className="text-brow_pod-1 block px-4 py-2 text-sm hover:bg-romantic-1 hover:text-brow_pod-1"><button>Adicionar Livro</button></a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}