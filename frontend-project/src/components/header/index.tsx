import logoImg from 'public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { RiShoppingBagLine } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa'
import { Input } from '@/components/input/index'


export function Header(){
    return(
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

                    <div className="flex items-center ml-auto">
                        <Input/>
                    </div>

                    <div className='ml-10'>
                        <Link href='/favoritos' className='sm:justify-between ml-5'>
                            Favoritos
                        </Link>
                    </div>

                    <div className='ml-16'> 
                        <Link href='/shopping-cart' className='flex items-center'>
                            <RiShoppingBagLine size={30} color='white'/>
                            <span className="hidden sm:flex ml-2">Carrinho</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
