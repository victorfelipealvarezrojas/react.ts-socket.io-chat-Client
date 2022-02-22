import { animateScroll } from 'react-scroll'

export const scrollToBotton = (id: string) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 0
    });
}

export const scrollToBottonAnimated = (id: string) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250
    });
}

