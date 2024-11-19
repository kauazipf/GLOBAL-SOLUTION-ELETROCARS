import { StaticImageData } from "next/image";

export type IntegranteProps = {
    nome: string;
    rm: string;
    turma: string;
    github: string;
    foto: StaticImageData;
}

export type CarroProps = {
    IDVeiculo: number;
    codCliente: number;
    placa: string;
    ano: number;
    preco: number;
}