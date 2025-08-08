"use client"
import { MdSettings } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { ThemeButton } from "@/components/themeChange/themeButton"
import * as React from "react"
import Link from "next/link";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"


type Checked = DropdownMenuCheckboxItemProps["checked"]

export function DropdownMenuCheckboxes() {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowactivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="p-2 rounded-full hover:bg-white bg-white transition"
                    aria-label="Abrir configurações"
                >
                    <MdSettings className="w-5 h-5 text-gray-700" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link
                        href="/favoritos"
                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100"
                    >
                        <FaRegHeart size={18} />
                        <span>Favoritos</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/carrinho-de-compra"
                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100"
                    >
                        <RiShoppingBagLine size={20} />
                        <span>Carrinho</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <ThemeButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}