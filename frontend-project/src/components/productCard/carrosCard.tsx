import React from 'react';

interface Carro {
  marca: string;
  modelo: string;
  motorizacao: string;
  carroceria: string | null;
  transmissao: string | null;
  preco: string;
  ano: string | number;
  versao: string | null;
}

interface CarrosCardProps {
  carro: Carro;
}

const CarrosCard: React.FC<CarrosCardProps> = ({ carro }) => {
    return (
        <div className="border p-4 rounded-md bg-white shadow-md">
          <h2 className="text-xl font-bold">{carro.marca} {carro.modelo}</h2>
          <p>Motorização: {carro.motorizacao}</p>
          <p>Transmissão: {carro.transmissao}</p>
          <p>Preço: {carro.preco}</p>
          <p>Ano: {carro.ano}</p>
        </div>
      );
    };

export default CarrosCard;
