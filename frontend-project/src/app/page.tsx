'use client'
import { Container } from "@/components/container";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import fundoImg from "../../public/fundo one.jpg";
import CarrosCard from "../components/productCard/carrosCard";
import { CarProps } from "../utils/types/cars"

export default function Home() {
  const [catalogData, setCatalogData] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/catalog')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados do catálogo');
        }
        return response.json();
      })
      .then(data => {
        console.log('Dados recebidos:', data);
        setCatalogData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados do catálogo', error);
        setError('Erro ao carregar os dados do catálogo. Tente novamente mais tarde.');
        setIsLoading(false);
      });
  }, []);

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

      <Container>
        <section className="bg-slate-200 w-full mx-auto p-4">
          {isLoading ? (
            <p className="text-white">Carregando dados...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catalogData.map((carro) => (
                <div key={carro._id}>
                  <CarrosCard data={carro} />
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
