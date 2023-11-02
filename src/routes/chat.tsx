import Chatting from "../components/chatting"
import ChatTitle from "../components/chat-title"
import { styled } from "styled-components";
import ChatTimeline from "../components/chat-timeline";

const Wrapper = styled.div`
    gap:50px;            //채팅 틀
    background-color:#F8E6E0;
`;

const Divs = styled.div `
    position: fixed; //채팅 틀 
    bottom: 0;
    right: 0;
    width: 70%;
`;
export default function Chat() {

    return (
        <Divs>
        <ChatTitle/>
        <Wrapper>
            <ChatTimeline />
        </Wrapper>
        <Chatting />
        </Divs>
        );
}