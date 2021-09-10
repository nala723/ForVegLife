import react, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../../actions/index";

export default function SignUp(props) {
  let userdata = useSelector((state) => state);

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    verifyEmail: "",
    nickName: "",
    password: "",
    rePassword: "",
  });
  const [code, setCode] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const send = (email) => {
    console.log(email);
    // axios로 email보내고  코드 값 가져오기
    // 오류는 중복되거나 또는 서버 오류
    const codeData = "123";
    setIsSend(true);
    setCode(codeData);
  };
  const verify = (verifyCode) => {
    if (verifyCode === code) {
      setIsVerify(true);
    }
  };
  const onCreate = (data) => {
    // axios 요청 성공 시2
    console.log(data);
    const { email, nickName } = data;
    dispatch(isLogin({ isLogin: true, email, nickName }));
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(user);
    setUser({
      email: "",
      verifyEmail: "",
      nickName: "",
      password: "",
      rePassword: "",
    });
    setIsVerify(false);
  };
  return (
    <SignUpForm onSubmit={handleSubmit}>
      <Logo>LoGo</Logo>
      <EmailIcon>
        <Align>
          <EmailInput
            name="email"
            value={user.email}
            placeholder="email"
            onChange={handleChange}
          />

          <EmailButton type="button" onClick={() => send(user.email)}>
            인증번호 받기
          </EmailButton>
        </Align>
        <Message>{isSend ? "이메일 인증 코드가 발송되었습니다." : ""}</Message>
      </EmailIcon>
      <EmailIcon>
        <Align>
          <EmailInput
            name="verifyEmail"
            value={user.verifyEmail}
            placeholder="email code"
            onChange={handleChange}
          />
          <VerifyButton type="button" onClick={() => verify(user.verifyEmail)}>
            확인
          </VerifyButton>
        </Align>
        <Message>
          {isVerify ? "인증 되었습니다" : isSend ? "인증 되지 않았습니다" : ""}
        </Message>
      </EmailIcon>

      <LoginInput
        name="password"
        value={user.password}
        placeholder="password"
        onChange={handleChange}
      />
      <LoginInput
        name="rePassword"
        value={user.repassword}
        placeholder="password confirm"
        onChange={handleChange}
      />
      <LoginInput
        name="nickName"
        value={user.nickName}
        placeholder="nickname"
        onChange={handleChange}
      />
      <SignupButton type="submit">회원가입</SignupButton>
    </SignUpForm>
  );
}

const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 3rem;
  border-radius: 0.5rem;
`;
const SignUpForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50vh;
  left: 50vw;
  width: 18rem;
  height: 27rem;
  min-height: 9rem;
  background-color: white;
  border-radius: 0.2rem;
  transform: translate(-50%, -50%);
`;

const EmailIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 2.5rem;
  margin-bottom: 1rem;
`;
const Align = styled.div`
  display: flex;
  justify-content: space-between;
`;
const EmailInput = styled.input`
  width: 75%;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 2rem;
`;
const EmailButton = styled.button`
  width: 20%;
  height: 100%;
  font-size: 0.1rem;
  background-color: #7cb700;
  color: white;
  border: 0;
`;
const VerifyButton = styled.button`
  width: 20%;
  background-color: rgba(0, 0, 0, 0);
  height: 100%;
  font-size: 0.1rem;
  color: #7cb700;
  border: 0.01rem solid #7cb700;
`;
const Message = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  font-size: 0.1rem;
`;
const LoginInput = styled.input`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 2rem;
`;
const SignupButton = styled.button`
  background-color: #7cb700;
  border-radius: 0.5rem;
  width: 80%;
  height: 2.5rem;
  font-size: 1rem;
  color: white;
  border: 0;
`;
