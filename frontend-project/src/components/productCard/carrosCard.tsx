import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CarProps } from '@/utils/types/cars';
import { BiRightArrowCircle } from 'react-icons/bi'

interface CarrosCardProps {
  data: CarProps;
}

const CarrosCard: React.FC<CarrosCardProps> = ({ data }) => {
  const imageName = `${data.marca}_${data.modelo}`;

  const imageUrl = `/carimages/${imageName}.webp`;

  return (
    <Link href={`/catalogo/${data._id}`}>
      <section className="border p-4 rounded-md bg-white shadow-md dark:bg-zinc-900 dark:text-white">
        {/* Renderiza a imagem */}
        <Image src={imageUrl} alt={`${data.marca} ${data.modelo}`} width={300} height={200} className="rounded-md"/>
        <h2 className=" text-base">{data.marca} {data.modelo}</h2>        
        <div className='flex items-center justify-between'>
            <p className='font-bold text-lg'>Preço: {data.preco}</p>
            <BiRightArrowCircle size={24}/>
        </div>
      </section>
    </Link>
  );
};

export default CarrosCard;
