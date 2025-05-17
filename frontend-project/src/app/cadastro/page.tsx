"use client";
import React, { useState } from 'react'
import TextComponent from '@/components/Forms/FormCadastro'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from 'yup';
import Image from "next/image";
import Fundo_login from "../../public/Fundo_login.png";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().length(11).required(),
  password: yup.string().min(6).required(),
});


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = {
    name: formData.get("Name"),
    email: formData.get("E-mail"),
    cpf: formData.get("CPF"),
    password: formData.get("Password"),
  };

  try {
    const response = await fetch('/api/cadastro', {
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
    <div className="absolute top-0 m-4 flex items-center justify-center h-full w-full max-w-lg sm:max-w-md md:max-w-md lg:max-w-lg">
      <div className="relative w-full h-screen">
        <Image
          src={Fundo_login}
          alt="Fundo Login"
          layout="fill"
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-transparent text-white p-6 border border-white rounded-lg backdrop-filter backdrop-blur-lg w-full">
        <h2 className="text-2xl mb-4 text-center">Faça seu cadastro</h2>
        <div className='mb-4'>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="Name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              type="text"
              id="Name"
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
                id="E-mail"
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
                id="Password"
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


              <button type="submit" className="p-4 rounded bg-blue-500 hover:bg-blue-700 text-white">
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