"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Squelette (placeholder) à la place du switch
        return (
            <div className="flex items-center gap-2">
            <FaSun className="text-transparent" />
            <div className="w-10 h-6 bg-gray-200 rounded-full relative"/>
            </div>
        );
    }

    const isDarkMode = theme === "dark";

    return (
        <div className="flex items-center gap-2">
            {isDarkMode ? (
                <FaMoon className="text-gray-900" />
            ) : (
                <FaSun className="text-yellow-400" />
            )}
            <Switch
                className="w-10 h-6 bg-gray-200 rounded-full relative focus:outline-none"
                checked={isDarkMode}
                onCheckedChange={() => setTheme(isDarkMode ? "light" : "dark")}
            >
                <Switch className="w-4 h-4 bg-white rounded-full shadow-md transition-transform transform translate-x-1" />
            </Switch>
        </div>
    );
};

export default ThemeSwitch;
