import axios from "axios";
import React from "react"
import { Route } from 'react-router-dom';
import UserSideBar from '../components/userInfo/userSideBar';
import Favorite from '../components/userInfo/favorite';
import Star from '../components/userInfo/star';
import UpdateInfo from '../components/userInfo/updateInfo';
import SignOut from '../components/userInfo/sign-Out';
import styled from "styled-components";

export default function MyPage() {
 
  return (
    <>
      <Container >
        <UserSideBar />
        <Box>
         <Top>
           <Line></Line>
         </Top>
         <Route exact path="/mypage" render={()=> <Favorite />}/>
         <Route path="/mypage/star" component={Star} />
         <Route path="/mypage/updateinfo" component={UpdateInfo} />
         <Route path="/mypage/signout" component={SignOut} />
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

// <Route path="/mypage/star">
// <Star />
// </Route>
// <Route path="/mypage/updateinfo">
// <UpdateInfo />
// </Route>
// <Route path="/mypage/sign-out">
// <SignOut/>
// </Route>
{/* <Route path="/mypage/star">
<Star />
</Route>
<Route path="/mypage/updateinfo">
<UpdateInfo />
</Route>
<Route path="/mypage/sign-out">
<SignOut/>
</Route>
import SignOut from "../components/userInfo/sign-Out"; */}