"use client";
import React, { useState, useEffect } from "react";
import ItemCarrinho from "@/components/cardsPedidos/pedidos";

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
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("Token JWT não encontrado.");

        const response = await fetch("https://projeto-pegasus-5a6q.onrender.com/shopping-cart", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok)
          throw new Error("Erro ao carregar os dados do carrinho");

        const data = await response.json();

        const allItems = data.flatMap((cart: any) =>
          cart.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            catalogData: item.catalogData,
          }))
        );

        setCartItems(allItems);
      } catch (error) {
        console.error(error);
        setError(
          "Erro ao carregar os dados do carrinho. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const parsePreco = (precoStr: string): number => {
    const precoClean = precoStr
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    return parseFloat(precoClean) || 0;
  };

  const calcularPrecoTotal = (): string => {
    const total = cartItems.reduce((acc, item) => {
      return acc + parsePreco(item.catalogData.preco) * item.quantity;
    }, 0);

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);
  };

  // Você pode adicionar um valor fixo ou variável para o frete
  const calcularFrete = (): string => {
    // Exemplo fixo para teste
    const frete = 50.0;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(frete);
  };

  return (
    <div className="min-h-screen dark:text-slate-900 text-slate-900">
      <main className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-10 min-h-screen">
        {/* Conteúdo principal: lista de itens */}
        <section className="flex-[3]">
          

          {isLoading ? (
            <p className="text-center text-lg text-slate-500 dark:text-slate-400 animate-pulse">
              Carregando seus itens...
            </p>
          ) : error ? (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-xl mt-20 text-slate-600 dark:text-slate-400">
              Seu carrinho está vazio.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {cartItems.map((item) => (
                <ItemCarrinho key={item.catalogData._id} item={item} />
              ))}
            </div>
          )}
        </section>

        {/* Sidebar fixa à direita, ocupa 1/4 da tela, lista resumo + preço total + frete */}
        {cartItems.length > 0 && !isLoading && !error && (
          <aside
            className="md:flex-[1] bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col sticky max-h-[calc(100vh-8rem)]"
            aria-label="Resumo do pedido"
          >
            {/* Lista resumida dos produtos */}
            <div className="flex-1 overflow-auto">
              <h2 className="text-xl font-semibold mb-4 dark:text-slate-100">
                Resumo do Pedido
              </h2>
              <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                {cartItems.map(({ catalogData, quantity }) => (
                  <li
                    key={catalogData._id}
                    className="py-3 flex justify-between items-center dark:text-slate-200"
                  >
                    <div className="flex flex-col max-w-[70%] mb-4">
                      <span className="font-medium truncate" title={`${catalogData.marca} ${catalogData.modelo} ${catalogData.ano}`}>
                        {catalogData.marca} {catalogData.modelo} ({catalogData.ano})
                      </span>
                      <small className="text-slate-500 dark:text-slate-400">
                        Quantidade: {quantity}
                      </small>
                    </div>
                    <small className="font-semibold text-green-600 dark:text-green-400">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(parsePreco(catalogData.preco) * quantity)}
                    </small>
                  </li>
                ))}
              </ul>
            </div>

            {/* Frete */}
            <div className="border-t border-slate-300 dark:border-slate-700 pt-4 mb-6 text-slate-700 dark:text-slate-300 flex justify-between">
              <span>Frete:</span>
              <span>{calcularFrete()}</span>
            </div>

            {/* Total + botão */}
            <div className="border-t border-slate-300 dark:border-slate-700 pt-4">
              <p className="text-xl font-semibold mb-2 dark:text-slate-100">
                Total:
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
                {calcularPrecoTotal()}
              </p>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
                onClick={() => alert("Redirecionar para pagamento")}
                aria-label="Opções de Pagamento"
              >
                Finalizar Compra
              </button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default Cart;
