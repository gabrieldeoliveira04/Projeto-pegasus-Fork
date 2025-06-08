"use client";
import { useEffect, useState } from "react";
import { CarProps } from "@/utils/types/cars";
import ListFavorites from "./components/listFavorites";
import { ContainerFavorite } from "./components/conteiner";

export default function Home() {
  const [id, setId] = useState<string | undefined>(undefined);
  const [carData, setCarData] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("Usuário não autenticado.");
      setIsLoading(false);
      return;
    }

    fetch(`http://localhost:3001/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados dos favoritos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);
        setCarData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados dos favoritos", error);
        setError(
          "Erro ao carregar os dados dos favoritos. Tente novamente mais tarde."
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="items-center">
      <ContainerFavorite>
        <section className="w-full mx-auto p-4">
          <h1 className=" text-3xl p-2 font-bold">Favoritos</h1>
          {isLoading ? (
            <p className="text-white">Carregando dados...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            carData.length > 0 ? (
              carData.map(car => (
                <div key={car._id} className="p-4">
                  <ListFavorites data={car} />
                </div>
              ))
            ) : (
              <p className="text-white">Nenhum carro favorito encontrado.</p> 
            )
          )}
        </section>
      </ContainerFavorite>
    </main>
  );
}
