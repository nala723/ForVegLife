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
  console.log(link);
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
  console.log(category);
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
  height: calc(100% - 3.125rem);
`;
const Enroll = styled.div`
  position: absolute;
  width: 6rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5rem;
  left: 5rem;
  color: white;
  z-index: 2;
  border-radius: 0.2rem;
  background-color: ${theme.colors.green};
`;
const Center = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
`;
