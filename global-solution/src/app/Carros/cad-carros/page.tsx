"use client";

import { CarroProps } from "@/types/types";
import { useRouter } from "next/navigation";  // Importação corrigida
import { useState } from "react";

export default function CadCarros() {
    const router = useRouter();  // Mudança de 'navigate' para 'router'

    const [carro, setCarro] = useState<CarroProps>({
        codigo: 0,
        placa: "",
        modelo: "",
        marca: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCarro({ ...carro, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/EletroCars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(carro),
            });

            if (response.ok) {
                alert("Carro cadastrado com sucesso!");
                setCarro({
                    codigo: 0,
                    placa: "",
                    modelo: "",
                    marca: "",
                });
                router.push("/carros");  // Uso correto de router.push
            }
        } catch (error) {
            console.error("Falha ao criar o carro: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-laranjaLogo rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Cadastro de Carros</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="placa" className="block mb-2 text-sm font-medium text-white">Placa</label>
                        <input
                            type="text"
                            id="placa"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="placa"
                            value={carro.placa}
                            onChange={handleChange}
                            placeholder="Digite a placa do veículo"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-white">Modelo do Carro</label>
                        <input
                            type="text"
                            id="modelo"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="modelo"  // Corrigi o name para 'modelo'
                            value={carro.modelo}
                            onChange={handleChange}
                            min={0}
                            placeholder="Digite o modelo do carro"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="marca" className="block mb-2 text-sm font-medium text-white">Marca</label>
                        <input
                            type="text"
                            id="marca"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="marca"
                            value={carro.marca}
                            onChange={handleChange}
                            min={0}
                            placeholder="Digite a marca do carro"
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
