'use client';
import React, { useState, useEffect } from 'react';
import ItemCarrinho from '@/components/cardsPedidos/pedidos';

interface CarroItem {
  _id: string;
  marca: string;
  modelo: string;
  motorizacao: string;
  carroceria: string;
  transmissao: string;
  preco: string;
  ano: number;
  versao: string;
  descricao: string;
}

interface CartItem {
  productId: string;
  quantity: number;
  catalogData: CarroItem;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Obtém o token JWT do localStorage VOU USAR PARA APAGAR
        if (!token) {
          throw new Error('Token JWT não encontrado.');
        }

        console.log('Authorization Header:', `Bearer ${token}`); // Log para verificar o cabeçalho de Authorization

        const response = await fetch('https://ecommerce-repository.onrender.com/shopping-cart', {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token JWT no cabeçalho Authorization
            'Content-Type': 'application/json', // Adicionando Content-Type para POST/PUT/DELETE, se necessário
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao carregar os dados do carrinho');
        }

        const data = await response.json();
        
        // Extrair todos os itens de todos os carrinhos
        const allItems = data.flatMap((cart: any) => 
          cart.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            catalogData: item.catalogData,
          }))
        );

        setCartItems(allItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados do carrinho', error);
        setError('Erro ao carregar os dados do carrinho. Tente novamente mais tarde.');
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

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

    return total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
                {cartItems.map((item) => (
                  <ItemCarrinho key={item.catalogData._id} item={item} />
                ))}
              </div>
            )}

            <div className="relative top-0 right-0 bg-white p-4 shadow-md flex justify-between items-center">
              <div>
                <p className="font-bold text-xl mb-2">Preço Total do Pedido:</p>
                <p className="text-lg">R$ {calcularPrecoTotal()}</p>
              </div>

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

export default Cart;
