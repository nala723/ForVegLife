import React from "react";
import SearchPlace from "../components/map/search";
import SideBar from "../components/map/sidebar/index";
import styled from "styled-components";
import Login from "../components/user/login";
import Logout from "../components/user/logout";
import SignUp from "../components/user/sign-up";
import { useSelector, useDispatch } from "react-redux";

export default function MapPage(props) {
  const selPlace = useSelector((state) => state.selectPlace );
  console.log(selPlace)
  console.log(selPlace)
  return (
    <Temp>
      <SearchPlace />
      {props.children}
      {selPlace.x !== 0 ? <SideBar select={Center}> </SideBar> : "" }
    </Temp>
  );
}
const Temp = styled.div`
  position: relative;
`;

const Center = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
`;
