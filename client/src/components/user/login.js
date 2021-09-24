import react, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getgoogleToken, userLogin } from "../../actions/index";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import theme from "../../styles/theme";
import gsap from "gsap";

export default function Login(props) {
  let userdata = useSelector((state) => state.userReducer);
  let googleState = useSelector((state) => state.googleReducer);
  const history = useHistory();
  const size = useRef();
  useEffect(() => {
    gsap.to(size.current, { scale: 1, duration: 0.5, ease: "back" });
  });
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // axios 요청으로 닉네임 알아오기
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/sign/signin`, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(
          userLogin({
            isLogin: true,
            email: user.email,
            nickName: res.data.nickname,
            accessToken: res.data.accessToken,
            profileblob: res.data.profileblob,
          })
        );
        history.push("/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const responseGoogle = (res) => {
    console.log(res.profileObj.imageUrl);
    const email = res.profileObj.email;
    const nickName = res.profileObj.name;
    const profileblob = res.profileObj.imageUrl;
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/google/signin`, {
        email,
        nickName,
      })
      .then((res) => {
        dispatch(userLogin({ isLogin: true, email, nickName, profileblob }));
        dispatch(getgoogleToken({ googleToken: res.accessToken }));
        history.push("/mypage");
      });
    // axios 요청
    // 중복 되는 것이 있을때는 에러를 리턴
  };
  return (
    <Temp>
      <Exit onClick={props.exit}>
        <FontAwesomeIcon color={"white"} icon={faTimes} />
      </Exit>
      <LoginForm ref={size} onSubmit={handleSubmit}>
        <Logo>
          <img src="/image/logo.svg" />
        </Logo>
        <InputBox>
          <LoginInput
            name="email"
            value={user.email}
            placeholder="email"
            onChange={handleChange}
            className="email"
          />
          <LoginInput
            name="password"
            type="password"
            value={user.password}
            placeholder="password"
            onChange={handleChange}
          />
          <LoginButton type="submit">로그인</LoginButton>
          <Message>아직 회원이 아니신가요? 회원가입</Message>
        </InputBox>
        <StyledGoogle
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID}
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
        />
      </LoginForm>
    </Temp>
  );
}

const Temp = styled.div`
  width: 100vw;
  height: calc(100vh - 3.35rem);
  max-width: 100%;
  z-index: 3;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Exit = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 26.25rem;
  height: 30.433rem;
  background-color: white;
  border-radius: 1rem;
  padding: 0 3.5rem;
  transform: scale(0);
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  height: 2.188rem;
  > img {
    width: 100%;
    height: 100%;
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.6rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20.563rem;
  gap: 0.5rem;
`;

const LoginInput = styled.input`
  display: flex;
  width: 100%;
  height: 3.063rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 1rem;
  background-image: url("/image/lock.svg");
  background-repeat: no-repeat;
  background-position: 96% 50%;
  background-size: 25px;
  &.email {
    background-image: url("/image/email.svg");
  }
  font-size: ${theme.fonts.size.base};
  color: ${theme.colors.darkgrey};
  ::placeholder {
    color: #989898;
  }

  :focus {
    outline: none;
  }
`;
const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.063rem;
  border-radius: 0.5rem;
  color: white;
  background-color: #7cb700;
  border: 0px;
  font-style: ${theme.fonts.family.button};
  font-size: ${theme.fonts.size.lg};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    transition: all 0.3s ease-in-out;
    background-color: white;
    color: ${({ theme }) => theme.colors.green};
    border: 1px solid ${({ theme }) => theme.colors.green};
    cursor: pointer;
  }
`;
const Message = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  font-size: 14px;
`;

const StyledGoogle = styled(GoogleLogin)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
