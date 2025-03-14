import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
    title: "Nahuel - Portfolio",
    description: "This is my portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <head>
            <title>My Portfolio</title>
        </head>
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
