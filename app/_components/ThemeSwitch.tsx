import * as React from "react";
import {Switch} from "@/components/ui/switch";
import {FaSun, FaMoon} from "react-icons/fa";

const ThemeSwitch = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(() => {
        // Récupérer l'état du mode sombre depuis le localStorage
        const savedMode = localStorage.getItem("isDarkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    React.useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        // Sauvegarder l'état du mode sombre dans le localStorage
        localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return (
        <div className="flex items-center gap-2">
            {isDarkMode ? (
                <FaMoon className="text-gray-900 dark:text-yellow-400"/>
            ) : (
                <FaSun className="text-yellow-400 dark:text-gray-900"/>
            )}
            <Switch
                className="w-10 h-6 bg-gray-200 rounded-full relative"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
            >
                <Switch
                    className="w-4 h-4 bg-white rounded-full shadow-md transition-transform transform translate-x-1"/>
            </Switch>
        </div>
    );
};

export default ThemeSwitch;