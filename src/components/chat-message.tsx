import { deleteDoc, doc,setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { IMessage } from "./chat-timeline";
import styled from "styled-components";
import { deleteObject, ref } from "firebase/storage";
import react from "react";


//메시지 내용 보여지는 틀
//왼쪽 오른쪽 나눠서 currentUser 확인 후 배치
type BubbleProps = {
    isCurrentUser: boolean;
};
const Bubble = styled.div<BubbleProps>`
    padding: 10px;
    border-radius: 20px;
    background-color: white;
    `;

const ChatBubble = styled.div<BubbleProps>`
    display: flex;
    flex-direction: column;
    max-width: 430px;
    margin: 10px;
    align-self: ${props => props.isCurrentUser ? 'flex-end' : 'flex-start'};
    color: black;
`;

const Username = styled.div<BubbleProps>`
    font-weight: bold;
    margin-bottom: 5px;
    text-align: ${props => props.isCurrentUser ? 'right' : 'left'};
`;


const Timestamp = styled.div<BubbleProps>`
    font-size: 10px;
    margin-top: 5px;
    text-align: ${props => props.isCurrentUser ? 'right' : 'left'};
`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;



const DeleteButton = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: none;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;
//추후 사용예정
export default function Message({ username, photo, message, userId, id, time }: IMessage) {
    const user = auth.currentUser;
        // 지우는 기능은 추후 사용 예정
    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this message?");
        if (!ok || user?.uid !== userId) return;

        try {
            await deleteDoc(doc(db, "messages", id));
            if (photo) {
                const photoRef = ref(storage, `messages/${user?.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        }
    };
    const timestampToDate = time?.toDate(); // Timestamp를 Date 객체로 변환
    const formattedTime = `${String(timestampToDate?.getHours()).padStart(2, '0')}:${String(timestampToDate?.getMinutes()).padStart(2, '0')}`;
    
    const isCurrentUser = user?.uid === userId;
    return (    
        <ChatBubble isCurrentUser={isCurrentUser}>
            <Username isCurrentUser={isCurrentUser}>{username}</Username>
            {photo && <Photo src={photo} alt="Uploaded by user" />} {/* Conditionally render the photo if provided */}
            <Bubble isCurrentUser={isCurrentUser}>{message}</Bubble>
            <Timestamp isCurrentUser={isCurrentUser}>{formattedTime}</Timestamp>
        </ChatBubble>
    )
    
}