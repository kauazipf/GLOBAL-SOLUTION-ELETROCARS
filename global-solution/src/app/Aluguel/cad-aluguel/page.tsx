"use client";

import { AluguelProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadAluguels() {
    const navigate = useRouter();

    const [Aluguel, setAluguel] = useState<AluguelProps>({
        codigo: 0,
        carro: "",
        cliente: "",
        dataInicio: 0,
        dataFim: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAluguel({ ...Aluguel, [name]: name === 'cliente' || name === 'codigo' ? Number(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/EletroCars/aluguel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Aluguel),
            });

            if (response.ok) {
                alert("Aluguel cadastrado com sucesso!");
                setAluguel({
                    codigo: 0,
                    carro: "",
                    cliente: "",
                    dataInicio: 0,
                    dataFim: 0,
                });
                navigate.push("/Aluguels");
            }
        } catch (error) {
            console.error("Falha ao cadastrar o Aluguel: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-laranjaLogo rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Cadastro de Alugueis</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="carro" className="block mb-2 text-sm font-medium text-white">Carro</label>
                        <input
                            type="number"
                            id="carro"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="carro"
                            value={Aluguel.carro}
                            onChange={handleChange}
                            placeholder="Digite o carro desejado"
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
                            value={Aluguel.cliente}
                            onChange={handleChange}
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
                            value={Aluguel.dataInicio}
                            onChange={handleChange}
                            placeholder="Digite a data de inicio do aluguel"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="dataFim" className="block mb-2 text-sm font-medium text-white">Data de Termino</label>
                        <input
                            type="number"
                            id="dataFim"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="dataFim"
                            value={Aluguel.dataFim}
                            onChange={handleChange}
                            placeholder="Digite a data de termino do aluguel"
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
