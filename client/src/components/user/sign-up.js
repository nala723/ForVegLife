import react, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import theme from "../../styles/theme";
import gsap from "gsap";
export default function SignUp(props) {
  let userdata = useSelector((state) => state.userReducer);
  const size = useRef();
  useEffect(() => {
    gsap.to(size.current, { scale: 1, duration: 0.5, ease: "back" });
  });
  const dispatch = useDispatch();
  const [verifyCode, setVerifyCode] = useState(null);
  const [message, setMessage] = useState("");
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
    // axios로 email보내고  코드 값 가져오기
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/sign/email-code`, {
        email: email,
      })
      .then((res) => {
        setVerifyCode(res.data.data.emailcode);
      })
      .catch((err) => {});

    // 오류는 중복되거나 또는 서버 오류
    setIsSend(true);
  };
  const verify = (code) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/sign/email-verification?code=${verifyCode}`,
        {
          emailCode: code,
        }
      )
      .then((res) => {
        setIsVerify(true);
      })
      .catch((err) => {});
  };
  const onCreate = async (data) => {
    // axios 요청 성공 시2
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/sign/signup`, {
        nickname: data.nickName,
        email: data.email,
        password: data.password,
      })
      .then((res) => {});
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/sign/signin`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        dispatch(
          userLogin({
            isLogin: true,
            email: user.email,
            nickName: res.data.nickname,
            accessToken: res.data.accessToken,
            profileblob: res.data.profileblob,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      chkPW(user.password) === "통과" &&
      isVerify === true &&
      user.nickName !== undefined
    ) {
      let code = onCreate(user);
      if (code === "409") {
        setMessage("이미 등록되어 있는 이메일입니다");
      }
      if (code === "500") {
        setMessage("서버 오류 입니다");
      } else {
        setUser({
          email: "",
          verifyEmail: "",
          password: "",
          rePassword: "",
          nickName: "",
        });
        setIsVerify(false);
        props.exit();
      }
    } else {
      setMessage("비번이나 이메일 인증을 확인해주세요");
    }
  };
  function chkPW(pw) {
    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/gi);
    let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (user.password) {
      if (pw.length < 8 || pw.length > 20) {
        return "8자리 ~ 20자리 이내로 입력해주세요.";
      } else if (pw.search(/\s/) != -1) {
        return "비밀번호는 공백 없이 입력해주세요.";
      } else if (num < 0 || eng < 0 || spe < 0) {
        return "영문,숫자, 특수문자를 혼합하여 입력해주세요.";
      } else {
        return "통과";
      }
    }
  }
  return (
    <Temp>
      <Exit onClick={props.exit}>
        <FontAwesomeIcon color={"white"} icon={faTimes} />
      </Exit>
      <SignUpForm ref={size} onSubmit={handleSubmit}>
        <Logo>
          <img src="/image/logo.svg" />
        </Logo>
        <InputBox>
          <EmailIcon>
            <Align>
              <EmailInput
                name="email"
                value={user.email}
                placeholder="email"
                onChange={handleChange}
              />

              <EmailButton type="button" onClick={() => send(user.email)}>
                인증
              </EmailButton>
            </Align>
            <Message>
              {isSend && !isVerify ? (
                <div style={{ color: `${theme.colors.green}` }}>
                  이메일 인증 코드가 발송되었습니다.
                </div>
              ) : (
                ""
              )}
            </Message>
          </EmailIcon>
          <EmailIcon>
            <Align>
              <EmailInput
                name="verifyEmail"
                value={user.verifyEmail}
                placeholder="email code"
                onChange={handleChange}
              />
              <VerifyButton
                type="button"
                onClick={() => verify(user.verifyEmail)}
              >
                확인
              </VerifyButton>
            </Align>
            <Message>
              {isVerify ? (
                <div style={{ color: `${theme.colors.green}` }}>
                  인증되었습니다
                </div>
              ) : isSend && user.verifyEmail ? (
                "인증 되지 않았습니다"
              ) : (
                ""
              )}
            </Message>
          </EmailIcon>
          <Repassword>
            <RepasswordInput
              name="password"
              value={user.password}
              type="password"
              placeholder="password"
              onChange={handleChange}
            />
            <Message>
              {chkPW(user.password) === "통과" ? (
                <div style={{ color: `${theme.colors.green}` }}>통과</div>
              ) : (
                chkPW(user.password)
              )}
            </Message>
          </Repassword>
          <Repassword>
            <RepasswordInput
              name="rePassword"
              type="password"
              value={user.repassword}
              placeholder="password confirm"
              onChange={handleChange}
            />
            <Message>
              {user.repassword !== "" && user.password ? (
                user.password === user.rePassword ? (
                  <div style={{ color: `${theme.colors.green}` }}>
                    비밀번호가 일치합니다.
                  </div>
                ) : (
                  "비밀번호가 일치 하지 않습니다"
                )
              ) : (
                ""
              )}
            </Message>
          </Repassword>
          <Message>{message}</Message>
          <LoginInput
            name="nickName"
            value={user.nickName}
            placeholder="nickname"
            onChange={handleChange}
          />
        </InputBox>
        <SignupButton type="submit">회원가입</SignupButton>
      </SignUpForm>
    </Temp>
  );
}
const Temp = styled.div`
  width: 100vw;
  max-width: 100%;
  height: calc(100vh - 3.45rem);
  max-height: calc(100vh - 3.45rem);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
const Exit = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: scale(0);
  width: 26.25rem;
  height: 35.563rem;
  background-color: white;
  border-radius: 1rem;
  padding: 0 3.688rem;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.188rem;
  margin-top: 1rem;
  > img {
    width: 100%;
    height: 100%;
  }
`;
const InputBox = styled.div`
  margin-top: 2.8rem;
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Repassword = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 4.375rem;
  align-items: center;
`;
const RepasswordInput = styled.input`
  width: 100%;
  height: 3.063rem;
  border-radius: 0.5rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 1rem;
  background-image: url("/image/lock.svg");
  background-repeat: no-repeat;
  background-position: 96% 50%;
  background-size: 25px;
  font-size: ${theme.fonts.size.base};
  color: ${theme.colors.darkgrey};
  ::placeholder {
    color: #989898;
  }
  :focus {
    outline: none;
  }
`;
const EmailIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 4.375rem;
`;
const Align = styled.div`
  display: flex;
  gap: 0.625rem;
`;

const EmailInput = styled.input`
  width: 100%;
  height: 3.063rem;
  border-radius: 0.5rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 1rem;
  background-image: url("/image/email.svg");
  background-repeat: no-repeat;
  background-position: 96% 50%;
  background-size: 25px;
  font-size: ${theme.fonts.size.base};
  color: ${theme.colors.darkgrey};
  ::placeholder {
    color: #989898;
  }

  :focus {
    outline: none;
  }
`;
const EmailButton = styled.button`
  width: 5.2rem;
  height: 100%;
  font-size: 10px;
  border-radius: 0.3rem;
  background-color: #7cb700;
  color: white;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  font-style: ${theme.fonts.family.button};
`;
const VerifyButton = styled.button`
  width: 5.2rem;
  background-color: rgba(0, 0, 0, 0);
  height: 100%;
  border-radius: 0.3rem;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7cb700;
  border: 0.01rem solid #7cb700;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  font-style: ${theme.fonts.family.button};
`;
const Message = styled.div`
  width: 100%;
  height: 1.438rem;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 0.1rem;
  color: ${theme.colors.red};
`;
const LoginInput = styled.input`
  width: 100%;
  min-height: 3.063rem;
  border-radius: 0.5rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 1rem;
  background-image: url("/image/userIcon.svg");
  background-repeat: no-repeat;
  background-position: 96% 50%;
  background-size: 25px;
  font-size: ${theme.fonts.size.base};
  color: ${theme.colors.darkgrey};
  ::placeholder {
    color: #989898;
  }
  :focus {
    outline: none;
  }
`;
const SignupButton = styled.button`
  margin-top: 2.3rem;
  background-color: #7cb700;
  border-radius: 0.5rem;
  width: 100%;
  height: 3.063rem;
  font-size: 1rem;
  color: white;
  border: 0;
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
