"use client";

import Link from 'next/link';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user: { name: string } | null;
}

export function Sidebar({ isOpen, onClose, user }: SidebarProps) {
    return (
        <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}>
            <button onClick={onClose} className="absolute top-4 right-4">X</button>
            <div className="p-6">
                {user ? (
                    <>
                        <p>Olá, {user.name}</p>
                        <button className="mt-4 p-2 bg-red-500 text-white" onClick={() => alert('Logout')}>Sair</button>
                    </>
                ) : (
                    <>
                        <Link href='/login' className="block mt-4 p-2 bg-blue-500 text-white">
                            Entrar
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
