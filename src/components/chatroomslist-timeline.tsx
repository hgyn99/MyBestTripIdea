import {
  useState,
  useEffect,
  createContext,
  useMemo,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import styled from "styled-components";
import axios from "axios";
import ChatRoom from "./chatroomslist-title";
import { AccessTokenContext } from "./TokenContext";
export interface ChatRoom {
  chatRoomId: number;
  userId: string;
  title: string;
  current_status: string;
  username: string;
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
        setChatRooms(res.data); // 여기를 수정합니다. res.data는 서버 응답에 따라 다를 수 있습니다.
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]); // accessToken을 의존성 배열에 추가합니다.

  return (
    <Wrapper>
      {chatRooms.map((chatroom) => (
        <ChatRoom key={chatroom.chatRoomId} {...chatroom} />
      ))}
    </Wrapper>
  );
}
