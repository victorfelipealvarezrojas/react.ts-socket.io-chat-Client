import { useContext } from 'react';
import { ChatSelect } from '../components/ChatSelect';
import { InboxPeople } from '../components/InboxPeople';
import { Messages } from '../components/Messages';
import { ChatContext } from '../context/chat/chatContext';
import '../css/chat.css';

export const ChatPages = () => {

    const { chatState }: any = useContext(ChatContext);

    return (
        <div className="messaging">
            <div className="inbox_msg">
                <InboxPeople />
                {
                    /** @chatActivo UID del usuario escuha */
                    (chatState.chatActivo)
                        ? <Messages />
                        : <ChatSelect />
                }
            </div>
        </div>
    )
}
