import { ChatRoom } from "./chatroomslist-timeline";
import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomContext } from "./ChatRoomContext";
const Wrapper = styled.div`
  display: flex;
  color: black;

  width: 100%;
  margin-bottom: 50px;
  margin-top: 10px;
  margin-left: 10px;
`;
const Title = styled.div`
  border-bottom: 2px solid #b5e2e9;
  width: 80%;
  font-family: "Jalnan2TTF";
`;

type StatusProps = {
  status: string;
};
const getStatusColor = (status: string): string => {
  switch (status) {
    case "대기 중":
      return "#F4F1F3";
    case "성향 조사":
      return "#F2BDAF";
    case "참여하기":
      return "#B5E2E9";
    default:
      return "#f2bdaf";
  }
};
const Status = styled.div<StatusProps>`
  background-color: ${(props) => getStatusColor(props.status)};
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 30px;
  font-family: "Jalnan2TTF";
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParticipateButton = styled.button<StatusProps>`
  // 버튼 스타일
  background-color: ${(props) => getStatusColor(props.status)};
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 30px;
  font-family: "Jalnan2TTF";
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #a2cbd1; // 호버 시 배경색 변경
  }
`;

export default function ChatRoom({
  chatroomId,
  title,
  chatroomStatus,
}: ChatRoom) {
  const { setChatroomId } = useContext(ChatRoomContext);
  const navigate = useNavigate();

  const handleJoinChat = () => {
    setChatroomId(chatroomId);
    console.log("채팅방에 참여합니다!");
    console.log(chatroomId);
    navigate(`/chat`);
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      {chatroomStatus === "참여하기" ? (
        <ParticipateButton status={chatroomStatus} onClick={handleJoinChat}>
          {chatroomStatus}
        </ParticipateButton>
      ) : (
        <Status status={chatroomStatus}>{chatroomStatus}</Status>
      )}
    </Wrapper>
  );
}
