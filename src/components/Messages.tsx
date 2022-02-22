import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"
import { ChatContext } from "../context/chat/chatContext"
import { IncomingMessage } from "./IncomingMessage"
import { OutGoingMessage } from "./OutGoingMessage"
import { SendMessage } from "./SendMessage"

export const Messages = () => {
    const { chatState }: any = useContext(ChatContext);
    const { auth }: any = useContext(AuthContext);

    return (
        <>
            <div className="mesgs">
                <div
                    id="mensajes"
                    className="msg_history">
                    {
                        chatState.mensajes.map((x: any) => (
                            (x.para === auth.uid)
                                ? <IncomingMessage key={x._id} msg={x} />
                                : <OutGoingMessage key={x._id} msg={x} />
                        ))
                    }
                </div>
                <SendMessage />
            </div>
        </>
    )
}
