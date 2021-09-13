import React from "react";
import SearchPlace from "../components/map/search";
import SideBar from "../components/map/sidebar/index";
import styled from "styled-components";
import Login from "../components/user/login";
import Logout from "../components/user/logout";
import SignUp from "../components/user/sign-up";
import { useSelector, useDispatch } from "react-redux";

export default function MapPage() {
  const Center = useSelector((state) => state.MapCenter);

  return (
    <Temp>
      <SearchPlace />
      <SideBar select={Center}> </SideBar>
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
