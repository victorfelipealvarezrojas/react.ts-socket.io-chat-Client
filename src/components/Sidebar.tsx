import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/chatContext"
import { SidebarChatItem } from "./SidebarChatItem"

export const Sidebar = () => {

    const { chatState } = useContext<any>(ChatContext);
    const { auth } = useContext<any>(AuthContext);


    return (
        <>
            <div className="inbox_chat">
                {
                    chatState.usuarios
                        .filter((usuario: any) => usuario.uid !== auth.uid)
                        .map((usuario: any) => {
                            return <SidebarChatItem
                                key={usuario.uid}
                                usuario={usuario}
                            />
                        })
                }

                {/* Espacio extra para scroll */}
                <div className="extra_space"></div>
            </div>
        </>
    )
}
