"use client";

import { AluguelProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Editaraluguel({ params }: { params: { id: number } }) {
    const navigate = useRouter();

    const [aluguel, setaluguel] = useState<AluguelProps>({
        codigo: 0,
        carro: "",
        cliente: "",
        dataInicio: 0,
        dataFim: 0,
    });

    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:8080/EletroCars/aluguel/${params.id}`);
            const data = await response.json();
            setaluguel(data);
        };
        chamadaApi();
    }, [params]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/EletroCars/aluguel/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(aluguel),
            });

            if (response.ok) {
                alert("aluguel atualizado com sucesso!");
                navigate.push("/aluguel");
            }
        } catch (error) {
            console.error("Erro na atualização do aluguel...", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-laranjaLogo rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Editar aluguel</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-white">Código</label>
                        <input
                            type="number"
                            id="codigo"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="codigo"
                            value={aluguel.codigo}
                            onChange={(e) => setaluguel({ ...aluguel, codigo: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="carro" className="block mb-2 text-sm font-medium text-white">Carro</label>
                        <input
                            type="text"
                            id="carro"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="carro"
                            value={aluguel.carro}
                            onChange={(e) => setaluguel({ ...aluguel, carro: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="cliente" className="block mb-2 text-sm font-medium text-white">Cliente</label>
                        <input
                            type="text"
                            id="cliente"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="cliente"
                            value={aluguel.cliente}
                            onChange={(e) => setaluguel({ ...aluguel, cliente: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="dataInicio" className="block mb-2 text-sm font-medium text-white">Data de Inicio</label>
                        <input
                            type="number"
                            id="dataInicio"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="dataInicio"
                            value={aluguel.dataInicio}
                            onChange={(e) => setaluguel({ ...aluguel, dataInicio: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="dataFim" className="block mb-2 text-sm font-medium text-white">Data de Fim</label>
                        <input
                            type="number"
                            id="dataFim"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="dataFim"
                            value={aluguel.dataFim}
                            onChange={(e) => setaluguel({ ...aluguel, dataFim: Number(e.target.value) })}
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
