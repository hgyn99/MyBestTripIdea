import React, { useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AccessTokenContext } from "../components/TokenContext";
const Invite = () => {
  const { chatroomId } = useParams();
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
    const password = prompt("채팅방에 접근하기 위한 비밀번호를 입력하세요.");
  
    if (password) {
      (async () => {
        try {
          // axios.post를 await로 처리
          const response = await axios.post(`https://yourserver.com/api/invite/${chatroomId}`, { password },config);
          console.log('서버 응답:', response.data);
          // 성공 처리 로직
        } catch (error) {
          console.error('서버 요청 실패:', error);
          // 오류 처리 로직
        }
      })();
    } else {
      console.log('비밀번호 입력이 취소되었습니다.');
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