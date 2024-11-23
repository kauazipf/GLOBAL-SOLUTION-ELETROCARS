"use client";

import { CarroProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Carros() {
    const [carros, setCarros] = useState<CarroProps[]>([]);
    const [searchId, setSearchId] = useState<string>("");
    const [filteredCarros, setFilteredCarros] = useState<CarroProps[]>([]);

    const chamadaApi = async () => {
        const response = await fetch("http://localhost:8080/EletroCars");
        const data = await response.json();
        setCarros(data);
        setFilteredCarros(data);
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/EletroCars/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Carro excluído com sucesso.");
                chamadaApi();
            }
            if (response.status === 404) {
                alert("Carro não pode ser excluído devido ao vínculo com um cliente.");
            }
        } catch (error) {
            console.error("Falha ao remover o carro: ", error);
        }
    };

    const handleSearch = async () => {
        if (searchId.trim() === "") {
            setFilteredCarros(carros);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/EletroCars/${searchId}`);
            if (response.ok) {
                const data = await response.json();
                setFilteredCarros([data]);
            } else {
                alert("Carro não encontrado.");
                setFilteredCarros([]);
            }
        } catch (error) {
            console.error("Erro na pesquisa do carro: ", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mt-32 text-center">Carros</h2>
            <div className="flex m-16 justify-center">
                <input
                    type="text"
                    placeholder="Buscar pelo ID do veículo"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="border border-gray-300 rounded-l-lg p-2 w-64"
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-500 hover:bg-green-700 text-white rounded-r-lg px-4"
                >
                    Buscar
                </button>
            </div>

            <table className="text-center m-12 ml-[42vw]">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCarros.map((p) => (
                        <tr key={p.codigo}>
                            <td>{p.codigo}</td>
                            <td>{p.placa}</td>
                            <td>{p.modelo}</td>
                            <td>{p.marca}</td>
                            <td>
                                <Link href={`/carros/${p.codigo}`}>
                                    <Editar className="inline text-3xl" />
                                </Link>
                                |
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(p.codigo);
                                    }}
                                >
                                    <Excluir className="inline text-3xl" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>Quantidade de carros: {filteredCarros.length}</td>
                    </tr>
                </tfoot>
            </table>

            <div className="flex justify-center m-12">
                <Link href="/Carros/cad-carros">
                    <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700">
                        Cadastrar Novo Carro
                    </button>
                </Link>
            </div>
        </div>
    );
}
