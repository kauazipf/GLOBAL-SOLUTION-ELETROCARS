import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aluguel",
    description: "Página de manipulação de pagamentos",
};

  
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
return(
    <div>
        {children}
    </div>
    );
}
