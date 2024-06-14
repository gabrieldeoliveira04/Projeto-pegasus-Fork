// Arquivo pedidos.tsx

import React from 'react';

export interface PedidoCardProps {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    catalogData: {
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
    };
  }[];
  _id: string;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ userId, items, _id }) => {
  // Implementação do componente PedidoCard
  return (
    <div>
      <h2>Pedido do Usuário: {userId}</h2>
      <p>Número do Pedido: {_id}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>Produto:</strong> {item.catalogData.marca} {item.catalogData.modelo} - Quantidade: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidoCard;
