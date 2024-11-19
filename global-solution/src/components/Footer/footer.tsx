import Link from "next/link";

export default function Rodape() {
    return(
        <footer className="bottom-0 left-0 flex gap-10 list-none bg-gradient-to-b from-laranjaLogo to-orange-300 items-center justify-center h-[12vh] w-full">
            <nav>
                <ul className="flex list-none p-7.5">
                    <li className="ml-20 font-semibold"><Link href="/integrantes">Página dos Integrantes</Link></li>
                </ul>
            </nav>
        </footer>
    )
}