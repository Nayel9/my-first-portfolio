"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "next-themes";
import i18n from "@/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider attribute="class">
                {children}
            </ThemeProvider>
        </I18nextProvider>
    );
}
