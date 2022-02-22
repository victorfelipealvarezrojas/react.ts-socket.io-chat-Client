import { useCallback, useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ChatContext } from "../context/chat/chatContext";
import { fetchNoToken, fetchOkToken, Method } from "../helpers/fetch";
import { types } from "../types/types";

export interface IinSatate {
    uid: string | null;
    checking: boolean;
    logged: boolean;
    name: string | null;
    email: string | null;

}

export interface IAuthContext {
    login: Promise<void>,
    register: void,
    verificaToken: void,
    logout: void,
}

const InitialState: IinSatate = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {

    const [auth, setAuth] = useState<IinSatate>(InitialState);
    const { despachador }: any = useContext(ChatContext);

    const login = async (email: string, password: string): Promise<boolean> => {
        const response: { usr: any, ok: boolean, token: string } = await fetchNoToken('login', { email, password }, Method.POST);
        if (response.ok) {
            localStorage.setItem('token', response.token);
            const { usr } = response;
            setAuth({
                uid: usr.uid,
                checking: false,
                logged: true,
                name: usr.nombre,
                email: usr.email,
            });
        }
        return response.ok
    };

    const register = async (nombre: string, email: string, password: string): Promise<boolean> => {
        const response: { usuario: any, token: string } = await fetchNoToken('login/new', { nombre, email, password }, Method.POST);
        console.log(response)
        if (response.token) {
            localStorage.setItem('token', response.token);
            const { usuario } = response;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
            });
        }
        return response.token ? true : false;
    }

    const verificaToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })

            return false;
        }

        const response = await fetchOkToken('login/renew');
        if (response.ok) {
            localStorage.setItem('token', response.token);
            const { usr } = response;
            setAuth({
                uid: usr.uid,
                checking: false,
                logged: true,
                name: usr.nombre,
                email: usr.email,
            });
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: true,
                name: null,
                email: null,
            });

            return false;
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('token');
        despachador({
            type: types.LimpiarState
        });

        setAuth({
            uid: null,
            checking: false,
            logged: false,
            name: null,
            email: null,
        });
    }


    return (
        <AuthContext.Provider value={{
            login,
            register,
            verificaToken,
            logout,
            auth
        }}>
            {children}
        </AuthContext.Provider>
    )
}


