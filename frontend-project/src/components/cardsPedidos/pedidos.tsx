import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CarroItem {
  _id: string;
  marca: string;
  modelo: string;
  preco: string;
}

interface ItemCarrinhoProps {
  item: {
    productId: string;
    quantity: number;
    catalogData: CarroItem;
  };
}

const ItemCarrinho: React.FC<ItemCarrinhoProps> = ({ item }) => {
  return (
    <Link href={`/catalogo/${item.catalogData._id}`}>
      <section className="border p-4 rounded-md bg-white shadow-md mb-4">
        {/* Renderiza a imagem (substitua pelo caminho da sua imagem real) */}
        <Image
          src={`/carImages/${item.catalogData.marca}_${item.catalogData.modelo}.webp`}
          alt={`${item.catalogData.marca} ${item.catalogData.modelo}`}
          width={300}
          height={200}
        />
        <h2 className="text-base">{item.catalogData.marca} {item.catalogData.modelo}</h2>
        <p className="font-bold text-lg">Preço: {item.catalogData.preco}</p>
        <p>Quantidade: {item.quantity}</p>
      </section>
    </Link>
  );
};

export default ItemCarrinho;
