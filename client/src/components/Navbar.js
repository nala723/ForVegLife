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
import Tutorial from "../pages/Tutorial";
import Content from "../pages/Content";
import { Buffer } from "buffer";
import axios from "axios";
import { Icon } from "@iconify/react";
import Menubar from "./Menu";

const Navbar = () => {
  const loginState = useSelector((state) => state.userReducer);
  const googleState = useSelector((state) => state.googleReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState("");
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [menuBar, setMenubar] = useState(false);
  const { accessToken, profileblob, isLogin } = loginState;
  const { googleToken } = googleState;

  let token;
  if (googleToken) {
    token = googleToken;
  } else {
    token = accessToken;
  }

  const handleClick = () => setClick(!click); //후에 햄버거 아이콘에 붙임
  // const closeMobileMenu = () => setClick(false); //마찬가지로 닫는 버튼

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
    logout();
  }, []); //SIGN-UP 버튼이 모바일 사이즈에선 사라진다
  window.addEventListener("resize", showButton);

  useEffect(() => {
    if (isLogin) {
      setModal("");
    }
  }, []);

  const userSignin = () => {
    setModal("signin");
  };
  const userLoginExit = () => {
    setModal("");
  };
  const Register = () => {
    setModal("signup");
  };
  const RegisterExit = () => {
    setModal("");
  };
  const logout = () => {
    setModal("");
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
        } else {
          history.push("/notfound");
        }
        //  setIsLoding(false)
      })
      .catch((err) => {});
  };

  let profileIMG;
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
    <>
      <Router>
        {isLogin ? (
          <Header>
            <Logo to="/">
              {button ? (
                <img src="/image/logo.svg" />
              ) : (
                <img src="/image/logo-sm.svg" />
              )}
            </Logo>
            <ButtonBox primary>
              {button && (
                <Link to="/content">
                  <ContentPage>Content</ContentPage>
                </Link>
              )}
              {button && (
                <Link to="/">
                  <StyledLogin onClick={() => logout()}>Logout</StyledLogin>
                </Link>
              )}
              <Route exact path="/">
                {button && (
                  <Link to="/mypage">
                    <StyledMypage>Mypage</StyledMypage>
                  </Link>
                )}
              </Route>

              <Route exact path="/restaurant/:placeId">
                {button && (
                  <Link to="/mypage">
                    <StyledMypage>Mypage</StyledMypage>
                  </Link>
                )}
              </Route>
              <Route path="/mypage">
                {button && (
                  <Link to="/">
                    <StyledMypage>map</StyledMypage>
                  </Link>
                )}
              </Route>
              <ImageBox>
                <Image src={profileIMG} />
              </ImageBox>
              {!button && (
                <StyledBar
                  icon="system-uicons:menu-hamburger"
                  color="#7c6d6d"
                  height="60"
                  onClick={() => setMenubar(!menuBar)}
                />
              )}
            </ButtonBox>
          </Header>
        ) : (
          <Header>
            <Logo to="/">
              {button ? (
                <img src="/image/logo.svg" />
              ) : (
                <img src="/image/logo-sm.svg" />
              )}
            </Logo>
            <ButtonBox>
              {button && (
                <Link to="/content">
                  <ContentPage>Content</ContentPage>
                </Link>
              )}
              <StyledLogin onClick={userSignin}>Login</StyledLogin>
              {button && (
                <StyledRegister onClick={Register}>Register</StyledRegister>
              )}
              {!button && (
                <StyledBar
                  icon="system-uicons:menu-hamburger"
                  color="#7c6d6d"
                  height="60"
                  onClick={() => setMenubar(!menuBar)}
                />
              )}
            </ButtonBox>
          </Header>
        )}

        <Switch>
          <Route exact path="/">
            <MapPage>
              {menuBar && !modal ? (
                <Menubar
                  logOut={logout}
                  register={Register}
                  login={userSignin}
                />
              ) : (
                ""
              )}
              {!isLogin && modal === "signin" ? (
                <Login exit={userLoginExit} />
              ) : null}
              {!isLogin && modal === "signup" ? (
                <SignUp exit={RegisterExit} />
              ) : null}
            </MapPage>
          </Route>
          <Route path="/resturant/:placeId">
            <MapPage>
              {menuBar && !modal ? (
                <Menubar
                  logOut={logout}
                  register={Register}
                  login={userSignin}
                />
              ) : (
                ""
              )}
              {!isLogin && modal === "signin" ? (
                <Login exit={userLoginExit} />
              ) : null}
              {!isLogin && modal === "signup" ? (
                <SignUp exit={RegisterExit} />
              ) : null}
            </MapPage>
          </Route>
          <Route path="/mypage">
            {menuBar && !modal ? (
              <Menubar logOut={logout} register={Register} login={userSignin} />
            ) : (
              ""
            )}
            <Mypage />
          </Route>
          <Route path="/tutorial">
            {menuBar && !modal ? (
              <Menubar logOut={logout} register={Register} login={userSignin} />
            ) : (
              ""
            )}
            <Tutorial />
          </Route>
          <Route path="/content">
            {menuBar && !modal ? (
              <Menubar logOut={logout} register={Register} login={userSignin} />
            ) : (
              ""
            )}
            <Content />
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
  ${theme.device.mobile} {
    padding: 1.688rem 0.8rem;
  }
  align-items: center;
  background-color: none;
  width: 100vw;
  max-width: 100%;
  height: 3.125rem;
  display: flex;
  padding: 1.688rem;
  justify-content: space-between;
  border-bottom: 0.1rem solid #dedede;
`;

const ImageBox = styled.div`
  ${theme.device.mobile} {
    margin-right: 0rem;
    width: 2rem;
    height: 2rem;
  }
  ${theme.device.change} {
    margin-right: 0.3rem;
  }
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
  ${theme.device.tablet} {
    width: 200px;
  }
  display: flex;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  ${theme.device.change} {
    width: 11rem;
    gap: 0.5rem;
    justify-content: flex-end;
  }
  display: flex;
  width: ${(props) => (props.primary ? "27rem" : "23.563rem")};
  height: inherit;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const ContentPage = styled.button`
  display: flex;
  width: 6rem;
  font-size: ${theme.fonts.size.base};
  font-family: ${theme.fonts.button};
  font-weight: 600;
  justify-content: center;
  align-items: center;
  height: 2.063rem;
  border: none;
  background-color: white;
  color: #aa938c;
  cursor: pointer;
  :hover {
    color: ${theme.colors.mapgrey};
  }
`;

const StyledLogin = styled.button`
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

const StyledBar = styled(Icon)`
  width: 50px;

  ${theme.device.mobile} {
    width: 40px;
  }
`;

export default Navbar;
