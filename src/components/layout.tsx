import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 20%;
  width: 20%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex;
  gap: 40px;
  align-items: flex-start; // 추가: 아이템들을 상단에 정렬
  justify-items: flex-start; // 추가: 아이템들을 왼쪽에 정렬
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: white;
  }
  &.log-out {
    border-color: black;
    svg {
      fill: gray;
    }
  }
`;

const MBTIBlock = styled.div`
  font-family: "Gluten", cursive; // 폰트 패밀리를 Gluten으로 설정
  background-color: white; // 블록의 배경색
  color: black; // 텍스트 색상
  padding: 10px; // 텍스트 주변에 패딩 추가
  border-radius: 4px; // 선택 사항: 모서리를 둥글게 하고 싶다면 설정
  user-select: none; // 선택 사항: 사용자가 텍스트를 선택하지 못하게 함
  font-size: 1rem; // 폰트 크기 설정
  height: 50px;
  width: 50px;
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Menu>
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
            <Link to="/chat">
              <MenuItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-chat"
                  stroke="black"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
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
          </Menu>

          <Outlet />
        </Wrapper>
        <Wrapper>
          <MBTIBlock>MBTI</MBTIBlock>
        </Wrapper>
      </Container>
    </>
  );
}
