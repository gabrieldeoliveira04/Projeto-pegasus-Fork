'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import fundoImg from "../../public/fundo one.jpg";
import CarrosCard from "../components/productCard/carrosCard";

interface Carro {
  _id: string;
  marca: string;
  modelo: string;
  motorizacao: string;
  carroceria: string | null;
  transmissao: string | null;
  preco: string;
  ano: string | number;
  versao: string | null;
}

export default function Home() {
  const [catalogData, setCatalogData] = useState<Carro[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula um atraso de 1 segundo para carregar os dados mockados
    const timer = setTimeout(() => {
      setCatalogData(mockData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dados mockados
  const mockData: Carro[] = [
    {
      _id: "1",
      marca: "Mercedes-Benz",
      modelo: "AMG GT",
      motorizacao: "4.0 V8 turbo gasolina",
      carroceria: null,
      transmissao: "R 7G DCT",
      preco: "R$ 2.150.000",
      ano: 2020,
      versao: null
    },
    {
      _id: "2",
      marca: "Mercedes-Benz",
      modelo: "AMG GT",
      motorizacao: "4.0 V8 turbo gasolina",
      carroceria: null,
      transmissao: "R 7G DCT",
      preco: "R$ 2.150.000",
      ano: 2020,
      versao: null
    },
    {
      _id: "3",
      marca: "Mercedes-Benz",
      modelo: "AMG GT",
      motorizacao: "4.0 V8 turbo gasolina",
      carroceria: null,
      transmissao: "R 7G DCT",
      preco: "R$ 2.150.000",
      ano: 2020,
      versao: null
    },
    {
      _id: "4",
      marca: "Mercedes-Benz",
      modelo: "AMG GT",
      motorizacao: "4.0 V8 turbo gasolina",
      carroceria: null,
      transmissao: "R 7G DCT",
      preco: "R$ 2.150.000",
      ano: 2020,
      versao: null
    },
    {
      _id: "5",
      marca: "Mercedes-Benz",
      modelo: "AMG GT",
      motorizacao: "4.0 V8 turbo gasolina",
      carroceria: null,
      transmissao: "R 7G DCT",
      preco: "R$ 2.150.000",
      ano: 2020,
      versao: null
    },
    {
      _id: "6",
      marca: "Mercedes-Benz",
      modelo: "AMG GT",
      motorizacao: "4.0 V8 turbo gasolina",
      carroceria: null,
      transmissao: "R 7G DCT",
      preco: "R$ 2.150.000",
      ano: 2020,
      versao: null
    }
  ];

  return (
    <main className="flex flex-col items-center">
      <div className="w-full">
        <Image
          src={fundoImg}
          alt="Fundo principal"
          quality={100}
          priority={true}
          className="w-screen max-h-64 object-cover"
          sizes="100vw"
        />
      </div>
      <section className="bg-slate-600 w-full max-w-2xl mx-auto p-4">
        {isLoading ? (
          <p className="text-white">Carregando dados...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {catalogData.map((carro) => (
              <div key={carro._id}>
                <CarrosCard carro={carro} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
