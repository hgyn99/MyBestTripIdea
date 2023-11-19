import {
  useState,
  useEffect,
  createContext,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import axios from "axios";
import ChatRoom from "./chatroomslist-title";

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
  useEffect(() => {
    const token = localStorage.getItem("userToken"); // 예시: 로컬 스토리지에서 토큰 가져오기

    // 토큰이 없다면 추가 작업을 하지 않고 함수를 종료
    // if (!token) {
    //   console.log("No token found");
    //   return;
    // }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:4000/api/v1/chatrooms", config)
      .then((res) => {
        const filteredChatRooms = res.data.filter(
          (chatroom: ChatRoom) => chatroom.chatRoomId >= 1
        );
        setChatRooms(filteredChatRooms);
        console.log(filteredChatRooms); // 서버에 있는 테스트 데이터 제외하고 필터링된 데이터 확인
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const exampleData = {
  //   chatRoomId: 1,
  //   userId: "user123",
  //   title: "Chat Roomsasa Title",
  //   status: "참여하기",
  //   username: "exampleUser",
  // };
  // const exampleData2 = {
  //   chatRoomId: 2,
  //   userId: "user123",
  //   title: "Chat Room Titless",
  //   status: "참여하기",
  //   username: "exampleUser",
  // };
  // const exampleData3 = {
  //   chatRoomId: 2,
  //   userId: "user123",
  //   title: "Chat Room Titless",
  //   status: "참여하기",
  //   username: "exampleUser",
  // };
  // const exampleData4 = {
  //   chatRoomId: 3,
  //   userId: "user123",
  //   title: "Chat Room Titless",
  //   status: "참여하기",
  //   username: "exampleUser",
  // };
  // const exampleData5 = {
  //   chatRoomId: 4,
  //   userId: "user123",
  //   title: "Chat Room Titless",
  //   status: "참여하기",
  //   username: "exampleUser",
  // };
  // const exampleData6 = {
  //   chatRoomId: 6,
  //   userId: "user123",
  //   title: "Chat Room Titless",
  //   status: "대기 중",
  //   username: "exampleUser",
  // };

  return (
    <Wrapper>
      {/* <ChatRoom {...exampleData} />
      <ChatRoom {...exampleData2} />
      <ChatRoom {...exampleData3} />
      <ChatRoom {...exampleData4} />
      <ChatRoom {...exampleData5} />
      <ChatRoom {...exampleData6} /> */}
      {chatRooms.map((chatroom) => (
        <ChatRoom key={chatroom.chatRoomId} {...chatroom} />
      ))}
    </Wrapper>
  );
}
