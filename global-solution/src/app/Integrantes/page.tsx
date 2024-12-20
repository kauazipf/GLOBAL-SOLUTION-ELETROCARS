import Integrante from "@/components/Integrante/integrante";
import fotoKaua from "@/images/Foto-Kaua.png";
import fotoVictor from "@/images/Foto-Victor.png";
import fotoCaetano from "@/images/Foto-Caetano.png";
import Link from "next/link";

export default function Integrantes() {
    return(
        <div>
            <div className="flex flex-row items-center m-32 mr-10 justify-center gap-24">
                <Integrante
                nome="Kauã Fermino"
                rm="558957"
                turma="1TDSPG"
                github="https://github.com/kauazipf"
                linkedin="https://www.linkedin.com/in/kaua-zipf/"
                foto={fotoKaua}/>
                <Integrante
                nome="Caetano Matos Penafiel"
                rm="557984"
                turma="1TDSPG"
                github="https://github.com/Caepena"
                linkedin="https://www.linkedin.com/in/caetano-penafiel/"
                foto={fotoCaetano}/>
                <Integrante
                nome="Victor Egidio"
                rm="556653"
                turma="1TDSPG"
                github="https://github.com/Vitin46"
                linkedin=""
                foto={fotoVictor}/>
            </div>

            <div className="bg-orange-700 text-center m-32 h-[3vh] mt-2"> 
            <Link href="https://github.com/kauazipf/GLOBAL-SOLUTION-ELETROCARS" className="font-bold text-white underline hover:text-orange-200">Repositório do Projeto</Link>
            </div>
        </div>
    )
}