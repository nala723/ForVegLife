import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Mypage from "../pages/MyPage";
import MapPage from "../pages/MapPage";
import { useEffect, useState } from "react";
import { isLogin } from "../actions/index";
import Login from "./user/login";
import SignUp from "./user/sign-up";
import NotFound from "../pages/NotFoundPage";

const Navbar = () => {
  const loginState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [Link, setLink] = useState("map");
  localStorage.setItem("link", Link);
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
    dispatch(isLogin({ isLogin: false, email: null, nickName: null }));
    setLoginModal(false);
    setRegisterModal(false);
  };

  return (
    <>
      <Router>
        {loginState.isLogin ? (
          Link === "map" ? (
            <Header>
              <Logo>Logo</Logo>
              <StyledLogin onClick={logout}>Logout</StyledLogin>
              <StyledMypage to="/mypage" onClick={() => setLink("mypage")}>
                Mypage
              </StyledMypage>
              <Image
                src={
                  typeof loginState.profile === "string"
                    ? loginState.profile
                    : "data:image/png;base64," +
                      Buffer(loginState.profileblob, "binary").toString(
                        "base64"
                      )
                }
              />
            </Header>
          ) : (
            <Header>
              <Logo>Logo</Logo>
              <StyledLogin to="/  " onClick={logout}>
                Logout
              </StyledLogin>
              <StyledMypage to="/" onClick={() => setLink("map")}>
                main
              </StyledMypage>
              <Image
                src={
                  typeof loginState.profile === "string"
                    ? loginState.profile
                    : "data:image/png;base64," +
                      Buffer(loginState.profileblob, "binary").toString(
                        "base64"
                      )
                }
              />
            </Header>
          )
        ) : (
          <Header>
            <Logo>Logo</Logo>
            <StyledLogin onClick={userLogin}>Login</StyledLogin>
            <StyledRegister onClick={Register}>Register</StyledRegister>
          </Header>
        )}

        <Switch>
          <Route exact path="/*">
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
  justify-content: center;
  align-items: center;
  background-color: none;
  color: black;

  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-around;
`;
const Image = styled.image`
  width: 5rem;
  height: 5vh;
`;
const Logo = styled.div`
  width: 60%;
  margin-left: 1rem;
`;
const StyledLogin = styled.div`
  display: flex;
  width: 12%;
  font-size: 0.2rem;
  justify-content: center;
  align-items: center;
  height: 3.5vh;
  border-radius: 0.5rem;
  border: 1px solid #bbbbbb;
  background-color: white;
  color: #7cb700;
`;
const StyledRegister = styled.div`
  display: flex;
  width: 12%;
  justify-content: center;
  font-size: 0.2rem;
  align-items: center;
  height: 3.5vh;
  border: 1px solid #bbbbbb;
  background-color: #7cb700;
  border-radius: 0.5rem;
  color: white;
`;
const StyledMypage = styled(Link)`
  display: flex;
  width: 12%;
  justify-content: center;
  font-size: 0.2rem;
  align-items: center;
  height: 3.5vh;
  border: 1px solid #bbbbbb;
  background-color: #7cb700;
  border-radius: 0.5rem;
  color: white;
`;

export default Navbar;
