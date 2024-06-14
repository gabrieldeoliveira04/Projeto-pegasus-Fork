'use client';
import { useState, useEffect } from "react";
import logoImg from "public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Input } from "@/components/input/index";
import { Sidebar } from "@/components/sideBar/sideBar";

interface Props {
  user: any; // Tipagem do objeto de usuário, ajuste conforme necessário
}

export function Header({ user }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Verifica se o token JWT está presente no localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true); // Define isLoggedIn como true se o token existir
    } else {
      setIsLoggedIn(false); // Define isLoggedIn como false se o token não existir
    }
  }, []);

  return (
    <>
      <header className="w-full h-16 bg-primario text-white px-6">
        <div className="max-w-screen-xl mx-auto">
          <nav className="flex items-center justify-between">
            <Link href="/">
              <div className="cursor-pointer">
                <Image
                  src={logoImg}
                  alt="Logo do site pegasus"
                  width={150}
                  height={80} // Corrigido o valor da altura
                  quality={100}
                  priority={true}
                />
              </div>
            </Link>

            <div className="items-center ml-auto hidden md:flex mr-16">
              <Input />
            </div>

            <div className="ml-5">
              <Link href="/favoritos" className="flex items-center">
                <FaRegHeart size={26} color="white" />
                <span className="hidden sm:flex ml-3">Favoritos</span>
              </Link>
            </div>

            <div className="ml-16">
              <Link href="/carrinho-de-compra" className="flex items-center">
                <RiShoppingBagLine size={30} color="white" />
                <span className="hidden sm:flex ml-3">Carrinho</span>
              </Link>
            </div>

            <div className="ml-16">
              {/* Verificação condicional com if-else */}
              {isLoggedIn ? (
                <button
                  onClick={toggleSidebar}
                  className="flex items-center focus:outline-none"
                >
                  <FaUserCircle size={30} color="white" />
                </button>
              ) : (
                <Link href="/login">
                  <button className="flex items-center focus:outline-none">
                    <span className="text-white text-sm border border-white rounded px-2 py-1">
                      Faça Login
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} user={user} />
    </>
  );
}
