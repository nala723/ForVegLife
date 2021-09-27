import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {Buffer} from 'buffer';
import { TraceSpinner } from "react-spinners-kit";


export default function UserSideBar() {
  const userState = useSelector((state)=> state)
  const { email,nickName,profileblob} = userState.userReducer;
  const [loading, setLoading] = useState(true);
    
   
  useEffect(()=>{
    setLoading(true);
    if(profileblob !== null){
      setLoading(false);
    }
  },[])


    // 프로필 이미지 설정 
    let profileIMG;
    if (profileblob === null || Object.keys(profileblob).length === 0) {
      profileIMG = "/image/bros_blank.jpg";
    } else {
      if (typeof(profileblob) === "string") {
        profileIMG = profileblob;
      } else {
        profileIMG =
          "data:image/png;base64, " +
          Buffer(profileblob, "binary").toString("base64");
      }
    }
  
    if(loading){
      return ( 
        < Loadingbox>
          <StyledSpinner primary size={80} frontColor="#E2E700" backColor="#E2832B" loading={loading} />
           </ Loadingbox>
          )
    }
 return(
     <Sidebar>
        <Container>
            <Top>
                <UserBox>
                    <Pic src={profileIMG}></Pic>
                </UserBox>
                <TextBox>
                   <UserName>
                       {nickName ? nickName : 'Kimusername'}
                   </UserName>
                   <UserEmail>
                       {email ? email : `hahihuhe3@gmail.com`}
                   </UserEmail>
               </TextBox>
            </Top>
            <Bottom>
                <BottomBox>
                    <Title>
                         <p>My Place</p>
                        <Content>
                        <Link to="/mypage"> 나의 즐겨찾기</Link>
                        </Content>
                        <Content>
                        <Link to="/mypage/star">내가 준 별점</Link>
                        </Content>
                    </Title>
                </BottomBox>
                <BottomBox> 
                <Title primary>
                         <p>My Info</p>
                        <Content>
                          <Link to="/mypage/updateinfo"> 나의 정보 수정</Link>
                        </Content>
                        <Content>
                          <Link to="/mypage/signout">회원 탈퇴하기</Link>
                        </Content>
                    </Title>
                </BottomBox>
            </Bottom>
        </Container>
     </Sidebar>
 
 )

}    

const Sidebar = styled.div`
 width:19.125rem;
 height:auto;
 min-height: 100vh;
 display: flex;
 flex-direction: column;
 margin: 4.188rem 0 4.188rem  2.375rem;
 background-color: var(--color-mypagecard);
 border: 2.5px solid var(--color-lightgreen);
 border-radius: 0.6rem;
 align-items: center;
 position: sticky;
`;

const Container =styled.div`
 width: 11rem;
 padding-top: 2rem;
 height: 30.9rem;
 display: flex;
 flex-direction: column;
`;
const Top =styled.div`
  height: 15rem;
  border-bottom: 2px solid var(--color-grey);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserBox = styled.div`
   width: 7.063rem;
   height: 7.063rem;
   border-radius: 100%;
   display: flex;
   overflow: hidden;
`;
const Pic = styled.img`
   width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: white;
`;

const TextBox = styled.div`
    width: 100%;
    height: 5.2rem;
    padding-top: 1.625rem; // 나중에 수정- 원의 크기 변하지 않는방향으로.
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: var(--color-darkgrey);
    font-style: var(--font-mypage);
    font-weight: var(--font-weight-bold)
`;

const UserName = styled.p`
    width: inherit;
    height: 100%;
    word-break:break-all;
    font-size: var(--font-size-lg);
   
`;
const UserEmail = styled.p`
    width: inherit;
    height: 100%;
    word-break:break-all;
`;

const Bottom = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 1.625rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
     padding: 0 2.3rem 0 2.3rem;
   
`;
const BottomBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.ul`
     width: 100%;
     height: 100%;
     font-size: var(--font-size-lg);
     font-weight: var(--font-weight-bold);
     display: flex;
     flex-direction: column;
     color: #5B220A;
     letter-spacing: 1px;
      gap:0.6rem;
       >p{
          margin-bottom: 0.7rem;
       }
`;
const Content = styled.li`
     width: 100%;
     height:20px;
     font-size: var(--font-size-base);
     font-weight: 500;
     color: var(--color-brown);
     letter-spacing: 0;
     /* flex:1; */
     :hover{
        color:  var(--color-grey);
     }
`;

const Loadingbox = styled.div`
  width:19.125rem; 
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;

`;
const StyledSpinner = styled(TraceSpinner)`
  
  
 `; 