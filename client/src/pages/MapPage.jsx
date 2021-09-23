import React, { useEffect, useState } from "react";
import SearchPlace from "../components/map/search";
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
  let link = window.location.href.split("?")[1];
  useEffect(() => {
    if (link) {
      let temp = link.split("&");
      console.log(temp[0].split("=")[1]);
      dispatch(
        selectPlace({
          id: temp[0].split("=")[1],
          x: temp[2].split("=")[1],
          y: temp[1].split("=")[1],
        })
      );
    }
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
      {review || enroll ? "" : <Enroll onClick={inEnroll}> 장소 추가</Enroll>}
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
  height: 100%;
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
