"use client";

import { PagamentoProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarPagamentos({ params }: { params: { id: number } }) {
    const navigate = useRouter();

    const [pagamento, setPagamento] = useState<PagamentoProps>({
        IDPagamento: 0,
        codCliente: 0,
        dataPagamento: "",
        valor: 0,
    });

    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:8080/EletroCars/pagamentos/${params.id}`);
            const data = await response.json();
            setPagamento(data);
        };
        chamadaApi();
    }, [params]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/EletroCars/pagamentos/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pagamento),
            });

            if (response.ok) {
                alert("Pagamento atualizado com sucesso!");
                navigate.push("/pagamentos");
            }
        } catch (error) {
            console.error("Erro na atualização do pagamento...", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-laranjaLogo rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Editar Pagamento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="codCliente" className="block mb-2 text-sm font-medium text-white">Código do Cliente</label>
                        <input
                            type="number"
                            id="codCliente"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="codCliente"
                            value={pagamento.codCliente}
                            onChange={(e) => setPagamento({ ...pagamento, codCliente: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="dataPagamento" className="block mb-2 text-sm font-medium text-white">Data do Pagamento</label>
                        <input
                            type="date"
                            id="dataPagamento"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="dataPagamento"
                            value={pagamento.dataPagamento}
                            onChange={(e) => setPagamento({ ...pagamento, dataPagamento: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="valor" className="block mb-2 text-sm font-medium text-white">Valor</label>
                        <input
                            type="number"
                            id="valor"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranjaLogo focus:border-laranjaLogo block w-full p-2.5"
                            required
                            name="valor"
                            value={pagamento.valor}
                            onChange={(e) => setPagamento({ ...pagamento, valor: Number(e.target.value) })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    );
}
