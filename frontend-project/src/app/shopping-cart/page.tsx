'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { CarProps } from '@/utils/types/cars';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/shopping-cart')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados do carrinho');
        }
        return response.json();
      })
      .then(data => {
        setCartItems(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados do carrinho', error);
        setError('Erro ao carregar os dados do carrinho. Tente novamente mais tarde.');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>
        {isLoading ? (
          <p className="text-lg">Carregando dados...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <p className="text-lg">Seu carrinho está vazio.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-md">
                    <div className="relative h-48">
                      <Image
                        src={`/carImages/${item.marca}_${item.modelo}.webp`}
                        alt={`${item.marca} ${item.modelo}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2">{item.marca} {item.modelo}</h2>
                      <p>Motorização: {item.motorizacao}</p>
                      <p>Transmissão: {item.transmissao}</p>
                      <p>Preço: {item.preco}</p>
                      <p>Ano: {item.ano}</p>
                      <div className="mt-4">
                        <a href={`/catalog/${item._id}`} className="text-blue-500">Ver detalhes</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
