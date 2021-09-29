import React, { useEffect, useState, useRef } from "react";
import SearchPlace from "../components/map/search";
import { useHistory } from "react-router";
import SideBar from "../components/map/sidebar/index";
import styled from "styled-components";
import ReviewModal from "../components/map/review-modal";
import EnrollPlace from "../components/map/submit-modal";
import { useSelector, useDispatch } from "react-redux";
import { selectPlace } from "../actions/index";
import theme from "../styles/theme";
import axios from "axios";

export default function MapPage(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const history = useHistory("/");
  let link = window.location.href.split("//");
  link = link[1].split("/")[2];

  useEffect(() => {
    if (link) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/restaurant/${link}`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          dispatch(
            selectPlace({ x: res.data[0].lng, y: res.data[0].lat, id: link })
          );
        });
    }
    history.push("/");
  }, []);
  const selPlace = useSelector((state) => state.selectPlace);
  const mapCenter = useSelector((state) => state.MapCenter);
  const [enroll, setEnroll] = useState(false);
  const [review, setReview] = useState(false);
  const [category, setCategory] = useState("페스코");
  const changeCategory = (name) => {
    setCategory(name);
  };
  const [data, setData] = useState([]);
  const exitEnroll = () => {
    setEnroll(false);
  };
  const inEnroll = () => {
    setEnroll(true);
  };
  const exitReview = () => {
    setReview(false);
  };
  const inReview = () => {
    setReview(true);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/restaurant/category/${category}/${mapCenter.address}`,
        {}
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setData([]));
  }, [mapCenter.address, category]);

  return (
    <Temp>
      <SearchPlace selData={data} setCategory={changeCategory} />
      {user.isLogin ? (
        review || enroll ? (
          ""
        ) : (
          <Enroll onClick={inEnroll}> 장소 추가</Enroll>
        )
      ) : (
        ""
      )}
      {props.children}
      {selPlace.id !== 0 ? (
        !review ? (
          <SideBar inReview={inReview} select={Center} />
        ) : (
          <ReviewModal exit={exitReview} />
        )
      ) : (
        ""
      )}
      {enroll ? <EnrollPlace exit={exitEnroll} /> : ""}
    </Temp>
  );
}
const Temp = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 3.35rem);
`;
const Enroll = styled.div`
  ${theme.device.tablet} {
    width: 3rem;
    font-size: ${theme.fonts.size.sm};
  }
  ${theme.device.mobileS} {
    width: 3rem;
    font-size: ${theme.fonts.size.sm};
    left: 2%;
  }
  position: absolute;
  width: 6rem;
  height: 2rem;
  font-size: ${theme.fonts.size.base};
  font-family: ${theme.fonts.button};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 4rem;
  left: 10%;
  color: white;
  z-index: 2;
  border-radius: 0.3rem;
  background-color: ${theme.colors.green};
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
`;
const Center = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
`;
