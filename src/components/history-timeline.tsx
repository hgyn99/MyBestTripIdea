import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import HistoryID from "./history";
import { AccessTokenContext } from "./TokenContext";
export interface HistoryID {
  id: string;
  userId: string;
  title: string;
}
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 90%;
  width: 100%;

  & > div {
    flex: 0 0 45%;
    box-sizing: border-box;
    padding: 10px;
    border: 3px solid black;
    margin: 10px; // 마진 추가
    height: 50%;
    width: 100%;
    border-radius: 10px;
    position: relative;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export default function Chatroomlist() {
  const [historyID, setHistoryID] = useState<HistoryID[]>([]);
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
      .get("44.218.133.175:8080/api/v1/history")
      .then((res) => {
        setHistoryID(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const exampleData = {
    id: "1",
    userId: "user123",
    title: "Chat Roomsasa Title",
    status: "성향 조사",
    username: "exampleUser",
  };
  const exampleData2 = {
    id: "2",
    userId: "user123",
    title: "Chat Room Titless",
    status: "대기 중",
    username: "exampleUser",
  };
  const exampleData3 = {
    id: "2",
    userId: "user123",
    title: "Chat Room Titless",
    status: "참여하기",
    username: "exampleUser",
  };
  const exampleData4 = {
    id: "2",
    userId: "user123",
    title: "Chat Room Titless",
    status: "참여하기",
    username: "exampleUser",
  };
  const exampleData5 = {
    id: "2",
    userId: "user123",
    title: "Chat Room Titless",
    status: "성향 조사",
    username: "exampleUser",
  };
  const exampleData6 = {
    id: "2",
    userId: "user123",
    title: "Chat Room Titless",
    status: "대기 중",
    username: "exampleUser",
  };
  const exampleData7 = {
    id: "2",
    userId: "user123",
    title: "Chat Room Titless",
    status: "대기 중",
    username: "exampleUser",
  };

  return (
    <Wrapper>
      <div>
        <HistoryID {...exampleData} />
      </div>
      <div>
        <HistoryID {...exampleData2} />
      </div>
      <div>
        <HistoryID {...exampleData3} />
      </div>
      <div>
        <HistoryID {...exampleData4} />
      </div>
      <div>
        <HistoryID {...exampleData5} />
      </div>
      <div>
        <HistoryID {...exampleData6} />
      </div>
      <div>
        <HistoryID {...exampleData7} />
      </div>
      {historyID.map((history) => (
        <HistoryID key={history.id} {...history} />
      ))}
    </Wrapper>
  );
}
