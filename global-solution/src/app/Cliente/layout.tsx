import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Clientes",
    description: "Página de manipulação de clientes",
};

  
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
return(
    <div>
        {children}
    </div>
    );
}
