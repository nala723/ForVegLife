import axios from "axios";
import React from "react";
import UserSideBar from '../components/userInfo/userSideBar';
import Favorite from '../components/userInfo/favorite';
import Star from '../components/userInfo/star';
import UpdateInfo from '../components/userInfo/updateInfo';
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

export default function MyPage() {
  //상태 값에 따라 다르게 렌더링?
  return (
    <>
    <ThemeProvider theme={theme}>
      <Container >
        <UserSideBar />

        <Favorite /> 
      </ Container> 
     </ThemeProvider>
    </>
  );
}


const Container = styled.div`
 width:100vw;
 height:auto;
 min-height: 100vh;
 display: flex;
`;

// const Box = styled.div`
//  width:100vw;
//  height:auto;
//  min-height: 100vh;
//  display: flex;
// `;