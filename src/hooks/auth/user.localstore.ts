import type { User } from "./useUser";

const USER_LOCAL_STORAGE_KEY = 'DELTA_FACTORY-USER';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function saveUser(user: any): void {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): User | undefined {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : undefined;
}

export function removeUser() : void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}