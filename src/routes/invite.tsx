import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Invite = () => {
  const { chatroomId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
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
    const password = prompt("채팅방에 접근하기 위한 비밀번호를 입력하세요.");

    if (password) {
      (async () => {
        try {
          // axios.post를 await로 처리
          const response = await axios.post(
            `http://44.218.133.175:8080/api/v1/chatrooms/${chatroomId}/invite`,
            { chatroomId, password },
            config
          );
          console.log("서버 응답:", response.data);
          console.log(chatroomId);
          console.log(password);
          // 성공 처리 로직
        } catch (error) {
          console.error("서버 요청 실패:", error);
          // 오류 처리 로직
        }
      })();
    } else {
      console.log("비밀번호 입력이 취소되었습니다.");
    }
  }, [chatroomId]);

  return (
    <div>
      <h1>채팅방 초대 페이지</h1>
      <p>채팅방 ID: {chatroomId}</p>
    </div>
  );
};

export default Invite;
