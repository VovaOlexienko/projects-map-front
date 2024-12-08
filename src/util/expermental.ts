export enum Option {
    COLORED_BG = "COLORED_BG"
}

export const isOptionActive = (name: string): boolean => {
    return localStorage.getItem(name) === "true";
}

let buffer = "";

document.addEventListener("keydown", function (event) {
    buffer += event.key;

    Object.values(Option)
        .filter(option => buffer.includes(`test${option.replace('_', '').toLowerCase()}`))
        .forEach(option => {
            buffer = "";
            localStorage.setItem(option, String(localStorage.getItem(option) !== "true"))
        });

    if (buffer.length > 100) {
        buffer = buffer.slice(-50);
    }
});
