import { Firestore, Timestamp, Unsubscribe, collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Message from "./chat-message";


//메시지 타임라인, 즉 틀 이야기하는 거 
export interface IMessage {
    id: string;
    photo?: string;
    message: string;
    userId: string;
    username: string;
    createdAt: number;
    time: Timestamp;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto; // 스크롤 가능하게 합니다.
    height: 100%;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }

    /* Firefox */
    scrollbar-width: none;
    `;

export default function Timeline() {
    const [messages, setMessage] = useState<IMessage[]>([]);
    
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchMessages = async () => {
            const messagesQuery = query(
                collection(db, "messages"),
                orderBy("createdAt", "desc"),
        
            );

            unsubscribe = await onSnapshot(messagesQuery, (snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    const { message, createdAt, userId, username, photo, time } = doc.data();
                    return {
                        message,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                        time,
                    };
                });
                setMessage(messages);
            });

        };
        fetchMessages();
        return () => {
            unsubscribe && unsubscribe();
        }
    }, []);

    return (
        <Wrapper>
            {messages.map((message) => (
                <Message key={message.id} {...message} />
            ))}
        </Wrapper>
    );
}