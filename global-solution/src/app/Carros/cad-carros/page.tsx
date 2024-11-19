"use client";

import { CarroProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadCarros() {
    const navigate = useRouter();

    const [carro, setCarro] = useState<CarroProps>({
        ano: 0,
        IDVeiculo: 0,
        codCliente: 0,
        placa: "",
        preco: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCarro({ ...carro, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/CarWhisperer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(carro),
            });

            if (response.ok) {
                alert("Carro cadastrado com sucesso!");
                setCarro({
                    ano: 0,
                    codCliente: 0,
                    IDVeiculo: 0,
                    placa: "",
                    preco: 0,
                });
                navigate.push("/carros");
            }
        } catch (error) {
            console.error("Falha ao criar o carro: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-blue-500 rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Cadastro de Carros</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="placa" className="block mb-2 text-sm font-medium text-white">Placa</label>
                        <input
                            type="text"
                            id="placa"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="placa"
                            value={carro.placa}
                            onChange={handleChange}
                            placeholder="Digite a placa do veículo"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="codCliente" className="block mb-2 text-sm font-medium text-white">Cliente Associado</label>
                        <input
                            type="number"
                            id="codCliente"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="codCliente"
                            value={carro.codCliente}
                            onChange={handleChange}
                            min={0}
                            placeholder="Digite o ID do cliente"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="ano" className="block mb-2 text-sm font-medium text-white">Ano</label>
                        <input
                            type="number"
                            id="ano"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="ano"
                            value={carro.ano}
                            onChange={handleChange}
                            min={0}
                            placeholder="Digite o ano do carro"
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
