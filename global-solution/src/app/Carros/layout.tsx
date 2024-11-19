import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Carros",
    description: "Página de manipulação de carros",
};

  
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
return (
    <div>
        {children}
    </div>
    );
}
