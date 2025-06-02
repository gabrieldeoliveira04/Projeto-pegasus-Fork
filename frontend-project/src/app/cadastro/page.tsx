"use client";

import React, { useState } from "react";
import * as yup from "yup";
import Image from "next/image";
import Fundo_login from "../../public/Fundo_login.png";
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

      const response = await fetch("https://…", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      alert("Erro de validação: " + error.message);
    }

    try {
      const response = await fetch(
        "http://localhost:3001/cadastro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
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
            <label htmlFor="nome" className="block text-sm font-medium">
              Nome:
            </label>
            <Input
              name="nome"
              type="text"
              id="nome"
              className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label htmlFor="email" className="block text-sm font-medium">
              E-mail:
            </label>
            <Input
              name="email"
              type="email"
              id="email"
              className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="CPF" className="block text-sm font-medium">
              CPF:
            </label>
            <Input
              name="CPF"
              type="text"
              id="CPF"
              className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
              onChange={(e) => setCPF(e.target.value)}
              required
            />

            <label htmlFor="senha" className="block text-sm font-medium">
              Senha:
            </label>
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="senha"
                className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white pr-10"
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center p-1 m-1 w-fit bg-transparent"
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
