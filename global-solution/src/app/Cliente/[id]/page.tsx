"use client";

import { ClienteProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarClientes({ params }: { params: { id: number } }) {
    const navigate = useRouter();

    const [cliente, setCliente] = useState<ClienteProps>({
        codigo: 0,
        nome: "",
        email: "",
        cpf: "",
    });

    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:8080/EletroCars/cliente/${params.id}`);
            const data = await response.json();
            setCliente(data);
        };
        chamadaApi();
    }, [params]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/EletroCars/cliente/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                alert("Cliente atualizado com sucesso!");
                navigate.push("/Cliente");
            }
        } catch (error) {
            console.error("Erro na atualização do cliente...", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-laranjaLogo rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Editar Cliente</h2>
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
                            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="email"
                            value={cliente.email}
                            onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
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
                            onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    );
}
