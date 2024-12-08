import {PropsWithChildren} from "react";
import {isOptionActive, Option} from "../../util/expermental.ts";

const isColoredBg = isOptionActive(Option.COLORED_BG);

export const MainBackground = ({children}: PropsWithChildren) => {
    return (
        <div
            className="w-100 h-100"
            style={{
                ...isColoredBg ? {backgroundImage: 'linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url(/main.jpg)'} : {},
                backgroundSize: "cover"
            }}>
            {children}
        </div>
    );
};
