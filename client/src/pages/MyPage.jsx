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
${theme.device.mobile}{
  justify-content: flex-start;
  min-width:100%;
  min-height:auto;
}
 width:100%;
 max-width:100%;
 height:auto;
 min-height: 100vh;
 display: flex;
`;

const Box = styled(Container)`
${theme.device.change}{
 padding: 0 1rem;
}
 width: calc(100%-19.125rem);
 flex-direction: column;
 margin-bottom: 4.188rem;
`;
const Top = styled.div`
${theme.device.change}{
 margin-left:0;
 width: 100%;
 height:3rem;
}
${theme.device.mobile}{
  max-height:1rem;

}
 display: block;
 width: calc(100% - 7.313rem);
 height: 5rem;
 margin-left: 7.313rem;
 :after{
  ${theme.device.mobile}{
    height:0.5rem;
}
  ${theme.device.change}{
    max-height:0.85rem;
}
   content:"";
   display:block;
   height:0.938rem;
   background: ${theme.colors.lightgreen};
   border-radius: 1rem;
 }
`;
const Line= styled.div`
${theme.device.mobile}{
 height: 0.8rem;
}
 width: calc(100% - 7.313rem);
 height: 100%;
`;
