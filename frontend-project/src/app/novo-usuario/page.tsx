'use client'
import { useState } from 'react';
import Link from 'next/link';

const AddUserForm = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        usermaster: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Verifica se o tipo do elemento alvo é checkbox para acessar a propriedade checked
        const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setUser(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? isChecked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aqui você pode fazer o que for necessário com os dados do usuário, como enviar para um backend via API, por exemplo
        console.log(user);
        // Limpar o formulário após o envio (opcional)
        setUser({
            username: '',
            email: '',
            password: '',
            usermaster: false
        });
    };

    return (
        <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome de Usuário:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Senha:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="usermaster"
                        checked={user.usermaster}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="usermaster" className="ml-2 block text-sm text-gray-900">
                        Usuário Mestre
                    </label>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
                    >
                        Cadastrar Usuário
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
