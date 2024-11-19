"use client";

import { ClienteProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadClientes() {
    const navigate = useRouter();

    const [cliente, setCliente] = useState<ClienteProps>({
        IDCliente: 0,
        nome: "",
        endereco: "",
        cpf: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/EletroCars/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                alert("Cliente cadastrado com sucesso!");
                setCliente({
                    IDCliente: 0,
                    nome: "",
                    endereco: "",
                    cpf: "",
                });
                navigate.push("/clientes");
            }
        } catch (error) {
            console.error("Falha ao cadastrar o cliente: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-laranjaLogo rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Cadastro de Clientes</h2>
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
                        <label htmlFor="endereco" className="block mb-2 text-sm font-medium text-white">Endereço</label>
                        <input
                            type="text"
                            id="endereco"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="endereco"
                            value={cliente.endereco}
                            onChange={handleChange}
                            placeholder="Digite o endereço do cliente"
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
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
