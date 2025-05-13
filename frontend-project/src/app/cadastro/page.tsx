import React from 'react'
import TextComponent from '@/components/Forms/FormCadastro'
import Fundo_login from '@/public/FundoCad/Fundo_login.png';
import Image from 'next/image';

export default function Cadastro() {
    return (
      <div className="w-full h-full flex justify-end items-center">
        <Image
          src={Fundo_login}
          alt="Fundo Login"
          layout="fill"
          quality={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 m-4 flex items-center justify-center h-full w-full max-w-lg sm:max-w-md md:max-w-md lg:max-w-lg">
            <div className="bg-transparent text-white p-6 border border-white rounded-lg backdrop-filter backdrop-blur-lg w-full">
            <h2 className="text-2xl mb-4 text-center">Faça seu cadastro</h2>
                <TextComponent />
            </div>
        </div>
      </div>
    );
    }