import react, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../../actions/index";
import { GoogleLogin } from "react-google-login";

export default function Login() {
  let userdata = useSelector((state) => state);

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
    dispatch(
      isLogin({ isLogin: true, email: user.email, nickName: user.nickName })
    );
  };
  const responseGoogle = (res) => {
    const email = res.profileObj.email;
    const nickName = res.profileObj.name;
    // axios 요청
    // 중복 되는 것이 있을때는 에러를 리턴
    dispatch(isLogin({ isLogin: true, email, nickName }));
  };
  return (
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
        value={user.password}
        placeholder="password"
        onChange={handleChange}
      />
      <LoginButton type="submit">로그인</LoginButton>
      <Message>아직 회원이 아니신가요? 회원가입</Message>
      <GoogleLogin
        clientId="530151826698-d016iq7c5p3c4l2pl7jnhchpnrpim8bt.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
      />
    </LoginForm>
  );
}
const LoginForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50vh;
  left: 50vw;
  width: 18rem;
  height: 21rem;
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
  margin-bottom: 2rem;
`;
