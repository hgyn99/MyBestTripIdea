import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import react, { useState } from "react";

// 왼쪽 틀
const Lay = styled.div`
  width: 25%;
  // 가운데 정렬
  display: flex;
  flex-direction: column;
  //justify-content: center; // 수직 가운데 정렬
  align-items: center; // 수평 가운데 정렬
`;
// 오른쪽 틀
const Divs = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
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
  margin-top: 100px;
`;
// 왼쪽 배경
const Background_left = styled.div`
  background-image: url("/paper_plane.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 500px;
  width: 100%;
  height: 100%;
`;

// 오른쪽 배경
const Background_right = styled.div`
  background-image: url("/solar_cloud-linear.svg");
  background-size: cover;
  width: 100%;
  height: 100%;
`;

// 이미지 + 함께하기 컨테이너
const MBTIContainer = styled.div`
  height: 70%;
  width: 100%;
  // 가운데 정렬
  display: flex;
  flex-direction: column;
  justify-content: center; // 수직 가운데 정렬
  align-items: center; // 수평 가운데 정렬
`;

// MBTI와 함께하기 버튼
const StyledButton = styled.button`
  background-color: #f2bdaf; // 배경색
  color: black; // 텍스트 색상
  padding: 30px 60px; // 안쪽 여백
  border: none; // 테두리 없음
  border-radius: 30px; // 모서리 둥글게
  cursor: pointer; // 마우스 오버 시 커서 변경
  font-family: "Jalnan2TTF";
  font-size: 48px; // 폰트 크기

  &:hover {
    background-color: #d3a599; // 호버 시 배경색 변경
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 130px;
  padding: 20px;
  width: 75%;
  position: fixed; // 상단에 고정
  top: 0; // 상단에서 0의 위치에
  right: 0; // 오른쪽에서 0의 위치에
  margin-left: auto; // 왼쪽 마진을 자동으로 설정하여 오른쪽 정렬
  z-index: 1000; // 다른 요소들 위에 오도록 z-index 설정
  height: 20%;
`;

// 각 메뉴 아이템을 위한 스타일
const MenuItem = styled.div`
  font-family: "Gluten", cursive;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  text-align: center;
  font-size: 2em;
`;
const StyledLink = styled(Link)`
  text-decoration: none; // 밑줄 제거
  color: black; // 텍스트 색상 변경
`;

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <>
      <Lay>
        <MBTIBlock>MBTI</MBTIBlock>
        <MBTIContainer>
          <Background_left />
          <Link to="/login">
            <StyledButton>MBTI와 함께하기</StyledButton>
          </Link>
        </MBTIContainer>
      </Lay>
      <Divs>
        <Background_right />
        <MenuContainer>
          <StyledLink to="/">
            <MenuItem>My</MenuItem>
          </StyledLink>
          <StyledLink to="/">
            <MenuItem>Best</MenuItem>
          </StyledLink>
          <StyledLink to="/">
            <MenuItem>Trip</MenuItem>
          </StyledLink>
          <StyledLink to="/">
            <MenuItem>Ideas</MenuItem>
          </StyledLink>
        </MenuContainer>
      </Divs>
      <Outlet />
    </>
  );
}
