import React from "react";
import styled from "styled-components";

export default function UpdateInfo() {
  
    return (
        <Container>
        <Title>
           나의 정보 수정
        </Title>
       <Bottom>
           <UserContainer>
               <UserTop>  
                   <UserPhotoBox >
                         
                       <UserPhoto>
                          <Camera src="/image/camera.svg"/>
                           <UserPic />
                       </UserPhoto>
                   </UserPhotoBox >
                   <UserNmBox>
                   </UserNmBox >
                </UserTop>
                 <UserBottom>
                 </UserBottom>
           </UserContainer>
       </Bottom>
  </Container>
)

}    

const Container = styled.div`
    width: calc(100%-7.313rem);
    height:100%;
    display: flex;
    flex-direction: column;
    margin-top:1rem;
    margin-left: 7.313rem;
    padding-right: 3.5rem;
`;
const Title = styled.div`
    display:flex;
    width:100%;
    padding-top: 2.4rem;
    padding-bottom:3rem;
    font-size: var(--font-size-xl);
    font-style: var(--font-mypage);
    color: var(--color-darkgrey);
`; 
const Bottom = styled.div`
    display:flex;
    height: 100%;
    margin-right: 3.5rem;
    justify-content: center;
    align-items: center;

`; 
const UserContainer = styled.div`
   display:flex;
   flex-direction: column;
    width:32.688rem;
    height: 45.313rem;
    border: 1px solid yellowgreen;
    align-items: center;
    
`; 
const UserTop = styled(UserContainer)`

    height: 18.438rem;
`; 
const UserPhotoBox = styled(UserTop)`
    
    height: 7.375rem;
    /* position:relative; 
    z-index:-1px; */
`; 
const Camera = styled.img`
   width: 45px;
   height: 45px;
   position: absolute; 
   z-index:999px;
   right:2px;
`;
const UserPhoto = styled(UserPhotoBox)`
   height: 7.375rem;
   width: 7.375rem;
   border-radius: 100%;
   display: flex;
   overflow: hidden;
   position:relative; 
   z-index:-1px;
   
`;
const UserPic = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color:  ${({theme})=>theme.colors.mypagecard}; 
`;
const UserNmBox = styled(UserTop)`
    height:inherit;
    width:inherit;
    margin: 3.5rem;
    
`; 



const UserBottom = styled(UserContainer)`
    height: inherit;
    background-color:  ${({theme})=>theme.colors.mypagecard}; 
    border-radius:1rem;
`; 