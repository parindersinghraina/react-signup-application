// auth.ts
import api from './api';

interface SignUpData {
    username: string;
    password: string;
}

interface LoginData {
    username: string;
    password: string;
}

export const signUp = async (data: SignUpData) => {
    const response = await api.post('/signup', data);
    return response.data;
};

export const login = async (data: LoginData) => {
    const response = await api.post('/login', data);
    return response.data;
};