import React, { useState, useEffect } from "react";
import axios from "axios";

interface Question {
  id: number;
  text: string;
  options: string[];
  selectedOption: string;
}

const QUESTIONS_PER_PAGE = 5;

const Survey_test: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/members/survey/1")
      .then((response) => {
        const loadedQuestions = response.data.map(
          (item: any, index: number) => ({
            id: index + 1,
            text: item.questions,
            options: item.answers,
            selectedOption: item.selectedAnswer,
          })
        );
        setQuestions(loadedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleAnswerChange = (questionId: number, selectedOption: string) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, selectedOption } : question
    );
    setQuestions(updatedQuestions);
  };

  const TOTAL_PAGES = 4;
  //const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  //console.log("questions.length: " + questions.length);
  //console.log("QUESTIONS_PER_PAGE: " + QUESTIONS_PER_PAGE);

  const isPageComplete = () => {
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    return questions
      .slice(startIndex, endIndex)
      .every((q) => q.selectedOption !== "");
  };

  const allAnswered = questions.every(
    (question) => question.selectedOption !== ""
  );

  const handleSubmit = () => {
    // const submittedAnswers = questions.map(({ id, selectedOption }) => ({
    //   id,
    //   selectedOption,
    // }));

    // console.log("제출된 답변:", submittedAnswers);
    // 여기에 서버로 데이터 전송하는 로직을 추가할 수 있습니다.

    // 모든 선택된 옵션을 하나의 문자열로 결합
    const surveyResult = questions
      .map((question) => question.selectedOption)
      .join(",");
    console.log("surveyResult: ", surveyResult); // 이 로그를 통해 surveyResult의 내용을 확인

    // 데이터를 서버에 POST
    axios
      .post(
        "http://localhost:3000/api/v1/members/survey/1",
        JSON.stringify({ surveyResult }), // 데이터를 JSON 문자열로 변환
        {
          headers: {
            "Content-Type": "application/json", // 헤더에 Content-Type 설정
          },
        }
      )
      .then((response) => {
        console.log("서버 응답:", response);
        // 성공적으로 제출되었을 때의 추가 동작(옵션)
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
  };

  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {questions
        .slice(
          currentPage * QUESTIONS_PER_PAGE,
          (currentPage + 1) * QUESTIONS_PER_PAGE
        )
        .map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={question.selectedOption === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      {currentPage < TOTAL_PAGES - 1 && (
        <button onClick={handleNextPage} disabled={!isPageComplete()}>
          다음
        </button>
      )}
      <button onClick={handleSubmit} disabled={!allAnswered}>
        제출
      </button>
    </div>
  );
};

export default Survey_test;
