import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import ChatRoomID from "./chatroomslist-title";

export interface ChatRoomID {
    id: string;
    userId: string;
    title: string;
    status: string;
    username: string;
  }

const Wrapper = styled.div`
    display: flex;
    overflow-y: auto; // 스크롤 가능하게 합니다.
    flex-direction: column;
    height: 80%;
    width:100%;
    overflow-x: hidden;
    border: 1px solid black;
    &::-webkit-scrollbar {
        display: none;
    }

    /* Firefox */
    scrollbar-width: none;
    `;

export default function Chatroomlist() {
    const [chatRoomId, setchatRoomId] = useState<ChatRoomID[]>([]);
        useEffect(() => {
            const token = localStorage.getItem('userToken'); // 예시: 로컬 스토리지에서 토큰 가져오기

            // 토큰이 없다면 추가 작업을 하지 않고 함수를 종료
            if (!token) {
                console.log('No token found');
                return;
            }
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            axios
            .get('',config)
            .then((res) => {
                setchatRoomId(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }, []);
        const exampleData = {
            id: '1',
            userId: 'user123',
            title: 'Chat Roomsasa Title',
            status: 'Active',
            username: 'exampleUser'
        };
        const exampleData2 = {
            id: '2',
            userId: 'user123',
            title: 'Chat Room Titless',
            status: 'Activess',
            username: 'exampleUser'
        };

    return (

        <Wrapper>
            <ChatRoomID {...exampleData}  />
            <ChatRoomID {...exampleData2} />
            {chatRoomId.map((chatroom) => (
                <ChatRoomID key={chatroom.id} {...chatroom} />
            ))}
        </Wrapper>
    );
}