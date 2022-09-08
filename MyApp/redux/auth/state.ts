export interface AuthState {
    username:string | null;
    email:string | null;
    gender:string;
    birthday:Date | null;
    loggedIn: boolean;
    token: string | null;
}