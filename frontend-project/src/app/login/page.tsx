'use client';
import Image from 'next/image';
import Fundo_login from '@/public/Fundo_login.png';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na autenticação');
      }

      const token = data.token.access_token;
      localStorage.setItem('jwtToken', token);
      window.location.href = '/'; // Redireciona o usuário após o login bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

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
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full bg-transparent border border-white rounded text-white"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="p-4 rounded bg-blue-500 hover:bg-blue-700 text-white">
                Entrar
              </button>

              <Link href="/cadastro" className="p-4 rounded bg-orange-500 hover:bg-orange-700 text-white">
                Cadastrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
