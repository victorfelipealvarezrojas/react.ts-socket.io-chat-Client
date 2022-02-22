import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = (serverPath: string) => {
    const [socket, setSocket] = useState<any>(null);
    const [online, setOnline] = useState(false);

    const connectSocket = useCallback(() => {

        const token = localStorage.getItem('token');

        const socketTemp = io(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-socket-token': token
            }
        });

        setSocket(socketTemp);

    }, [serverPath]);

    const desconnectSocket = useCallback(() => {
        socket?.disconnect();
    }, [socket]);

    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline(true));
    }, [socket])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline(false));
    }, [socket])

    return {
        socket,
        online,
        connectSocket,
        desconnectSocket
    }
}