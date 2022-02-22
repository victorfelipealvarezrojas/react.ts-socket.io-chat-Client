import { Component, createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext({});

export const InitialChatState = {
    uid: '',
    chatActivo: null,//UID del usuario escuha
    usuarios: [],//todos los usuarios de la BD
    mensajes: [],//chat seleccionado
}

export const ChatProvider = ({ children }: any) => {

    const [chatState, despachador] = useReducer(chatReducer, InitialChatState);

    return (
        <ChatContext.Provider value={{
            chatState,
            despachador
        }} >
            {children}
        </ChatContext.Provider>
    )
}
