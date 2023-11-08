import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const Wrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr 4fr;
    height: 20%;
    width: 20%;
`;

const Menu = styled.div`
    display:flex;
    flex-direction: row;
    align-items:flex;
    gap:40px;
    align-items: flex-start; // 추가: 아이템들을 상단에 정렬
    justify-items: flex-start; // 추가: 아이템들을 왼쪽에 정렬
`;

const MenuItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items:center;
    justify-content: center;
    border: 2px solid white;
    height:50px;
    width: 50px;
    border-radius: 50%;
    svg {
        width:30px;
        fill:white;
    }
    &.log-out {
        border-color: black;
        svg{
            fill:gray;
        }
    }
`;

const MBTIBlock = styled.div`
    font-family: 'Gluten', cursive; // 폰트 패밀리를 Gluten으로 설정
    background-color: white; // 블록의 배경색
    color: black; // 텍스트 색상
    padding: 10px; // 텍스트 주변에 패딩 추가
    border-radius: 4px; // 선택 사항: 모서리를 둥글게 하고 싶다면 설정
    user-select: none; // 선택 사항: 사용자가 텍스트를 선택하지 못하게 함
    font-size: 1rem; // 폰트 크기 설정
    height:50px;
    width: 50px;
`;


export default function Layout() {
    const navigate = useNavigate();
    const onLogOut = async() => {
        const ok = confirm("Are you sure you want to log out?")
        if(ok) {
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

                </MenuItem>
                </Link>
                <Link to ="/profile">
                <MenuItem>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
                </MenuItem>
                </Link>

                <MenuItem onClick={onLogOut}className="log-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
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