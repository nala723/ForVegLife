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
import { userLogin, getgoogleToken } from "../actions/index";
import Login from "./user/login";
import SignUp from "./user/sign-up";
import NotFound from "../pages/NotFoundPage";
import { Buffer } from "buffer";
import axios from "axios";

const Navbar = () => {
  const loginState = useSelector((state) => state.userReducer);
  const googleState = useSelector((state) => state.googleReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const { accessToken, profileblob, isLogin } = loginState;
  const { googleToken } = googleState;

  let token;
  if (googleToken) {
    token = googleToken;
  } else {
    token = accessToken;
  }

  useEffect(() => {
    if (isLogin) {
      setLoginModal(false);
      setRegisterModal(false);
    }
  }, []);

  const userSignin = () => {
    setLoginModal(true);
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
    setLoginModal(false);
    setRegisterModal(false);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}` + `/sign/signout`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ` + token,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            userLogin({
              isLogin: false,
              email: null,
              nickName: null,
              accessToken: "",
              profileblob: "",
              vegType: "vegetarian",
            })
          );
          dispatch(getgoogleToken({ googleToken: "" }));
          history.push("/");
          console.log(isLogin);
        } else {
          history.push("/notfound");
        }
        //  setIsLoding(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let profileIMG;
  if (profileblob === null || Object.keys(profileblob).length === 0) {
    profileIMG = "/image/bros_blank.jpg";
  } else {
    if (Array.isArray(profileblob) && profileblob.slice(0, 5) === "https") {
      profileIMG = profileblob;
    } else {
      profileIMG =
        "data:image/png;base64, " +
        Buffer(profileblob, "binary").toString("base64");
    }
  }

  return (
    <>
      <Router>
        {isLogin ? (
          <Header>
            <Logo to="/">
              <img src="/image/logo.svg" />
            </Logo>
            <ButtonBox primary>
              <Link to="/">
                <StyledLogin onClick={() => logout()}>Logout</StyledLogin>
              </Link>
              <Route exact path="/">
                <Link to="/mypage">
                  <StyledMypage>Mypage</StyledMypage>
                </Link>
              </Route>
              <Route path="/mypage">
                <Link to="/">
                  <StyledMypage>map</StyledMypage>
                </Link>
              </Route>
              <ImageBox>
                <Image src={profileIMG} />
              </ImageBox>
            </ButtonBox>
          </Header>
        ) : (
          <Header>
            <Logo to="/">
              <img src="/image/logo.svg" />
            </Logo>
            <ButtonBox>
              <StyledLogin onClick={userSignin}>Login</StyledLogin>
              <StyledRegister onClick={Register}>Register</StyledRegister>
            </ButtonBox>
          </Header>
        )}

        <Switch>
          <Route exact path="/">
            <MapPage login={loginModal} register={registerModal}>
              {!isLogin && loginModal ? <Login exit={userLoginExit} /> : null}
              {!isLogin && registerModal ? (
                <SignUp exit={RegisterExit} />
              ) : null}
            </MapPage>
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>

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
  width: 100vw;
  max-width: 100%;
  height: 3.125rem;
  display: flex;
  padding: 1.688rem;
  justify-content: space-between;
`;
const ImageBox = styled.div`
  margin-left: 0.5rem;
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
  background-color: white;
`;
const Logo = styled(Link)`
  display: flex;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  width: ${(props) => (props.primary ? "20rem" : "16.563rem")};
  height: inherit;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
`;
const StyledLogin = styled.button`
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
const StyledRegister = styled(StyledLogin)`
  background-color: ${theme.colors.green};
  color: white;
  cursor: pointer;
  :hover {
    background-color: white;
    color: ${theme.colors.green};
  }
`;
const StyledMypage = styled(StyledRegister)``;

export default Navbar;
