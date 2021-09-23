import react, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userLogin} from "../../actions/index";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Login(props) {
  let userdata = useSelector((state) => state);
  const history = useHistory();

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
        history.push("/mypage")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const responseGoogle = (res) => {
    const email = res.profileObj.email;
    const nickName = res.profileObj.name;
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/google/signin`, {
        email,
        nickName,
      })
      .then((res) => {
        dispatch(userLogin({ isLogin: true, email, nickName }));
        history.push("/mypage")
      });
    // axios 요청
    // 중복 되는 것이 있을때는 에러를 리턴
  };
  return (
    <Temp>
      <Exit onClick={props.exit}>
        <FontAwesomeIcon color={"white"} icon={faTimes} />
      </Exit>
      <LoginForm onSubmit={handleSubmit}>
        <Logo>LoGo</Logo>
        <LoginInput
          name="email"
          value={user.email}
          placeholder="email"
          onChange={handleChange}
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
        <GoogleLogin
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
  height: 95vh;
  z-index: 3;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Exit = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
`;
const LoginForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50vh;
  left: 50vw;
  min-width: 18rem;
  width: 21vw;
  min-height: 21rem;
  height: 24vw;
  background-color: white;
  border-radius: 1rem;
  transform: translate(-50%, -50%);
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 3rem;
  border-radius: 0.5rem;
`;
const LoginInput = styled.input`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 1rem;
`;
const LoginButton = styled.button`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  color: white;
  background-color: #7cb700;
  border: 0px;
`;
const Message = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  font-size: 0.6rem;
  margin-bottom: 2rem;
`;
