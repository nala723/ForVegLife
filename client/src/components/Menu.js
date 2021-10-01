import react, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../styles/theme";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import gsap from "gsap";
export default function Menubar({ logOut, register, login }) {
  const history = useHistory();
  const ref = useRef();
  useEffect(() => {
    gsap.to(ref.current, { scale: 1, duration: 0.5, ease: "back" });
  });
  const user = useSelector((state) => state.userReducer);
  let profileIMG;
  const { accessToken, profileblob, isLogin } = user;
  if (profileblob === null || Object.keys(profileblob).length === 0) {
    profileIMG = "/image/bros_blank.jpg";
  } else {
    if (
      typeof profileblob === "string" &&
      profileblob.slice(0, 5) === "https"
    ) {
      profileIMG = profileblob;
    } else {
      profileIMG =
        "data:image/png;base64, " +
        Buffer(profileblob, "binary").toString("base64");
    }
  }

  return (
    <Temp>
      <MenuContainer ref={ref}>
        <User>
          <UserImageContainer>
            <UserImage src={profileIMG}></UserImage>
          </UserImageContainer>
          {isLogin ? (
            <UserInfo>
              <UserName>{user.nickName}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserInfo>
          ) : (
            ""
          )}
        </User>
        <MenuBar>
          <StyledRegister to="/">Map</StyledRegister>
          <MypageConatiner>
            <StyledRegister to="/mypage">Mypage</StyledRegister>
            <Mypages> 내가 준 별점 보기 </Mypages>
            <Mypages>나의 즐겨찾기</Mypages>
            <Mypages> 나의 정보 수정</Mypages>
            <Mypages> 회원 탈퇴하기</Mypages>
          </MypageConatiner>
          <StyledRegister to="/content">content</StyledRegister>
        </MenuBar>
        <UserController>
          {!isLogin ? (
            <>
              <LoginComponent onClick={() => login()}>Log in</LoginComponent>{" "}
              <RegisterComponent onClick={() => register()}>
                Register
              </RegisterComponent>{" "}
            </>
          ) : (
            <Logout
              onClick={() => {
                logOut();
                history.push("/");
              }}
            >
              Logout
            </Logout>
          )}
        </UserController>
      </MenuContainer>
    </Temp>
  );
}

const Temp = styled.div`
  margin-top: 5vh;
  width: 100vw;
  height: calc(100vh - 3.45rem);
  max-height: calc(100vh - 3.45rem);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 9;
`;

const MenuContainer = styled.div`
  display: flex;
  ${theme.device.mobile} {
    width: 18rem;
    height: 27rem;
  }
  ${theme.device.mobileS} {
    width: 15rem;
    height: 24rem;
  }
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  width: 18rem;

  height: 27rem;
  background-color: white;
  border-radius: 0.2rem;
  overflow: auto;
  z-index: 3;
`;

const User = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  height: 20%;
  border-bottom: 1px solid rgba(75, 63, 63, 0.5);
`;
const UserImageContainer = styled.div`
  margin: 0.5rem;
  margin-top: 1rem;
`;

const UserImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  z-index: 2;
  border-radius: 100%;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 0.5rem;
`;
const UserName = styled.div`
  color: ${theme.colors.darkgrey};
  font-size: ${theme.fonts.size.base};
  margin-bottom: 1rem;
`;
const UserEmail = styled.div`
  color: ${theme.colors.darkgrey};
  font-size: ${theme.fonts.size.sm};
`;
const MenuBar = styled.div`
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid rgba(75, 63, 63, 0.5);
`;
const StyledRegister = styled(Link)`
  color: ${theme.colors.green};
`;
const Mypages = styled.div`
  color: ${theme.colors.grey};
  font-size: ${theme.fonts.size.sm};
`;
const MypageConatiner = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const UserController = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 20%;
`;
const LoginComponent = styled.div`
  ${theme.device.change} {
    width: 6.5rem;
  }
  ${theme.device.mobile} {
    width: 4.5rem;
  }
  display: flex;
  width: 7.375rem;
  font-size: ${theme.fonts.size.base};
  font-family: ${theme.fonts.button};
  font-weight: 500;
  justify-content: center;
  align-items: center;
  height: 2.063rem;
  border-radius: 0.5rem;
  border: 1px solid #bbbbbb;
  background-color: white;
  color: ${theme.colors.green};
  cursor: pointer;
  :hover {
    background-color: ${theme.colors.green};
    color: white;
    transition: all 0.5s ease;
  }
`;
const RegisterComponent = styled(LoginComponent)`
  background-color: ${theme.colors.green};
  color: white;
  cursor: pointer;
  :hover {
    background-color: white;
    color: ${theme.colors.green};
  }
`;
const Logout = styled(RegisterComponent)``;
