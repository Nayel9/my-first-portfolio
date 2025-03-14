"use client";

import {useTranslation} from "next-i18next";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";

export default function LanguageSwitcher() {
    const {i18n} = useTranslation();
    const currentLanguage = i18n.language;

    const languages = {
        fr: {label: "Français", flag: "🇫🇷"},
        en: {label: "English", flag: "🇺🇸"}
    };

    const otherLanguage = currentLanguage === "fr" ? "en" : "fr";

    return (
        <div className="flex items-center">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="text-2xl" title="Changer de langue">
                        <span className="text-2xl cursor-pointer">{languages[currentLanguage as keyof typeof languages].flag}</span>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-rox gap-1 w-auto h-auto">
                    <button
                        onClick={() => i18n.changeLanguage(otherLanguage)}
                        className="text-2xl cursor-pointer"
                        title={languages[otherLanguage].label}
                    >
                        {languages[otherLanguage].flag}
                    </button>
                </PopoverContent>
            </Popover>
        </div>
    );
}