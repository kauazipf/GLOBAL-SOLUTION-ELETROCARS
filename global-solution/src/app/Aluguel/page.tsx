"use client";

import { PagamentoProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Pagamentos() {
    const [searchId, setSearchId] = useState<string>("");
    const [filteredPagamentos, setFilteredPagamentos] = useState<PagamentoProps[]>([]);
    const [pagamentos, setPagamentos] = useState<PagamentoProps[]>([]);

    const chamadaApi = async () => {
        const response = await fetch("http://localhost:8080/EletroCars/pagamentos");
        const data = await response.json();

        setPagamentos(data);
        setFilteredPagamentos(data);
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/EletroCars/pagamentos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Pagamento excluído com sucesso.");
                chamadaApi();
            } else if (response.status === 404) {
                alert("Pagamento não pode ser excluído devido a vínculos.");
            }
        } catch (error) {
            console.error("Falha ao remover o pagamento: ", error);
        }
    };

    const handleSearch = async () => {
        if (searchId.trim() === "") {
            setFilteredPagamentos(pagamentos);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/EletroCars/pagamentos/${searchId}`);
            if (response.ok) {
                const data = await response.json();
                setFilteredPagamentos([data]);
            } else {
                alert("Pagamento não encontrado.");
                setFilteredPagamentos([]);
            }
        } catch (error) {
            console.error("Erro na pesquisa do pagamento: ", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold ml-40 mt-24">Pagamentos</h2>
            <div className="flex ml-40 mt-5 mb-5">
                <input
                    type="text"
                    placeholder="Buscar pelo ID do pagamento"
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

            <table className="tabela">
                <thead>
                    <tr>
                        <th>ID Pagamento</th>
                        <th>ID Cliente</th>
                        <th>Data do Pagamento</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPagamentos.map((p) => (
                        <tr key={p.IDPagamento}>
                            <td>{p.IDPagamento}</td>
                            <td>{p.codCliente}</td>
                            <td>{p.dataPagamento}</td>
                            <td>{p.valor}</td>
                            <td>
                                <Link href={`/pagamentos/${p.IDPagamento}`}>
                                    <Editar className="inline text-3xl" />
                                </Link>
                                |
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(p.IDPagamento);
                                }}>
                                    <Excluir className="inline text-3xl" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>
                            Quantidade de pagamentos: {pagamentos.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className="flex justify-center mt-5">
                <Link href="/pagamentos/cad-pagamentos">
                    <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700">
                        Cadastrar Novo Pagamento
                    </button>
                </Link>
            </div>
        </div>
    );
}
