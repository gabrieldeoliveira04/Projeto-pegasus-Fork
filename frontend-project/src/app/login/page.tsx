'use client'
import Image from 'next/image';
import Fundo_login from '../../../public/Fundo_login.png';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="w-full h-full flex justify-end items-center">
      <Image
        src={Fundo_login}
        alt="Fundo Login"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 m-4 flex items-center justify-center h-full w-full max-w-lg sm:max-w-md md:max-w-md lg:max-w-lg">
        <div className="bg-transparent text-white p-6 border border-white rounded-lg backdrop-filter backdrop-blur-lg w-full">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
              required
            />
          </div>
          
          <div className="text-center">
            <button type="submit" className="">
              <Link href={'/'} className="w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white inline-block">
                Entrar
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}