import React from 'react';
import { FaRegHeart } from 'react-icons/fa'
import Image from 'next/image';
import { CarProps } from '@/utils/types/cars';
import { useState } from 'react';
import { Container } from '../container';

interface CatalogItemProps {
  data: CarProps;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ data }) => {
  const imageName = `${data.marca}_${data.modelo}`;
  const mainImageUrl = `/carImages/${imageName}.webp`;

  const localImages = [
    mainImageUrl,
    `/carImages/${data.marca}_${data.modelo}_2.webp`,
    `/carImages/${data.marca}_${data.modelo}_3.webp`,
    `/carImages/${data.marca}_${data.modelo}_4.webp`,
  ];

  const [selectedImage, setSelectedImage] = useState(mainImageUrl);

  return (
    <Container>
    <section className="w-full border p-4 rounded-md bg-white shadow-lg flex flex-col sm:flex-row">
       {/* Seção de imagens */}
       <div className="flex flex-col sm:w-full justify-center items-center sm:items-start sm:ml-6 sm:mr-6 mb-4 sm:mb-0">
          <Image 
            src={selectedImage} 
            alt={`${data.marca} ${data.modelo}`} 
            width={600} 
            height={500} 
            className="rounded-md object-cover mb-4" 
            placeholder="blur"
            blurDataURL={selectedImage} // imagem de baixa resolução para placeholder
          />
          <div className="flex justify-center space-x-2">
            {localImages.map((img, index) => (
              <div 
                key={index}
                className={`p-1 cursor-pointer ${selectedImage === img ? 'border-2 border-sky-700' : 'border-2 border-transparent'}`}
                onClick={() => setSelectedImage(img)}
              >
                <Image 
                  src={img} 
                  alt={`Imagem ${index + 1}`} 
                  width={75} 
                  height={50} 
                  className="rounded-md object-cover hover:opacity-75 transition-opacity duration-200" 
                  placeholder="blur"
                  blurDataURL={img} // imagem de baixa resolução para placeholder
                />
              </div>
            ))}
          </div>
        </div>

      {/* Seção de detalhes */}
      <div className="w-full flex flex-col sm:w-1/2 pl-10">
        <div className="mb-auto mt-4 sm:mt-0">
          <h2 className="text-2xl font-bold mb-2">{data.marca} {data.modelo}</h2>
          <p className="text-lg text-green-600 font-semibold mb-4">Preço: {data.preco}</p>
          <div className=" text-base text-gray-600 mb-8">
            <p>Motorização: {data.motorizacao}</p>
            <p>Transmissão: {data.transmissao}</p>
            <p>Ano: {data.ano}</p>
          </div>
        </div>
        <div className="flex items-center mt-auto"> {/* Container flexível para os botões */}
          <button className="w-2/3 bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-600 m-1">
            Adicionar ao carrinho
          </button>
          <button className="w-1/4 bg-sky-500 py-3 px-4 rounded-md hover:bg-sky-600 flex justify-center items-center">
            <FaRegHeart size={16} color='white'/>
          </button>
        </div>
      </div>
    </section>
    </Container>
  );
};

export default CatalogItem;
