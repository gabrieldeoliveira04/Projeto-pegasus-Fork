// components/Header.tsx
"use client";

import { useState } from 'react';
import logoImg from 'public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RiShoppingBagLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { Input } from '@/components/input/index';
import { Sidebar } from '@/components/sideBar/sideBar';

export function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const user = null; // Simule a presença de um usuário logado ou não logado

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header className="w-full h-16 bg-primario text-white px-6">
                <div className="max-w-screen-xl mx-auto">
                    <nav className='flex items-center justify-between'>
                        <Link href='/'>
                            <Image
                                src={logoImg}
                                alt='Logo do site pegasus'
                                width={150}
                                height={800}
                                quality={100}
                                priority={true}
                            />
                        </Link>

                        <div className="items-center ml-auto hidden md:flex mr-16">
                            <Input />
                        </div>

                        <div className='ml-5'>
                            <Link href='/favoritos' className='flex items-center'>
                                <FaRegHeart size={26} color='white' />
                                <span className="hidden sm:flex ml-3">Favoritos</span>
                            </Link>
                        </div>

                        <div className='ml-16'>
                            <Link href='/carrinho-de-compra' className='flex items-center'>
                                <RiShoppingBagLine size={30} color='white' />
                                <span className="hidden sm:flex ml-3">Carrinho</span>
                            </Link>
                        </div>

                        <div className='ml-16'>
                            <button onClick={toggleSidebar} className='flex items-center focus:outline-none'>
                                <FaUserCircle size={30} color='white' />
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} user={user} />
        </>
    );
}
