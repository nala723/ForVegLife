import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import theme from "../styles/theme";
import Mypage from "../pages/MyPage";
import MapPage from "../pages/MapPage";
import { useEffect, useState } from "react";
import { isLogin } from "../actions/index";
import Login from "./user/login";
import SignUp from "./user/sign-up";
import NotFound from "../pages/NotFoundPage";
import {Buffer} from 'buffer';

const Navbar = () => {
  const loginState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const userState = useSelector((state)=> state)
  const {accessToken,profileblob} = loginState;
  const userLogin = () => {
    setLoginModal(true);
    console.log(loginModal);
  };
  const userLoginExit = () => {
    setLoginModal(false);
  };
  const Register = () => {
    setRegisterModal(true);
  };
  const RegisterExit = () => {
    setRegisterModal(false);
  };
  const logout = () => {
    dispatch(isLogin({ isLogin: false, email: null, nickName: null,accessToken: '',profileblob:""}));
    setLoginModal(false);
    setRegisterModal(false);
    window.location.href = "/";
  };

  let profileIMG 
  if(profileblob === null || Object.keys(profileblob).length ===0){
      profileIMG = "/image/bros_blank.jpg"
  }
   else{ 
      profileIMG = 'data:image/png;base64, '+ Buffer(profileblob,'binary').toString('base64')
     };

  return (
    <>
      <Router>
        {loginState.isLogin ? (
          <Header>
             <Logo><img src="/image/logo.svg"/></Logo>  
              <ButtonBox primary>
            <StyledLogin to="/" onClick={() => logout()} >
              Logout
            </StyledLogin>
            <Route exact path="/">
              <StyledMypage to="/mypage">Mypage</StyledMypage>
            </Route>
            <Route path="/mypage">
              <StyledMypage to="/">map</StyledMypage>
            </Route>
              <ImageBox>
                <Image
                  src={profileIMG}
                />
              </ImageBox>
             </ ButtonBox >
          </Header>
        ) : (
          <Header>
            <Logo><img src="/image/logo.svg"/></Logo>
            <ButtonBox >
            <StyledLogin onClick={userLogin}>Login</StyledLogin>
            <StyledRegister onClick={Register}>Register</StyledRegister>
            </ ButtonBox >
          </Header>
        )}

        <Switch>
          <Route exact path="/">
            <MapPage login={loginModal} register={registerModal}>
              {loginState.isLogin ? (
                ""
              ) : loginModal ? (
                <Login exit={userLoginExit} />
              ) : (
                ""
              )}
              {loginState.isLogin ? (
                ""
              ) : registerModal ? (
                <SignUp exit={RegisterExit} />
              ) : (
                ""
              )}
            </MapPage>
          </Route>
          <Route exact path="/?">
            <MapPage login={loginModal} register={registerModal}>
              {loginState.isLogin ? (
                ""
              ) : loginModal ? (
                <Login exit={userLoginExit} />
              ) : (
                ""
              )}
              {loginState.isLogin ? (
                ""
              ) : registerModal ? (
                <SignUp exit={RegisterExit} />
              ) : (
                ""
              )}
            </MapPage>
          </Route>
          <Route path="/mypage" component={Mypage} />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

const Header = styled.header`
  align-items: center;
  background-color: none;
  width: 100%;
  height: 3.125rem;
  padding:  1.688rem;
  display: flex;
  justify-content: space-between;
`;
const ImageBox = styled.div`
  margin-left:0.5rem;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 100%;
  display: flex;
  overflow: hidden;
`;
const Image = styled.img`
   width: 100%;
   height: 100%;
   object-fit: cover;
  background-color: grey;
`;
const Logo = styled.div`
  display: flex;
`;

const ButtonBox = styled.div`
  display: flex;
  width: ${props=> props.primary ? '20rem' :'16.563rem'};
  height: inherit;
  justify-content: center;
  align-items: center;
  gap:1rem;
  margin-right: 1rem;
`;
const StyledLogin = styled(Link)`
  display: flex;
  width: 7.375rem;
  font-size:${theme.fonts.size.base};
  font-family: ${theme.fonts.button};
  font-weight: 500;
  justify-content: center;
  align-items: center;
  height: 2.063rem;
  border-radius: 0.5rem;
  border: 1px solid #bbbbbb;
  background-color: white;
  color: ${theme.colors.green};
  cursor:pointer;
  :hover {
       background-color: ${theme.colors.green};
       color:white;
       transition: all 0.5s ease;
     }
`;
const StyledRegister = styled(StyledLogin)`
  background-color: ${theme.colors.green};
  color: white;
  cursor:pointer;
  :hover {
       background-color: white;
       color: ${theme.colors.green};
     }
`;
const StyledMypage = styled(StyledRegister)`

`;

export default Navbar;
