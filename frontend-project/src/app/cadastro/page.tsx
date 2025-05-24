"use client";
import React, { useState } from 'react'
import TextComponent from '@/components/Forms/FormCadastro'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from 'yup';
import Image from "next/image";
import Fundo_login from "../../public/Fundo_login.png";

const schema = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  CPF: yup.string().length(11).required(),
  senha: yup.string().min(6).required(),
});


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    CPF: formData.get("CPF"),
    senha: formData.get("senha"),
  };

  try {
    const response = await fetch('http://localhost:3001/Cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
    } else {
      alert('Erro ao cadastrar');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao conectar com o servidor');
  }
};

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-end items-center">
      <Image 
        src={Fundo_login}
        alt="Fundo Login"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="w-full h-full object-cover "
      />

      <div className="fixed left-0 w-screen h-screen flex justify-end items-center p-5  z-10 pr-20">
        <div className='text-white mb-4'>
        <h2 className="text-2xl text-white text-center p-3">Faça seu cadastro</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="Name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
              required
            />
          </form>
          {/* estrutura do input */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="E-mail" className="block text-sm font-medium">
              E-mail:
            </label>
            {/* texto do input */}
            <label htmlFor="E-mail">
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
                required
              />
            </label>
          </form>
          {/* estrutura do input */}
          <form onSubmit={handleSubmit} className="flex flex-col"></form>
          <label htmlFor="CPF" className="block text-sm font-medium">
            CPF:
          </label>
          {/* texto do input */}
          <label htmlFor="CPF">
            <input
              type="text"
              id="CPF"
              className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
              required
            />
          </label>
          {/* estrutura do input */}

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Campo Senha com botão de mostrar/ocultar */}
            <label htmlFor="Password" className="block text-sm font-medium">Senha:</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="Password"
                className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white pr-10"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>


              <button type="submit" className="mt-5 p-4 rounded bg-blue-500 hover:bg-blue-700 text-white">
                CADASTRAR
              </button>
            </div>
            {/* BOTÃO CADASTRAR */}
          </form>
        </div>
      </div>
    </div>


  );
}