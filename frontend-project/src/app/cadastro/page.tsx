"use client";
<meta name="viewport" content="width=device-width, initial-scale=1" />;

import React, { useState } from "react";
import TextComponent from "@/components/Forms/FormCadastro";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import Image from "next/image";
import Fundo_login from "../../public/Fundo_login.png";
import { Eye, EyeOff } from "lucide-react";

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
    const response = await fetch(
      "https://zany-fishstick-6prxg74rrvpc4767-3001.app.github.dev/Cadastro",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
    } else {
      alert("Erro ao cadastrar");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao conectar com o servidor");
  }
};

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative flex justify-center items-center min-h-screen max-h-screen max-w-screen flex flex-col max-w-sm">
      <div className="absolute w-full lg-w-full inset-0 ">
        <Image
          src={Fundo_login}
          alt="Fundo Login"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="mt-0 object-cover blur"
        />
      </div>

      <div className="m-10 z-10 flex-col flex justify-center items-center min-h-screen p-6 md:p-10 w-full">
        <div className="bg-black bg-opacity-60 rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
            Faça seu cadastro
          </h2>
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
            <label htmlFor="Password" className="block text-sm font-medium">
              Senha:
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="Password"
                className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center p-1 m-1 w-fit"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="m-4 p-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
                >
                  CADASTRAR
                </button>
              </div>
            </div>
            {/* BOTÃO CADASTRAR */}
          </form>
        </div>
      </div>
    </div>
  );
}
