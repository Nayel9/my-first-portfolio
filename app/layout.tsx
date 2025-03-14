// app/layout.tsx
import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";

export const metadata: Metadata = {
    title: "Nahuel - Portfolio",
    description: "This is my portfolio",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system">
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
