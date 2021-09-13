import axios from "axios";
import React from "react";
import UserSideBar from '../components/userInfo/userSideBar';
import Favorite from '../components/userInfo/favorite';
import Star from '../components/userInfo/star';
import UpdateInfo from '../components/userInfo/updateInfo';
import styled from "styled-components";

export default function MyPage() {
  //상태 값에 따라 다르게 렌더링?
  return (
    <>
      <Container >
        <UserSideBar />
        <Box>
         <Top>
           <Line></Line>
         </Top>
        {/* <Favorite />  */}
        <Star />
        {/* <UpdateInfo /> */}
        </Box>
      </ Container> 
    </>
  );
}


const Container = styled.div`
 width:100vw;
 height:auto;
 min-height: 100vh;
 display: flex;
`;

const Box = styled(Container)`
 width: calc(100%- 4.188rem);
 flex-direction: column;
 
`;
const Top = styled.div`
 direction: flex;
 width: calc(100%-7.313rem);
 height: 5rem;
 margin-left: 7.313rem;
 :after{
   content:"";
   display:block;
   height:0.938rem;
   background: var(--color-lightgreen);
   border-radius: 1rem;
 }
`;
const Line= styled.div`
 width: calc(100%-7.313rem);
 height: 100%;
`;