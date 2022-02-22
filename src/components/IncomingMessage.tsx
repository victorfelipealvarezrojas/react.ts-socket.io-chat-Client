import { horaMes } from "../helpers/horaMes";

export const IncomingMessage = (props: any) => {
    const { msg } = props;

    return (
        <>
            <div className="incoming_msg">
                <div className="incoming_msg_img">
                    <img src="https://www.pngrepo.com/png/234903/512/user-chat.png" alt="sunil" />
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{msg.mensaje}</p>
                        <span className="time_date">{horaMes(msg.createdAt)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
