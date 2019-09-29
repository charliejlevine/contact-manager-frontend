export interface LoginInfo {
    username: string;
    password: string;
}

export interface RegisterInfo {
    username: string;
    password: string;
    email: string;
}

export interface LoginMessage {
    id: string;
    message: string;
}

export interface RegisterMessage {
    message: string;
}
