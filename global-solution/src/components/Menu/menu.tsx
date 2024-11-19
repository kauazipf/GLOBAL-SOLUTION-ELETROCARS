import Link from "next/link";

export default function Menu() {
    return(
        <nav>
            <ul className="flex list-none p-7.5 text-white">
                <li className="ml-14 font-semibold"><Link href="/">Página Inicial</Link></li>
                <li className="ml-14 font-semibold"><Link href="/Carros">Carros</Link></li>
                <li className="ml-14 font-semibold"><Link href="/Cliente">Clientes</Link></li>
                <li className="ml-14 font-semibold"><Link href="/#">Aluguel</Link></li>
            </ul>
        </nav>
    )
}