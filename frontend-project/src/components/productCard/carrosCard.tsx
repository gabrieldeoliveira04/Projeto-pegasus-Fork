import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CarProps } from '@/utils/types/cars';

interface CarrosCardProps {
  data: CarProps;
}

const CarrosCard: React.FC<CarrosCardProps> = ({ data }) => {
  const imageName = `${data.marca}_${data.modelo}`;

  const imageUrl = `/carImages/${imageName}.webp`;

  return (
    <Link href={`/catalog/${data._id}`}>
      <section className="border p-4 rounded-md bg-white shadow-md">
        {/* Renderiza a imagem */}
        <Image src={imageUrl} alt={`${data.marca} ${data.modelo}`} width={300} height={200} />
        <h2 className="text-xl font-bold">{data.marca} {data.modelo}</h2>
        <p>Motorização: {data.motorizacao}</p>
        <p>Transmissão: {data.transmissao}</p>
        <p>Preço: {data.preco}</p>
        <p>Ano: {data.ano}</p>
      </section>
    </Link>
  );
};

export default CarrosCard;
