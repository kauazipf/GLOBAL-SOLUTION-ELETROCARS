"use client";

import { ClienteProps } from "@/types/types";
import { useRouter } from "next/navigation";  // Certifique-se de importar de "next/navigation"
import { useState } from "react";

export default function Cadcliente() {
    const router = useRouter();  // Mudei o nome de 'navigate' para 'router'

    const [cliente, setCliente] = useState<ClienteProps>({
        codigo: 0,
        nome: "",
        email: "",
        cpf: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validação básica
        if (!cliente.nome || !cliente.email || !cliente.cpf) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/EletroCars/cliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                alert("Cliente cadastrado com sucesso!");
                setCliente({
                    codigo: 0,
                    nome: "",
                    email: "",
                    cpf: "",
                });
                router.push("/cliente");  // Use `router.push` para navegação
            } else {
                console.error("Erro na resposta da API:", response);
                alert("Falha ao cadastrar o cliente, tente novamente!");
            }
        } catch (error) {
            console.error("Falha ao cadastrar o cliente: ", error);
            alert("Ocorreu um erro. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-laranjaLogo rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Cadastro de cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-white">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="nome"
                            value={cliente.nome}
                            onChange={handleChange}
                            placeholder="Digite o nome do cliente"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="email"
                            value={cliente.email}
                            onChange={handleChange}
                            placeholder="Digite o endereço de email do cliente"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-white">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="cpf"
                            value={cliente.cpf}
                            onChange={handleChange}
                            placeholder="Digite o CPF do cliente"
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
