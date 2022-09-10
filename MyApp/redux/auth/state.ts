export interface AuthState {
    email:string | null;
    loggedIn: boolean;
    token: string | null;
}