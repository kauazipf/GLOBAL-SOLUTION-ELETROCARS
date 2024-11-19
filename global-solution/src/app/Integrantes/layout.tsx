import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Integrantes",
    description: "Página dos integrantes",
};

  
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
return (
    <div>
        {children}
    </div>
    );
}
