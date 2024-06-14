'use client'
import { useState } from 'react';

const AddProductForm = () => {
    const [produto, setProduto] = useState({
        marca: '',
        modelo: '',
        motorizacao: '',
        carroceria: '',
        transmissao: '',
        preco: '',
        ano: '',
        versao: '',
        descricao: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aqui você pode fazer o que for necessário com os dados do produto, como enviar para um backend via API, por exemplo
        console.log(produto);
        // Limpar o formulário após o envio (opcional)
        setProduto({
            marca: '',
            modelo: '',
            motorizacao: '',
            carroceria: '',
            transmissao: '',
            preco: '',
            ano: '',
            versao: '',
            descricao: ''
        });
    };

    return (
        <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Adicionar Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Marca:</label>
                    <input
                        type="text"
                        name="marca"
                        value={produto.marca}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Modelo:</label>
                    <input
                        type="text"
                        name="modelo"
                        value={produto.modelo}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Motorização:</label>
                    <input
                        type="text"
                        name="motorizacao"
                        value={produto.motorizacao}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Carroceria:</label>
                    <input
                        type="text"
                        name="carroceria"
                        value={produto.carroceria}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Transmissão:</label>
                    <input
                        type="text"
                        name="transmissao"
                        value={produto.transmissao}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Preço:</label>
                    <input
                        type="text"
                        name="preco"
                        value={produto.preco}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ano:</label>
                    <input
                        type="number"
                        name="ano"
                        value={produto.ano}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Versão:</label>
                    <input
                        type="text"
                        name="versao"
                        value={produto.versao}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <textarea
                        name="descricao"
                        value={produto.descricao}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300"
                    >
                        Adicionar Produto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
