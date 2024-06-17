"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user: { name: string } | null;
}

export function Sidebar({ isOpen, onClose, user }: SidebarProps) {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login'; // Redireciona para a página de login
    };

    return (
        <div className={`fixed top-0 right-0 w-64 h-full bg-slate-200 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <div className="p-6">
                {authenticated ? (
                    <>
                        <p className="text-lg font-semibold text-gray-800">Olá, {user?.name}</p>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300" onClick={handleLogout}>Sair</button>
                        <Link href="/novo-produto">
                            <button className="block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">Adicionar produto</button>
                        </Link>
                        <Link href="/novo-usuario">
                            <button className="block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">Adicionar usuário</button>
                        </Link>
                    </>
                ) : (
                    <Link href='/login'>
                        <button className="block mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300">Faça Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
}
