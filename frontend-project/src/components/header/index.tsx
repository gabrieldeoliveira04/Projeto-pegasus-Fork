"use client";
import { useState, useEffect } from "react";
import logoImg from "../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaUserCircle, FaRegHeart } from "react-icons/fa";
import { Input } from "@/components/input/index";
import { Sidebar } from "@/components/sideBar/sideBar";
import { ThemeButton } from "../themeChange/themeButton";
import { usePathname } from "next/navigation";
import { UserType } from "@/types/user";
import { DropdownMenuCheckboxes } from "@/components/dropDownMenu/dropDownMenu";

interface Props {
  user?: UserType;
}

export function Header({ user }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();
  const hideIcons = pathname === "/cadastro" || pathname === "/login";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <header className="w-full h-16 bg-primario text-white dark:bg-zinc-900 dark:text-white px-4 md:px-6 transition-colors">
        <div className="w-full h-full">
          <nav className="w-full h-full flex items-center justify-between gap-2 sm:gap-4 md:gap-6 flex-nowrap overflow-hidden whitespace-nowrap">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src={logoImg}
                alt="Logo do site Pegasus"
                quality={100}
                priority
                className="w-[80px] sm:w-[100px] md:w-[150px] h-auto max-w-full object-contain"
              />
            </Link>

            {/* Campo de busca */}
            {/* {!hideIcons && (
              <div className="hidden lg:flex flex-1 max-w-[300px] mx-2">
                <Input />
              </div>
            )} */}

            {/* Ícones e botões */}
            <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
              {!hideIcons && (
                <>
                  <Link
                    href="/favoritos"
                    className="hidden xl:block flex items-center hover:text-gray-400 dark:hover:text-sky-500 transition-colors"
                  >
                    <FaRegHeart size={20} />
                    <span className="hidden lg:inline ml-1 text-sm">Favoritos</span>
                  </Link>

                  <Link
                    href="/carrinho-de-compra"
                    className="hidden xl:block flex items-center hover:text-gray-400 dark:hover:text-sky-500 transition-colors"
                  >
                    <RiShoppingBagLine size={22} />
                    <span className="hidden lg:inline ml-1 text-sm">Carrinho</span>
                  </Link>

                  <div className="xl:hidden">
                    <DropdownMenuCheckboxes  />
                  </div>
                  <div className="hidden xl:block">
                   <ThemeButton />
                  </div>
                </>
              )}

              {isLoggedIn ? (
                <button
                  onClick={toggleSidebar}
                  className="flex items-center hover:text-gray-400 dark:hover:text-sky-500 transition-colors"
                >
                  <FaUserCircle size={24} />
                </button>
              ) : (
                !hideIcons && (
                  <Link href="/login">
                    <button className="flex items-center border border-zinc-900 dark:border-white rounded px-2 py-1 hover:bg-zinc-100 dark:hover:text-sky-500 transition-colors">
                      {/* Ícone visível no mobile */}
                      <FaUserCircle className="sm:hidden" size={18} />
                      {/* Texto visível a partir do sm */}
                      <span className="hidden sm:inline text-sm">Faça Login</span>
                    </button>
                  </Link>
                )
              )}
            </div>
          </nav>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} user={user} />
    </>
  );
}
