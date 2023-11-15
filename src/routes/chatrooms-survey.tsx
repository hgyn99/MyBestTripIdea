import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import "../App.tsx";

// 왼쪽 틀
const Lay = styled.div`
  width: 35%;
  border-right: 1.5px solid gray;
  // 가운데 정렬
  display: flex;
  flex-direction: column;
  justify-content: center; // 수직 가운데 정렬
  align-items: center; // 수평 가운데 정렬
`;

// 오른쪽 틀
const Divs = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 65%;
  height: 100%;
  color: black;
  font-size: 20px;
  // 가운데 정렬
  display: flex;
  flex-direction: column;
  justify-content: center; // 수직 가운데 정렬
  //align-items: center; // 수평 가운데 정렬
`;

// MBTI 박스를 위한 스타일
const MBTIBlock = styled.div`
  align-items: center;
  font-family: "Gluten", cursive;
  background-color: white;
  color: black;
  text-align: center;
  padding: 20px;
  font-size: 10em;
`;

// 설문조사 설명
const Survey_explain = styled.div`
  color: black;
  font-family: "GmarketSansTTFMedium";
  font-size: 30px;
  text-align: center;
  margin-top: 200px;
  list-style: none;
  line-height: 150%;
`;

// 채팅방 이름 표시
const Chatroom_title = styled.div`
  color: black;
  font-family: "Jalnan2TTF";
  font-size: 56px;
  text-align: left;
  margin-left: 120px;
  list-style: none;
  line-height: 150%;
`;

// 개인 성향 질문
type Question = {
  id: number;
  questionText: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    questionText: "Q: 여행 성향 1",
    options: ["A", "B", "C", "D"],
  },
  {
    id: 2,
    questionText: "Q: 여행 성향 2",
    options: ["A", "B", "C", "D"],
  },
  {
    id: 3,
    questionText: "Q: 여행 성향 3",
    options: ["A", "B", "C", "D"],
  },
  {
    id: 4,
    questionText: "Q: 여행 성향 4",
    options: ["A", "B", "C", "D"],
  },
  {
    id: 5,
    questionText: "Q: 여행 성향 5",
    options: ["A", "B", "C", "D"],
  },
  {
    id: 6,
    questionText: "Q: 여행 성향 6",
    options: ["A", "B", "C", "D"],
  },
  // 질문 추가 가능.
];

// 질문 틀
const QuestionFrame = styled.div`
  //padding: 15px; // 안쪽 여백
  margin-bottom: 0px; // 바깥쪽 여백
  //border-radius: 8px; // 모서리 둥글게
`;

// 질문 제목
const QuestionTitle = styled.h3`
  font-family: "GmarketSansTTFBold";
  font-size: 24px; // 폰트 크기
  color: #333; // 폰트 색상
  margin-left: 30px;
  margin-bottom: 8px; // 제목 아래 여백
`;

// 선택지 컨테이너
const OptionsContainer = styled.div`
  display: flex; // flex 레이아웃 사용
  flex-direction: row; // 가로 방향 배열
  justify-content: start; // 왼쪽 정렬
  margin-left: 50px;
  margin-top: 1%;
`;

// 선택지
const OptionLabel = styled.label`
  display: inline-block; // 블록 레벨 요소로 변경
  margin-right: 70px; // 각 옵션 사이의 여백
  font-family: "GmarketSansTTFMedium";
  font-size: 20px; // 폰트 크기
  cursor: pointer; // 마우스 오버 시 커서 변경
`;

// 선택지 버튼
const RadioBoxInput = styled.input`
  width: 15px;
  height: 15px;
`;

// 제출하기 버튼
const StyledButton = styled.button`
  background-color: #b5e2e9; // 배경색
  color: white; // 텍스트 색상
  padding: 15px 32px; // 안쪽 여백
  border: none; // 테두리 없음
  border-radius: 30px; // 모서리 둥글게
  cursor: pointer; // 마우스 오버 시 커서 변경
  font-size: 16px; // 폰트 크기
  margin-top: 30px;
  margin-left: 30px;

  &:hover {
    background-color: #9dd0d8; // 호버 시 배경색 변경
  }
`;

export default function Survey() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleOptionChange = (questionId: number, option: string) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted Answers:", answers);
    // 여기서 서버로 답변을 전송하거나 다른 처리를 할 수 있습니다.
  };

  return (
    <>
      <Lay>
        <MBTIBlock>MBTI</MBTIBlock>
        <Survey_explain>
          <li>어떤 여행을 원하는지</li> <li>알려주세요</li>
        </Survey_explain>
      </Lay>
      <Divs>
        <Chatroom_title>제주도 가자~</Chatroom_title>{" "}
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <QuestionFrame key={question.id}>
              <QuestionTitle>{question.questionText}</QuestionTitle>
              <OptionsContainer>
                {question.options.map((option) => (
                  <OptionLabel key={option}>
                    <RadioBoxInput
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    {option}
                  </OptionLabel>
                ))}
              </OptionsContainer>
            </QuestionFrame>
          ))}
          <Link to="/chat">
            <StyledButton type="submit">제출하기</StyledButton>
          </Link>
        </form>
      </Divs>
    </>
  );
}
