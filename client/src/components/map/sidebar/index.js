import react, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuInfo from "./menuInfo";
import PlaceInfo from "./placeinfo";
import Review from "./review";
import { useSelector, useDispatch } from "react-redux";
import { selectPlace, newAccessToken, getgoogleToken } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import gsap from "gsap";
import { useRef } from "react";
import theme from "../../../styles/theme";

export default function SideBar({ select, inReview, exitReview }) {
  const googleState = useSelector((state) => state.googleReducer);
  const { googleToken } = googleState;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const selPlace = useSelector((state) => state.selectPlace);
  const [tempdata, setTempData] = useState([]);
  const [delReview, setDelReview] = useState(false);
  const [fav, setFav] = useState(false);
  const sideRef = useRef();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/restaurant/${selPlace.id}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.headers.accessToken) {
          if (googleToken) {
            dispatch(getgoogleToken({ accessToken: res.headers.accessToken }));
          } else {
            dispatch(newAccessToken({ accessToken: res.headers.accessToken }));
          }
        }
        if (delReview === true) {
          setDelReview(false);
        }
        if (fav === true) {
          setFav(false);
        }
        setTempData(...res.data);
        if (selPlace.id !== 0) {
          gsap.to(sideRef.current, {
            left: 0,
            height: "calc(100vh - 3.35rem - 5vh)",
            width: "20vw",
            minWidth: "15rem",
          });
        }
      });
  }, [selPlace.id, delReview, fav]);

  let data = tempdata;
  return (
    <>
      {!(Array.isArray(data) && data.length === 0) ? (
        <Side ref={sideRef}>
          <Exit onClick={() => dispatch(selectPlace({ x: 0, y: 0, id: 0 }))}>
            <StyledFont icon={faTimes}/>
          </Exit>
          <MenuInfo
            place={data.title}
            menu={data.menu}
            price={data.price}
            like={data.favirote}
            src={data.image}
            setFav={() => setFav(true)}
          />
          <PlaceInfo user={data.like} />
          <Review
            review={data.review}
            inReview={inReview}
            exitReview={exitReview}
            setDelete={() => setDelReview(true)}
          />
        </Side>
      ) : (
        ""
      )}
    </>
  );
}

const Exit = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  font-size: 1rem;
`;
const Side = styled.div`
  display: flex;
  border: 2px solid rgba(124, 183, 0, 0.5);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: absolute;
  margin: 0;
  top: 5vh;
  width: 0%;
  height: 0;
  overflow: auto;
  z-index: 2;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledFont = styled(FontAwesomeIcon)`
 color: ${theme.colors.grey};
 cursor: pointer;
`;