import React from "react";
import SearchPlace from "../components/map/search";
import SideBar from "../components/map/sidebar/index";
import styled from "styled-components";
import Login from "../components/user/login";
import Logout from "../components/user/logout";
import SignUp from "../components/user/sign-up";

export default function MapPage() {
  return (
    <Temp>
      <SearchPlace />
      <Center></Center>
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
