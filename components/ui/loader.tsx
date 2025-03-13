import React from 'react';
import { FadeLoader  } from "react-spinners";

const Loader: React.FC = () => {
    return (
        <div className="h-[550px] md:h-[800px] flex flex-col pt-12 items-center">
            <FadeLoader
                color="currentColor"
                height={40}
                margin={20}
                radius={10}
                width={10}
                className="text-gray-900 dark:text-green-700"
            />
        </div>
    );
};

export default Loader;