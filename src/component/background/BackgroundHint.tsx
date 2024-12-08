import {PropsWithChildren} from "react";

export const BackgroundHint = ({children}: PropsWithChildren) => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div
                className="border border-1 border-black text-white px-3 py-1 rounded-5 shadow-sm"
                style={{backgroundColor: '#202123'}}>
                {children}
            </div>
        </div>
    );
}