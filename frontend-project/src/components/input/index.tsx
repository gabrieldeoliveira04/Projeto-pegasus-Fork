'use client'
import { FormEvent, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export function Input(){
    const [input, setInput] = useState('');
    const router = useRouter();

    function handleSearch(event: FormEvent){
        event.preventDefault();

        if(input === "") return;

        router.push(`/catalog/search/${input}`) 
    }

    return(
        <form 
        onSubmit={handleSearch}
        className='w-full bg-slate-200 flex items-center justify-between rounded-lg p-1'
        >
            <input
            className='bg-slate-200 outline-none w-11/12 text-gray-700'
            type="text"
            placeholder="Pesquisar"    
            value={input}
            onChange={ (event) => setInput(event.target.value)}
        />
            <button>
                <FiSearch size={20} color='grey'/>
            </button>
        </form>
    )
}