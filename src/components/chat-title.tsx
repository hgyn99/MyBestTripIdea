import { styled} from "styled-components";
import {useState} from "react";

//title은 추가해야 함 채팅방 맨 위를 가리키는 거 
//메시지 룸 추가하면서 채팅방 이름 갖게되면 그거에 따라 div에 출력하도록 해야함
const Title = styled.div`
    height:100%;
    padding:20px;
    font-size:16px;
    color: black;
    background-color: #FBF5EF;
    width:100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, 
    "Open Sans", "Helvetica Neue", sans-serif;
    overflow-y:hidden;


`;


export default function SendMessageForm() {

   
    return (
        <Title/>
    );
}