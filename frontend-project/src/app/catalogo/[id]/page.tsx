'use client';
import { useEffect, useState } from "react";
import { CarProps } from '@/utils/types/cars';
import { Container } from "@/components/container";
import CatalogItem from "../../../components/carDetails/Details"; // Caminho do novo componente

export default function Home() {
  const [id, setId] = useState<string | undefined>(undefined);
  const [carData, setCarData] = useState<CarProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    const idFromPath = pathArray[pathArray.length - 1];
    setId(idFromPath);

    if (idFromPath) {
      const fetchCarData = async () => {
        try {
          const response = await fetch(`https://projeto-pegasus-5a6q.onrender.com/catalog/${idFromPath}`, {
          });

          if (!response.ok) {
            throw new Error('Erro ao carregar os dados do carro');
          }

          const data = await response.json();
          console.log('Dados recebidos:', data);
          setCarData(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Erro ao buscar os dados do carro', error);
          setError('Erro ao carregar os dados do carro. Tente novamente mais tarde.');
          setIsLoading(false);
        }
      };

      fetchCarData();
    }
  }, []);

  return (
    <main className="items-center">
      <Container>
        <section className="w-full mx-auto p-4">
          {isLoading ? (
            <p className="text-white">Carregando dados...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            carData && (
              <div key={carData._id}>
                <CatalogItem data={carData} />
              </div>
            )
          )}
        </section>
      </Container>
    </main>
  );
}
