import React, { useState } from "react";
import { styled } from "styled-components";

// 설문 조사 틀
const Lay = styled.div`
  width: 25%;
  border-right: 1.5px solid gray;
`;
const C = styled.div`
  width: 100%;
  height: 10%;
`;

// 질문 틀
const Divs = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  color: black;
  font-size: 20px;
`;

// 설문조사 설명
const Survey_explain = styled.div`
  color: black;
  font-size: 20px;
  text-align: center;
  margin-top: 200px;
  list-style: none;
  line-height: 150%;
`;

// 라디오 버튼을 위한 스타일 컴포넌트
const RadioGroup = styled.div`
  margin: 20px 0;
`;

const RadioButton = styled.input`
  margin-right: 0px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
`;

// MBTI 박스를 위한 스타일
const MBTIBlock = styled.div`
  font-family: "Gluten", cursive;
  background-color: white;
  color: black;
  text-align: center;
  margin-top: 200px;
  padding: 20px;
  font-size: 4em;
`;

export default function Survey() {
  // 각 질문에 대한 상태
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    // 나머지 질문들...
  });

  // 라디오 버튼 선택 핸들러
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [event.target.name]: event.target.value,
    });
  };

  // 제출 버튼 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 여기서 answers 상태를 사용하여 결과를 처리합니다.
    console.log(answers);
  };

  return (
    <>
      <Lay>
        <MBTIBlock>MBTI</MBTIBlock>
        <Survey_explain>
          <li>보다 만족스러운 계획을 위해</li>{" "}
          <li>자신의 성향을 기록해주세요</li>
        </Survey_explain>
      </Lay>
      <Divs>
        <form onSubmit={handleSubmit}>
          <RadioGroup>
            질문1
            <label>
              {" "}
              <RadioButton
                type="radio"
                name="question1"
                value="option1"
                checked={answers.question1 === "option1"}
                onChange={handleRadioChange}
              />
              옵션 1
            </label>
            <label>
              {" "}
              <RadioButton
                type="radio"
                name="question1"
                value="option2"
                checked={answers.question1 === "option2"}
                onChange={handleRadioChange}
              />
              옵션 2
            </label>
            <label>
              {" "}
              <RadioButton
                type="radio"
                name="question1"
                value="option3"
                checked={answers.question1 === "option3"}
                onChange={handleRadioChange}
              />
              옵션 3
            </label>
            <label>
              {" "}
              <RadioButton
                type="radio"
                name="question1"
                value="option4"
                checked={answers.question1 === "option4"}
                onChange={handleRadioChange}
              />
              옵션 4
            </label>
            {/* 나머지 질문들... */}
          </RadioGroup>
          <RadioGroup>
            질문2
            <label>
              {" "}
              <RadioButton
                type="radio"
                name="question2"
                value="option1"
                checked={answers.question1 === "option1"}
                onChange={handleRadioChange}
              />
              옵션 1
            </label>
            <label>
              {" "}
              <RadioButton
                type="radio"
                name="question2"
                value="option2"
                checked={answers.question1 === "option2"}
                onChange={handleRadioChange}
              />
              옵션 2
            </label>
            <label>
              {" "}
              <RadioButton
                type="radio"
                name="question2"
                value="option3"
                checked={answers.question1 === "option3"}
                onChange={handleRadioChange}
              />
              옵션 3
            </label>
            <label>
              {" "}
              <RadioButton
                type="radio"
                name="question2"
                value="option4"
                checked={answers.question1 === "option4"}
                onChange={handleRadioChange}
              />
              옵션 4
            </label>
            {/* 나머지 질문들... */}
          </RadioGroup>
          {/* 추가 질문들... */}
          <SubmitButton type="submit">제출</SubmitButton>
        </form>
      </Divs>
    </>
  );
}
