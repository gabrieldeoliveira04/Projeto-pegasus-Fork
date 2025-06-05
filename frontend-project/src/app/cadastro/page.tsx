"use client";

import React, { useState } from "react";
import * as yup from "yup";
import Image from "next/image";
import Fundo_login from "../../public/Fundo_login.jpeg";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [CPF, setCPF] = useState("");
  const [senha, setSenha] = useState("");

  const schema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    CPF: yup.string().length(11).required(),
    senha: yup.string().min(6).required(),
  });

  const data = { nome, email, CPF, senha };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Validação dos dados antes do envio:
      await schema.validate(data);

      const response = await fetch("http://localhost:3001/Cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      alert("Erro de validação: " + error.message);
    }

    try {
      const response = await fetch("http://localhost:3001/Cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col xl:flex-row w-full h-screen">
      {/* IMAGEM DE FUNDO (MOBILE) */}
      <div className="absolute inset-0 xl:hidden">
        <Image
          src={Fundo_login}
          alt="Fundo Login"
          fill
          className="object-cover blur-sm"
        />
      </div>

      {/* IMAGEM À ESQUERDA (DESKTOP) */}
      <div className="hidden xl:block xl:w-1/2 h-full relative">
        <Image
          src={Fundo_login}
          alt="Fundo Login"
          fill
          className="object-cover"
        />
      </div>

      {/* FORMULÁRIO */}
      <div className="text-black relative z-10 w-full xl:text-white xl:flex-1 flex justify-center items-center p-6 xl:p-10 xl:bg-blue-900 bg-opacity-60 4k:w-full">
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">
            Faça seu cadastro
          </h2>

          <label htmlFor="nome">Nome:</label>
          <Input
            id="nome"
            name="nome"
            type="text"
            className="mt-1 mb-3 bg-transparent border border-white text-white"
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <Input
            id="email"
            name="email"
            type="email"
            className="mt-1 mb-3 bg-transparent border border-white text-white"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="CPF">CPF:</label>
          <Input
            id="CPF"
            name="CPF"
            type="text"
            className="mt-1 mb-3 bg-transparent border border-white text-white"
            onChange={(e) => setCPF(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha:</label>
          <div className="relative mb-3">
            <Input
              id="senha"
              name="senha"
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent border border-white text-white pr-10"
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2"
          >
            CADASTRAR
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
