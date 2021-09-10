import react, { useEffect } from "react";
import styled from "styled-components";
import MenuInfo from "./menuInfo";
import PlaceInfo from "./placeinfo";
import Review from "./review";

export default function SideBar() {
  return (
    <Side>
      <MenuInfo />
      <PlaceInfo />
      <Review />
    </Side>
  );
}

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: absolute;
  top: 5vh;
  padding-top: 20px;
  width: 25%;
  min-width: 15rem;
  height: 90vh;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
