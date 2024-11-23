import { StaticImageData } from "next/image";

export type IntegranteProps = {
    nome: string;
    rm: string;
    turma: string;
    github: string;
    linkedin: string;
    foto: StaticImageData;
}

export type CarroProps = {
    codigo: number;
    placa: string;
    modelo: string;
    marca: string;
}

export type ClienteProps = {
    codigo: number;
    nome: string;
    email: string;
    cpf: string;
}

export type AluguelProps = {
    codigo: number;
    carro: string;
    cliente: string;
    dataInicio: number;
    dataFim: number;
}