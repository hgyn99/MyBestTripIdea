import { useState, useContext } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import styled from "styled-components";
import axios from "axios";
import { AccessTokenContext } from "../components/TokenContext";
// MBTI 박스를 위한 스타일
const MBTIBlock = styled.div`
  align-items: center;
  font-family: "Gluten", cursive;
  background-color: white;
  color: black;
  text-align: center;
  padding: 20px;
  font-size: 7em;
  margin-top: 100px;
`;
// 왼쪽 배경
const Background_left = styled.div`
  background-image: url("/paper_plane.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  width: 100%;
  height: 100%;
`;

// 안내 문구
const Explain = styled.div`
  color: black;
  font-family: "GmarketSansTTFMedium";
  font-size: 30px;
  text-align: center;
  list-style: none;
  line-height: 150%;
  margin-bottom: 80px;
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

// 오른쪽 틀
const Divs = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  color: black;
  font-size: 20px;
  // 가운데 정렬
  display: flex;
  flex-direction: column;
  justify-content: center; // 수직 가운데 정렬
  align-items: center; // 수평 가운데 정렬
`;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const response = await axios.post(
        "http://44.218.133.175:8080/api/v1/members/login",
        {
          email,
          password,
        } 
      );
      const { setAccessToken } = useContext(AccessTokenContext);
      setAccessToken(response.data.data.token.accessToken);
      navigate("/survey");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <MBTIBlock>MBTI</MBTIBlock>
      <MBTIContainer>
        <Background_left />
        <Explain>
          <li>MBTI와</li>
          <li>함께 계획을 완성해요!</li>
        </Explain>
      </MBTIContainer>
      <Divs>
        <Title>로그인</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          Don't have an account?{" "}
          <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
        <GithubButton />
      </Divs>
    </Wrapper>
  );
}
