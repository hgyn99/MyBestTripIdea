import {
  useState,
  useEffect,
  useContext,
} from "react";
import styled from "styled-components";
import axios from "axios";
import ChatRoom from "./chatroomslist-title";
import { AccessTokenContext } from "./TokenContext";
export interface ChatRoom {
  chatroomId: number;
  title: string;
  chatroomStatus: string;
}

const Wrapper = styled.div`
  display: flex;
  overflow-y: auto; // 스크롤 가능하게 합니다.
  flex-direction: column;
  height: 80%;
  width: 100%;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox */
  scrollbar-width: none;
`;

export default function Chatroomlist() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const { accessToken } = useContext(AccessTokenContext);

  useEffect(() => {
    if (!accessToken) {
      console.log("No token found");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(accessToken);
    axios
      .get("http://44.218.133.175:8080/api/v1/chatrooms", config)
      .then((res) => {
        if (Array.isArray(res.data.data.chatRoomInfos)) {
          setChatRooms(res.data.data.chatRoomInfos);
        } else {
          console.log('Data is not an array:', res.data.data.chatRoomInfos);
          // 적절한 오류 처리 로직을 추가하세요.
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  return (
    <Wrapper>
      {chatRooms.map((chatroom) => (
        <ChatRoom key={chatroom.chatroomId} {...chatroom} />
      ))}
    </Wrapper>
  );
}
