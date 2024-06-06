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
    <div className="carro-card p-4 mb-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{carro.marca} {carro.modelo}</h2>
      <p><strong>Motorização:</strong> {carro.motorizacao}</p>
      {carro.carroceria && <p><strong>Carroceria:</strong> {carro.carroceria}</p>}
      <p><strong>Transmissão:</strong> {carro.transmissao || "Não especificado"}</p>
      <p><strong>Preço:</strong> {carro.preco}</p>
      <p><strong>Ano:</strong> {carro.ano}</p>
      {carro.versao && <p><strong>Versão:</strong> {carro.versao}</p>}
    </div>
  );
};

export default CarrosCard;
