import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import react, { useState } from "react";
const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

// 각 메뉴 아이템을 위한 스타일
const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ddd;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
  }
`;

// MBTI 박스를 위한 스타일
const MBTIBlock = styled.div`
  font-family: "Gluten", cursive;
  background-color: white;
  color: black;
  text-align: center;
  padding: 20px;
  font-size: 2em;
`;

const DayPlanContainer = styled.div`
  font-family: "Jalnan2TTF";
  //margin-left: 0px;
  color: black;
`;

const DayButton = styled.button`
  background-color: white;
  border: none;
  font-size: 2em;
  margin: 0 10px;
  cursor: pointer;
`;

const Divs = styled.div`
  //position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  color: black;
  font-size: 20px;
  // 가운데 정렬
  display: flex;
  flex-direction: row;
  //justify-content: center; // 수직 가운데 정렬
  //align-items: center; // 수평 가운데 정렬
`;

const DayPlanItem = styled.li`
  font-family: "Jalnan2TTF";
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SatisfactionRadio = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  label {
    margin: 0 10px;
    font-size: 1em;
    color: #333;
    display: flex;
    align-items: center;
  }

  input[type="radio"] {
    vertical-align: middle;
    appearance: none;
  }

  // 커스텀 라디오 버튼 디자인
  input[type="radio"]:after {
    width: 15px;
    height: 15px;
    transition: border 0.5s ease-in-out;
    border-radius: 15px;
    position: relative;
    background-color: white;
    content: "";
    display: inline-block;
    visibility: visible;
    border: max(2px, 0.1em) solid gray;
  }

  input[type="radio"]:checked:after {
    background-color: #f2bdaf;
  }
  input[type="radio"]:hover {
    cursor: pointer;
  }
`;

// 제출하기 버튼
const StyledButton = styled.button`
  font-family: "Jalnan2TTF";
  background-color: #f1d19d; // 배경색
  color: black; // 텍스트 색상
  padding: 15px 32px; // 안쪽 여백
  border: none; // 테두리 없음
  border-radius: 30px; // 모서리 둥글게
  cursor: pointer; // 마우스 오버 시 커서 변경
  font-size: 16px; // 폰트 크기
  margin-top: 10px;
  margin-left: 70px;
  /* &:hover {
    background-color: #d8c19d; // 호버 시 배경색 변경
  } */
`;

export default function Layout() {
  const navigate = useNavigate();
  const [day, setDay] = useState(1);
  const [satisfaction, setSatisfaction] = useState({});

  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  const handleNextDay = () => {
    setDay((prevDay) => prevDay + 1);
  };

  // 이전 일자로 이동
  const handlePrevDay = () => {
    setDay((prevDay) => (prevDay > 1 ? prevDay - 1 : 1));
  };

  return (
    <>
      <Link to="/">
        <MenuItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </MenuItem>
      </Link>
      {/* <MenuContainer>
        <Link to="/">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </MenuItem>
        </Link>
        <Link to="/survey">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              stroke="black"
              strokeWidth={0.5}
              className="bi bi-check-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
            </svg>
          </MenuItem>
        </Link>

        <MenuItem onClick={onLogOut} className="log-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </MenuItem>
      </MenuContainer> */}

      <Outlet />
      <MBTIBlock>
        <MBTIBlock>MBTI</MBTIBlock>
      </MBTIBlock>

      <DayPlanContainer>
        &emsp; &emsp;&nbsp;
        <DayButton onClick={handlePrevDay}>&lt;</DayButton>
        {day}일차
        <DayButton onClick={handleNextDay}>&gt;</DayButton>
        &emsp;만족&nbsp;&nbsp;불만족
        <ul>
          {[
            "여행 추천지1",
            "여행 추천지2",
            "여행 추천지3",
            "여행 추천지4",
            "여행 추천지5",
          ].map((destination, index) => (
            <DayPlanItem key={index}>
              {day}일차 {destination}
              <SatisfactionRadio>
                <label>
                  <input
                    type="radio"
                    name={`satisfaction-${destination}`}
                    value="satisfied"
                  />
                </label>
                <label>
                  <input
                    type="radio"
                    name={`satisfaction-${destination}`}
                    value="unsatisfied"
                  />
                </label>
              </SatisfactionRadio>
            </DayPlanItem>
          ))}
        </ul>
        <StyledButton type="submit">여행지 만족도 제출</StyledButton>
      </DayPlanContainer>
    </>
  );
}
