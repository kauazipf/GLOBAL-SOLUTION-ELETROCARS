import { IntegranteProps } from "@/types/types";
import Image from "next/image";

export default function Integrante({nome, rm, turma, github, foto}: IntegranteProps) {
    return(
        <div>
            <Image src={foto} alt={`Foto de ${nome}`} width={150} height={150} className="w-56 h-56 rounded-full object-cover mb-5"/>
            <p className="font-semibold">Nome: {nome}</p>
            <p className="font-semibold">Turma: {turma}</p>
            <p className="font-semibold">RM: {rm}</p>
            <p className="font-semibold">Link do GitHub: {github}</p>
        </div>
    )
}