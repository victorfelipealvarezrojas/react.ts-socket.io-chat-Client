import { useContext, useState } from "react"
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/chatContext";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {
    const [message, setMessage] = useState('');

    const { socket }: any = useContext(SocketContext);
    const { auth }: any = useContext(AuthContext);
    const { chatState }: any = useContext(ChatContext);

    const onChange = ({ target }: any) => {
        setMessage(target.value)
    }

    const onSubmit = (ev: any) => {
        ev.preventDefault();
        if (message.length === 0) return;
        setMessage('');

        //emitir evento al backend para encviar el mensaje
        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje:message
        });

        //dispatch del mensaje

    }

    return (
        <form onSubmit={onSubmit}>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={message}
                        onChange={onChange}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
