'use client'
import { useState } from 'react';
import { Container } from '../../components/container/index';

const Page = () => {
  // Exemplo de uso do useState
  const [count, setCount] = useState(0);

  return (
    <main>
      <Container>
        <section className="w-full border p-4 rounded-md bg-white shadow-lg flex flex-col sm:flex-row">
          <div >
            <h2 className="text-2xl font-bold mb-2">ISSO é um TESTE</h2>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Page;
