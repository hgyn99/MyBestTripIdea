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
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]); // 상태 변수 이름 변경
  //const [chatRoomId, setChatRoomId] = useState<ChatRoom[]>([]);
  const { accessToken } = useContext(AccessTokenContext);
  useEffect(() => {
    // 토큰이 없다면 추가 작업을 하지 않고 함수를 종료
    if (!accessToken) {
      console.log("No token found");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      //.get("http://localhost:4000/api/v1/chatrooms", config)
      .get("http://44.218.133.175:8080/api/v1/chatrooms", config)
      .then((res) => {
        setChatRooms(res.data);
        // 서버에 있는 테스트 데이터 제외하고 필터링된 데이터 확인
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  return (
    <Wrapper>
      {chatRooms.map((chatroom) => (
        <ChatRoom key={chatroom.chatRoomId} {...chatroom} />
      ))}
    </Wrapper>
  );
}
