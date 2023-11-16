import React, { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  selectedOption: string;
}

const questionTexts = [
  "나는 여행지에서 문화와 역사적인 장소를 방문하는 것을 좋아한다.",
  "나는 여행 중에 스포츠나 레저 활동을 즐기는 것을 선호한다.",
  "나는 여행지에서 휴식과 힐링을 중요하게 생각한다.",
  "나는 여행 중에 쇼핑을 즐기는 편이다.",
  "나는 여행지에서 자연과 경치를 감상하는 것을 좋아한다.",
  "나는 여행 중에 현지인과의 교류를 중요하게 생각한다.",
  "나는 여행지에서 야간 활동과 야경을 즐기는 편이다.",
  "나는 여행 중에 예술과 공연을 감상하는 것을 선호한다.",
  "나는 여행지에서 도전적인 활동을 시도하는 것을 좋아한다.",
  "나는 여행 중에 현지 전통과 문화를 체험하는 것을 선호한다.",
  "나는 여행지에서 도시보다 시골을 더 선호한다.",
  "나는 여행 중에 혼자 시간을 보내는 것을 선호한다.",
  "나는 여행지에서 모험과 탐험을 중요하게 생각한다.",
  "나는 여행지에서 현지인의 일상생활을 체험하는 것을 좋아한다.",
  "나는 여행 중에 음악과 춤을 즐기는 것을 선호한다.",
  "나는 여행지에서 역사적인 장소보다 현대적인 장소를 더 선호한다.",
  "나는 여행 중에 스파나 마사지를 받는 것을 선호한다.",
  "나는 여행지에서 미술관이나 박물관을 방문하는 것을 좋아한다.",
  "나는 여행 중에 지역 페스티벌이나 이벤트에 참여하는 것을 선호한다.",
  "나는 여행지에서 해변이나 바다 활동을 즐기는 것을 좋아한다.",
];

const questionsData: Question[] = questionTexts.map((text, index) => ({
  id: index + 1,
  text: text,
  options: [
    "STRONGLY AGREE",
    "AGREE",
    "NEUTRAL",
    "DISAGREE",
    "STRONGLY DISAGREE",
  ],
  selectedOption: "",
}));

const QUESTIONS_PER_PAGE = 5;
const TOTAL_PAGES = questionsData.length / QUESTIONS_PER_PAGE;

const Survey_test: React.FC = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentPage, setCurrentPage] = useState(0);

  const handleAnswerChange = (questionId: number, selectedOption: string) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, selectedOption } : question
    );
    setQuestions(updatedQuestions);
  };

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
    // 모든 답변이 완료되었을 때 수행할 동작
    const submittedAnswers = questions.map(({ id, selectedOption }) => ({
      id,
      selectedOption,
    }));
    console.log("제출된 답변:", submittedAnswers); // 모든 항목을 전송하려면 questions, 특정 항목만 전송하려면 submittedAnswers
    // 여기에 서버로 데이터 전송하는 로직을 추가할 수 있습니다.
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
