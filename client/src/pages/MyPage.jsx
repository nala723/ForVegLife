import React, {useEffect,useState} from "react";
import { Route } from 'react-router-dom';
import UserSideBar from '../components/userInfo/userSideBar';
import Favorite from '../components/userInfo/favorite';
import Star from '../components/userInfo/star';
import UpdateInfo from '../components/userInfo/updateInfo';
import SignOut from '../components/userInfo/sign-Out';
import styled from "styled-components";
import theme from "../styles/theme";

export default function MyPage() {
  const [sidebar, setSidebar] = useState(true);
     
 
    const showSidebar = () => {
        if(window.innerWidth <= 960) {
           setSidebar(false);
        } else {
           setSidebar(true);
        }
    };
    useEffect(() => {
      showSidebar();
    }, []) 

    window.addEventListener('resize', showSidebar); 



  return (
    <>
      <Container>
        {sidebar && <UserSideBar />}
        <Box>
          <Top>
            <Line></Line>
          </Top>
          <Route exact path="/mypage" render={() => <Favorite />} />
          <Route path="/mypage/star" component={Star} />
          <Route path="/mypage/updateinfo" component={UpdateInfo} />
          <Route path="/mypage/signout" component={SignOut} />
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
${theme.device.change}{
  justify-content: center;
}
 width:100%;
 max-width:100%;
 height:auto;
 min-height: 100vh;
 display: flex;
`;

const Box = styled(Container)`
 width: calc(100% - 4.188rem);
 flex-direction: column;
 
`;
const Top = styled.div`
${theme.device.change}{
 margin-left:4.2rem;
}

 display: block;
 width: calc(100% - 7.313rem);
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
 width: calc(100% - 7.313rem);
 height: 100%;
`;
