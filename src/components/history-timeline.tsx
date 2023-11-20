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
      .get("44.218.133.175:8080/api/v1/history", config)
      .then((res) => {
        setHistoryID(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 

  return (
    <Wrapper>
      {historyID.map((history) => (
        <HistoryID key={history.id} {...history} />
      ))}
    </Wrapper>
  );
}
