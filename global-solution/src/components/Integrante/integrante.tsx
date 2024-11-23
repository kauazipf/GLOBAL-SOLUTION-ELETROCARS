import { IntegranteProps } from "@/types/types";
import Image from "next/image";

export default function Integrante({nome, rm, turma, github, linkedin, foto}: IntegranteProps) {
    return(
        <div>
            <Image src={foto} alt={`Foto de ${nome}`} width={150} height={150} className="w-56 h-56 rounded-full object-cover mb-5"/>
            <p className="font-semibold">Nome: {nome}</p>
            <p className="font-semibold">Turma: {turma}</p>
            <p className="font-semibold">RM: {rm}</p>
            <p className="font-semibold">Link do GitHub: <a href={github} target="__blank" className="hover:text-blue-700">{github}</a></p>
            <p className="font-semibold">Linkedin: <a href={linkedin} target="__blank" className="hover:text-blue-700">{linkedin}</a></p>
        </div>
    )
}