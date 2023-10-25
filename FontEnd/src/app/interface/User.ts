export interface IUser {
    _id?: number | string;
    name?: string;
    email?: string;
    password?: string
    confirmPassword?: string
    role?: string
}