"use client";

import { CarroProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarCarros({ params }: { params: { id: number } }) {
    
    const navigate = useRouter();
  
    const [carro, setCarro] = useState<CarroProps>({
        codigo: 0,
        placa: "",
        modelo: "",
        marca: "",
    });
  
    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:8080/EletroCars/${params.id}`);
            const data = await response.json();
            setCarro(data);
        };
        chamadaApi();
    }, [params]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/EletroCars/${params.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(carro)            
            });

            if(response.ok) {
                alert("Carro atualizado com sucesso!");
                setCarro({
                    codigo: 0,
                    placa: "",
                    modelo: "",
                    marca: "",
                });
                navigate.push("/carros");
            }

        } catch (error) {
            console.error("Erro na atualização do carro...", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-laranjaLogo rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Editar Carro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-white">Codigo</label>
                        <input
                            type="number"
                            id="codigo"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="codigo"
                            value={carro.codigo}
                            onChange={(e) => setCarro({ ...carro, codigo: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="idPlaca" className="block mb-2 text-sm font-medium text-white">Placa</label>
                        <input
                            type="text"
                            id="placa"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="placa"
                            value={carro.placa}
                            onChange={(e) => setCarro({ ...carro, placa: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="idModelo" className="block mb-2 text-sm font-medium text-white">Modelo</label>
                        <input
                            type="text"
                            id="Modelo"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="Modelo"
                            value={carro.modelo}
                            onChange={(e) => setCarro({ ...carro, modelo: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="idMarca" className="block mb-2 text-sm font-medium text-white">Marca</label>
                        <input
                            type="text"
                            id="Marca"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="Marca"
                            value={carro.marca}
                            onChange={(e) => setCarro({ ...carro, marca: e.target.value })}
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
