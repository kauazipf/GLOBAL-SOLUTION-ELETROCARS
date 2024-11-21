import Link from "next/link";

export default function Rodape() {
    return(
        <footer className="bottom-0 left-0 fixed flex gap-10 list-none bg-gradient-to-b bg-laranjaLogo items-center justify-center h-[12vh] w-full">
            <nav>
                <ul className="flex list-none p-7.5 text-white">
                    <li className="font-semibold"><Link href="/Integrantes">Página dos Integrantes</Link></li>
                </ul>
            </nav>
        </footer>
    )
}