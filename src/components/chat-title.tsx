import { styled } from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChatRoomContext } from "./ChatRoomContext";
import {useContext} from "react";
//title은 추가해야 함 채팅방 맨 위를 가리키는 거
//메시지 룸 추가하면서 채팅방 이름 갖게되면 그거에 따라 div에 출력하도록 해야함
const Title = styled.div`
  height: 100%;
  padding: 20px;
  font-size: 16px;
  color: black;
  background-color: #fbf5ef;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  overflow-y: hidden;
`;

export default function SendMessageForm() {
  const { chatRoomId } = useContext(ChatRoomContext);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("userToken"); // 예시: 로컬 스토리지에서 토큰 가져오기

    
    // 토큰이 없다면 추가 작업을 하지 않고 함수를 종료
    if (!token) {
       console.log("No token found");
       return;
     }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:3000/api/v1/chatrooms/${chatroomId}/title", config)
      .then((res) => {
        setTitle(res.data.title);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [chatRoomId]);
  
  return <Title>{title}</Title>;
}
