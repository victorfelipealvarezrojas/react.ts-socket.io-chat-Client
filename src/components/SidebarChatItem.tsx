import { useContext } from "react";
import { ChatContext } from "../context/chat/chatContext";
import { fetchOkToken } from "../helpers/fetch";
import { scrollToBotton } from "../helpers/scrollToBotton";
import { types } from "../types/types";

export const SidebarChatItem = ({ usuario }: any) => {

    const { chatState, despachador }: any = useContext(ChatContext);
    const { chatActivo } = chatState;//uid del usuario receptor

    const onClick = async() => {
        despachador({
            type: types.activarChat,
            payload: usuario.uid
        });

        //cargar mensajes del chat
        const response = await fetchOkToken(`mensajes/${usuario.uid}`);
        despachador({
            type: types.cargarMensaje,
            payload: response.msj
        });

        scrollToBotton('mensajes');

    }


    return (
        <div
            className={`chat_list ${(usuario.uid === chatActivo) && 'active_chat'}`}
            onClick={onClick}
        >
            <div className="chat_people">
                <div className="chat_img">
                    <img src="https://www.pngrepo.com/png/234903/512/user-chat.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{usuario.nombre}</h5>
                    {
                        usuario.online
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}
