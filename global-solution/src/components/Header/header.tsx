import Image from "next/image";
import Link from "next/link";
import imgLogo from "@/images/Eletro_Cars.png"
import Menu from "@/components/Menu/menu"

export default function Cabecalho() {
    return(
        <header className="bg-gradient-to-t from-laranjaLogo to-gray-300 flex justify-between items-center p-5">
            <Link href="/">
                <Image src={imgLogo} alt="logo" width={80}></Image>
            </Link>
            <Menu/>
        </header>
    )
}