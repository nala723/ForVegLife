import React, { useEffect, useState } from "react";
import SearchPlace from "../components/map/search";
import SideBar from "../components/map/sidebar/index";
import styled from "styled-components";
import ReviewModal from "../components/map/review-modal";
import EnrollPlace from "../components/map/submit-modal";
import { useSelector, useDispatch } from "react-redux";
import theme from "../styles/theme";
import axios from "axios";

export default function MapPage(props) {
  const selPlace = useSelector((state) => state.selectPlace );
  const mapCenter = useSelector((state) => state.MapCenter );
  const [enroll, setEnroll] = useState(false)
  const [review, setReview] = useState(false)
  const [data, setData] = useState([])
  const exitEnroll = ()=>{
    setEnroll(false)
  }
  const inEnroll = ()=>{
    setEnroll(true)
  }
  const exitReview = ()=>{
    setReview(false)
  }
  const inReview = ()=>{
    setReview(true)
  }
  useEffect( ()=>{
    axios.get(`http://localhost/restaurant/category/vegetarian/${mapCenter.address}`,{
    }).then( res=>{
      console.log(res.data)
      setData(res.data)}
    ).catch( err=>
      setData([])
      )},
   [mapCenter.address]
  )
  console.log(data)
  return (
    <Temp>
      <SearchPlace selData={data}/>
      { review || enroll  ? "" : <Enroll onClick={inEnroll}> 장소 추가</Enroll> }
       {props.children}
      {selPlace.id !== 0 ? !review ? <SideBar inReview={inReview} select={Center} />  : <ReviewModal  exit={exitReview}/>: "" }
      {enroll ? <EnrollPlace  exit={exitEnroll} /> : ""}
    </Temp>
  );
}
const Temp = styled.div`
  position: relative;
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
border-radius: 0.2rem;
background-color: ${theme.colors.green};
`
const Center = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
`;
