import { ACCESS_TOKEN } from "../constants";

export function getTokenFromLocalStorage() {
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(typeof window !="undefined") {
        const token = localStorage.getItem(ACCESS_TOKEN);
        return token || null;
    }
}

