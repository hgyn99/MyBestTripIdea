
import { ChatRoomID } from "./chatroomslist-timeline";
import styled from "styled-components";
import react, {useState} from "react";

const Wrapper = styled.div`
    display:flex;
    color:black;
    
    width:100%;
    margin-bottom:50px;
    margin-top:10px;
    margin-left:10px;

`;
const Title = styled.div`
    border-bottom: 2px solid #B5E2E9;
    width:80%;
    `;

const Status = styled.div`
    margin-left: 10px; // title과의 간격
    border: 1px solid black; // 테두리
    border-radius: 40%; // 원형
    padding: 5px; // 패딩
    text-align: center; // 텍스트 중앙 정렬
`;

export default function ChatRoom({ id, userId, title, status, username  }: ChatRoomID) {
    const [user, setUser] = useState(null);
    const authenticated = user != null;

    return (
        <>
            <Wrapper>
                <Title>
                {title}
                </Title>
                <Status>
                {status}
                </Status>
            </Wrapper>
        </>
    );
    
}   