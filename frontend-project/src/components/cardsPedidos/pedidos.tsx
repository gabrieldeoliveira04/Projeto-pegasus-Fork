import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="border p-2 rounded-lg bg-white shadow-md flex gap-6 items-center dark:bg-gray-800">
        {/* Imagem do carro */}
        <Image
          src={`/cars/${item.catalogData.marca}_${item.catalogData.modelo}.webp`}
          alt={`${item.catalogData.marca} ${item.catalogData.modelo}`}
          width={300}
          height={150}
          className="rounded-md object-cover"
        />

        {/* Informações do carro */}
        <div className="flex flex-col justify-between h-full dark:text-slate-200">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">
            {item.catalogData.marca} {item.catalogData.modelo}
          </h2>
          <p className="font-bold text-xl text-green-600">
            Preço: {item.catalogData.preco}
          </p>
          <p className="text-gray-600 dark:text-slate-200">Quantidade: {item.quantity}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCarrinho;
