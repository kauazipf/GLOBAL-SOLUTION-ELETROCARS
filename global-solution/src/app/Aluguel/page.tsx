"use client";

import { AluguelProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Aluguel() {
    const [searchId, setSearchId] = useState<string>("");
    const [filteredaluguel, setFilteredaluguel] = useState<AluguelProps[]>([]);
    const [aluguel, setaluguel] = useState<AluguelProps[]>([]);

    const chamadaApi = async () => {
        const response = await fetch("http://localhost:8080/EletroCars/aluguel");
        const data = await response.json();

        setaluguel(data);
        setFilteredaluguel(data);
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/EletroCars/aluguel/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Aluguel excluído com sucesso.");
                chamadaApi();
            } else if (response.status === 404) {
                alert("Aluguel não pode ser excluído devido a vínculos.");
            }
        } catch (error) {
            console.error("Falha ao remover o Aluguel: ", error);
        }
    };

    const handleSearch = async () => {
        if (searchId.trim() === "") {
            setFilteredaluguel(aluguel);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/EletroCars/aluguel/${searchId}`);
            if (response.ok) {
                const data = await response.json();
                setFilteredaluguel([data]);
            } else {
                alert("Aluguel não encontrado.");
                setFilteredaluguel([]);
            }
        } catch (error) {
            console.error("Erro na pesquisa do Aluguel: ", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mt-32 text-center">Aluguel</h2>
            <div className="flex m-16 justify-center">
                <input
                    type="text"
                    placeholder="Buscar pelo ID do Aluguel"
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

            <table className="text-center m-12 ml-[41vw]">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Carro</th>
                        <th>Cliente</th>
                        <th>Data de Inicio</th>
                        <th>Data de Fim</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredaluguel.map((p) => (
                        <tr key={p.codigo}>
                            <td>{p.codigo}</td>
                            <td>{p.carro}</td>
                            <td>{p.cliente}</td>
                            <td>{p.dataInicio}</td>
                            <td>{p.dataFim}</td>
                            <td>
                                <Link href={`/aluguel/${p.codigo}`}>
                                    <Editar className="inline text-3xl" />
                                </Link>
                                |
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(p.codigo);
                                }}>
                                    <Excluir className="inline text-3xl" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de aluguel: {aluguel.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className="flex justify-center m-12">
                <Link href="/Aluguel/cad-aluguel">
                    <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700">
                        Cadastrar Novo aluguel
                    </button>
                </Link>
            </div>
        </div>
    );
}
