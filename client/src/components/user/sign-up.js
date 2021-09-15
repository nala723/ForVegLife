import react, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export default function SignUp(props) {
  let userdata = useSelector((state) => state);

  const dispatch = useDispatch();
  const [verifyCode, setVerifyCode] = useState(null)
  const [message,setMessage] = useState("")
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
    axios.post(`${process.env.REACT_APP_SERVER_URL}/sign/email-code`,{
      email: email
    }).then(res =>
      {
        console.log(res.data)
        setVerifyCode(res.data.data.emailcode)
      }
    )

    // 오류는 중복되거나 또는 서버 오류
    setIsSend(true);
  };
  const verify = (code) => {
    console.log(verifyCode)
    axios.post(`${process.env.REACT_APP_SERVER_URL}/sign/email-verification?code=${verifyCode}`,{
     emailCode : code
    })
    .then(res =>
      {
      console.log(res)
      setIsVerify(true)
      }
    )
  };
  const onCreate = (data) => {
    // axios 요청 성공 시2
    axios.post('http://localhost/sign/signup',{
      nickName: data.nickName,
      email: data.email,
      password: data.password
    }).then(
      res=> {
        const { email, nickName } = data;
    dispatch(isLogin({ isLogin: true, email, nickName }));
      }
    )
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(chkPW(user.password)==="통과" && isVerify=== true && user.nickName!==undefined){
    onCreate(user)
    setUser({
      email: "",
      verifyEmail: "",
      password: "",
      rePassword: "",
      nickName: "",
    });
    setIsVerify(false);
    }else{
      setMessage("비번이나 이메일 인증을 확인해주세요")
    }
  };
  function chkPW(pw){

    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/ig);
    let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
   
    if(pw.length < 8 || pw.length > 20){
   
     return ("8자리 ~ 20자리 이내로 입력해주세요.");
    }else if(pw.search(/\s/) != -1){
     return("비밀번호는 공백 없이 입력해주세요.");
   
    }else if(num < 0 || eng < 0 || spe < 0 ){
     return("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
    
    }else {
     return("통과"); 
      
    }
   
   }
  return (
    <Temp>
      <Exit onClick={props.exit}><FontAwesomeIcon color={"white"} icon={faTimes}/></Exit>
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
      <Repassword>
      <RepasswordInput
        name="password"
        value={user.password}
        placeholder="password"
        onChange={handleChange}
      />
      <Message>{chkPW(user.password)}</Message>
      </Repassword>
       <Repassword>
      <RepasswordInput
        name="rePassword"
        value={user.repassword}
        placeholder="password confirm"
        onChange={handleChange}
      />
      <Message>
          { user.repassword !== "" ? user.password === user.rePassword ? "비밀번호가 일치합니다" :  "비밀번호가 일치 하지 않습니다": "" }
        </Message>
      </Repassword>
      <Message>
      {message}
      </Message>
      <LoginInput
        name="nickName"
        value={user.nickName}
        placeholder="nickname"
        onChange={handleChange}
      />
      <SignupButton type="submit">회원가입</SignupButton>
    </SignUpForm>
    </Temp>
  );
}
const Temp = styled.div`
 width:100vw;
 height: 95vh;
 background-color: rgba(0,0,0,0.4)
`;
const Exit = styled.div`
position: absolute;
top:1rem;
right:1rem;
font-size: 2rem;
`
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
  min-width: 18rem;
  width: 21vw;
  min-height: 24rem;
  height: 27vw;
  background-color: white;
  border-radius: 0.2rem;
  transform: translate(-50%, -50%);
`;
const Repassword = styled.div`
width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const RepasswordInput = styled.input`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 2rem;
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
