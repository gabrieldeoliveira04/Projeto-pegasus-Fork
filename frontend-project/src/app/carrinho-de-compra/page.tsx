'use client'
import React, { useState, useEffect } from 'react';
import ItemCarrinho from '@/components/cardsPedidos/pedidos';

interface CarroItem {
  _id: string;
  marca: string;
  modelo: string;
  preco: string;
}

interface CartItem {
  productId: string;
  quantity: number;
  catalogData: CarroItem;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Definindo o tipo de cartItems
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
        const items = data[0]?.items.map((item: any) => ({ // Ajustando o tipo para 'any' temporariamente
          productId: item.productId,
          quantity: item.quantity,
          catalogData: item.catalogData
        }));
        setCartItems(items);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados do carrinho', error);
        setError('Erro ao carregar os dados do carrinho. Tente novamente mais tarde.');
        setIsLoading(false);
      });
  }, []);

  // Função para calcular o preço total do carrinho
  const calcularPrecoTotal = (): string => {
    let total = 0;
    cartItems.forEach(item => {
      const precoLimpo = item.catalogData.preco
        .replace('R$', '')
        .replace('.', '')
        .replace('.', '')
        .trim();
      const precoItem = parseFloat(precoLimpo);

      total += precoItem * item.quantity;
    });

    return total.toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  };

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
                {/* Utilizando o novo componente ItemCarrinho para cada item no carrinho */}
                {cartItems.map((item) => (
                  <ItemCarrinho key={item.catalogData._id} item={item} />
                ))}
              </div>
            )}

            {/* Div fixa no canto direito para mostrar o preço total */}
            <div className="relative top-0 right-0 bg-white p-4 shadow-md flex justify-between items-center">
              {/* Div para o preço total à esquerda */}
              <div>
                <p className="font-bold text-xl mb-2">Preço Total do Pedido:</p>
                <p className="text-lg">R$ {calcularPrecoTotal()}</p>
              </div>

              {/* Botão para opções de pagamento à direita */}
              <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Opções de Pagamento
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
