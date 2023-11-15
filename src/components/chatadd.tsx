import { styled} from "styled-components";
import React, {useState} from "react";
import axios from "axios";


const Form = styled.form`
    display: flex;
    gap: 10px;
    background-color: white;
    flex-direction: column;
    color:black;
    font-family: 'AbeeZee', sans-serif;
    font: bold;
`;
//채팅치는 코드
const TextArea = styled.input`
    height:30px;
    width:100%;
    font-size:16px;
    color: black;
    background-color: white;
    border: 1px solid #B5E2E9;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, 
    "Open Sans", "Helvetica Neue", sans-serif;
    overflow-y:hidden;
    &::placeholder {
        font-size: 16px;
    }

`;

const SubmitBtn = styled.button`

    cursor: pointer;
    display: flex;
    align-items:center;
    justify-content: left;
    height:10px;
    width:100%;
    background-color: white;
    border: 1px solid black;
    border:none;
`;

export default function ChatAddForm() {


    const baseUrl = "http://localhost:8080";
    const [title, setTitle] = useState("");
    const [spot, setSpot] = useState("");
    const [headcount, setHeadcount] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [password, setPassword] = useState("");
    
    const onChange_title = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const onChange_spot = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSpot(e.target.value);
    }
    const onChange_headcount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeadcount(e.target.value);
    }
    const onChange_start = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStart(e.target.value);
    }
    const onChange_end = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnd(e.target.value);
    }
    const onChange_password = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken'); // 예시: 로컬 스토리지에서 토큰 가져오기

        // 토큰이 없다면 추가 작업을 하지 않고 함수를 종료
        if (!token) {
            console.log('No token found');
            return;
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        
        axios.post('여기에_API_URL', {
            title: title,
            spot: spot,
            headcount: headcount,
            start: start,
            end: end,
            password: password
        }, config)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

        
        setTitle("")
        setSpot("")
        setHeadcount("")
        setStart("")
        setEnd("")
        setPassword("") 
    }
    return (
        <>
        <Form onSubmit={onSubmit}>
            채팅방 제목
        <TextArea  maxLength={10} onChange={onChange_title} value={title} />
            여행지
        <TextArea  maxLength={10} onChange={onChange_spot} value={spot} />
            여행 인원
        <TextArea type="number" onChange={onChange_headcount} value={headcount} />
            여행 기간
        <TextArea type="date" maxLength={180} onChange={onChange_start} value={start} />
        <TextArea type="date"maxLength={180} onChange={onChange_end} value={end} />
            방 비밀번호
        <TextArea type="password" maxLength={15} onChange={onChange_password} value={password} />
        <SubmitBtn type="submit">
            생성하기       
        </SubmitBtn>
    </Form>
    </>
    );
}