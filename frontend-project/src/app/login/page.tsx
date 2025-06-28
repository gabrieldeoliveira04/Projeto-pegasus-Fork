"use client";
import Image from "next/image";
import Fundo_login from "../../../public/Fundo_login.jpeg";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("https://projeto-pegasus-5a6q.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro na autenticação");
      }

      const token = data.token.access_token;
      localStorage.setItem("jwtToken", token);
      window.location.href = "/"; // Redireciona o usuário após o login bem-sucedido
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

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

      <div className="text-black relative z-10 w-full xl:text-white xl:flex-1 flex justify-center items-center p-6 xl:p-10 xl:bg-blue-900 dark:xl:bg-black bg-opacity-60 4k:h-auto">
        <div className="bg-transparent p-6 border border-white rounded-lg backdrop-filter backdrop-blur-lg w-full 4k:text-4xl">
          <h2 className="text-2xl mb-4 text-center 4k:text-5xl">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white 4k:text-5xl"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white 4k:text-5xl"
                required
              />
            </div>
            <div className="flex gap-x-5 text-center justify-center items-center">
              <button
                type="submit"
                className="p-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
              >
                Entrar
              </button>

              <Link
                href="/cadastro"
                className="p-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
              >
                Cadastrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
