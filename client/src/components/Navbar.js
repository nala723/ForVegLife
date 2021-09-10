import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import RandingPage from "../pages/Randing";
import Mypage from "../pages/MyPage";
import MapPage from "../pages/MapPage";
const Navbar = () => {
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  console.log(isLogin);
  return (
    <>
      <Router>
        {isLogin ? (
          <Header>
            <Logo>Logo</Logo>
            <StyledLogin to="/">Login</StyledLogin>
            <StyledRegister to="/">Mypage</StyledRegister>{" "}
          </Header>
        ) : (
          <Header>
            <Logo>Logo</Logo>
            <StyledLogin to="/">Login</StyledLogin>
            <StyledRegister to="/">Register</StyledRegister>{" "}
          </Header>
        )}

        <Switch>
          <Route exact path="/">
            <MapPage />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  top: 0;
  width: 100%;
  min-height: 5vh;
  display: flex;
  justify-content: space-around;
`;
const Logo = styled.div`
  width: 70%;
  margin-left: 1rem;
`;
const StyledLogin = styled(Link)`
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
const StyledRegister = styled(Link)`
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
