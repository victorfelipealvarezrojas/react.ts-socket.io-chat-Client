import { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { scrollToBottonAnimated } from '../helpers/scrollToBotton';
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types';
import { ChatContext } from './chat/chatContext';

export const SocketContext = createContext({});

export const SocketProvider = ({ children }: any) => {
    const { socket, online, connectSocket, desconnectSocket } = useSocket('http://localhost:8080');
    const { auth } = useContext<any>(AuthContext);
    const { despachador }: any = useContext(ChatContext);

    useEffect(() => {
        if (auth.logged) {
            connectSocket();
        }
    }, [auth, connectSocket]);

    useEffect(() => {
        if (!auth.logged) {
            desconnectSocket();
        }
    }, [auth, desconnectSocket]);

    //listener users connect
    useEffect(() => {
        socket?.on('list-users', (usuarios: any) => {
            despachador({
                type: types.usuariosCargados,
                payload: usuarios
            });
        })
    }, [socket, despachador]);

    useEffect(() => {
        socket?.on('mensaje-personal', (msg: any) => {
            despachador({
                type: types.nuevoMensaje,
                payload: msg
            });
            scrollToBottonAnimated('mensajes');
        })
    }, [socket, despachador])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}