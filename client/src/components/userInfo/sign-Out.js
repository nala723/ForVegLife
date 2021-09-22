import React, {useEffect, useState} from "react";
import styled from "styled-components";
import DefaultModal from "./defaultmodal";
import theme from '../../styles/theme';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { withdraw} from "../../actions";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default function SignOut() {
    const userState = useSelector((state) => state.userReducer)
    const {
       accessToken, email, nickName, vegType, password, profileblob, isLogin 
    } = userState.user;
    const googleState = useSelector((state)=> state.googleReducer);
    const {googleToken} = googleState;
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpen,setIsOpen] = useState(false);
    const [userwithDraw,setUserWithDraw] = useState(false);
    const [checked,setIsChecked] = useState(false);

    useEffect(()=>{
        if(userwithDraw && (isOpen === false)){
            dispatch(withdraw())// 모달까지 완료 후 map페이지로 푸쉬하게 수정
            history.push('/')
          }

    },[isOpen])

    let token
    if(googleToken){
      token = googleToken;
    }else{
      token = accessToken;
    }

      //체크박스 체크여부
    const handleChecked = (e) => {
        e.preventDefault()
        setIsChecked(!checked);
       
    }
   

    const Handlewithdraw = (e) => {
        axios
          .delete(process.env.REACT_APP_SERVER_URL + `/sign/withdrawal`,{
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ` + token
                },
            withCredentials: true
        })
        .then((res)=> {
             if(res.status === 200){
                  setUserWithDraw(true);
                  handleClick(e)
             }
             else{
                  history.push('/notfound');
             }
            //  setIsLoding(false) 
         })
         .catch(err => {
                console.log(err)
        })
    }

   const handleClick = (e) => {
    if(!checked){
        return;
    }
    e.preventDefault()
       setIsOpen(!isOpen)
   }

  
  return(
    <Container>
    <Title>
       회원 탈퇴하기
    </Title>
   <Bottom>
   <UserContainer>
               <UserTop>  
                   <UserPhotoBox >
                      정말 떠나시는 건가요?<br></br>
                      한 번 더 생각해 보지 않으시겠어요?ㅠㅠ
                   </UserPhotoBox >
                   <UserNmBox>
                       <UserNm >
                       <p className="checkq">계정을 삭제하시려는 이유를 말씀해주세요. 서비스 개선에 중요 자료로 활용하겠습니다</p>
                           <UserContent>
                            <div><input type="checkbox"/><p>이용 빈도가 낮다</p></div>
                            <div><input type="checkbox"/><p>콘텐츠에 대한 불만</p></div>
                            <div><input type="checkbox"/><p>더 이상 채식에 흥미가 없다</p></div>
                            <div><input type="checkbox"/><p>기타</p></div>
                           </UserContent>
                       </UserNm >
                   </UserNmBox >
                </UserTop>
                 <UserBottom>
                    <UserAlertBox>
                       <UserNm className="alert">
                          <p>계정을 삭제한 이후에는 회원님의 모든 콘텐츠와 활동 기록이 삭제됩니다.</p><p> 삭제된 정보는 복구할 수 없으니 
                          신중하게 결정해주세요.</p>
                       </UserNm > 
                        <VegAnswer>
                        <input type="checkbox" onChange={handleChecked} /><p> 해당 내용을 모두 확인했으며, 회원탈퇴에 동의합니다.</p>
                        </VegAnswer>
                    </UserAlertBox>
                    <ButtonBox>
                        <button onClick={(e)=>handleClick(e)}>탈퇴</button>
                    </ButtonBox>
                     {isOpen ? <DefaultModal isOpen={isOpen} handleClick={(e)=>Handlewithdraw(e)} header="회원 탈퇴가 완료되었습니다.">그동안 forVegLife서비스를 이용해 주셔서 감사합니다.<br></br>
                                더욱더 노력하고 발전하는 forVegLife가 되겠습니다.</DefaultModal> : null}
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
    min-height: calc(100vh-);
    margin-right: 3.5rem;
    justify-content: center;
    align-items: center;

`; 
const UserContainer = styled.div`
   display:flex;
   flex-direction: column;
    width:32.688rem;
    min-height: 5rem;
    height: auto;
    
`; 
const UserTop = styled(UserContainer)`
   height:100%;
    gap:1rem;
`; 
const UserPhotoBox = styled.div`
    height: 50px;
    gap:0;
    font-family: var(--font-mypage);
    color: ${({theme})=>theme.colors.darkgrey};
    font-weight: 500;
`; 
const UserNmBox = styled(UserTop)`
    width: 100%;
    background-color:  ${({theme})=>theme.colors.mypagecard}; 
    border-radius:1rem;
    padding: 2.3rem 3rem;
    justify-content: center;
    align-items:center;
    height:100%;
  
`; 
const UserNm = styled.div`
   width: 100%;
   height:100%;
   padding: 1rem 0 0.5rem 0;
   display:flex;
   flex-direction:column;
   align-items: center; 
   color: ${({theme})=>theme.colors.darkgrey};
   font-family: var(--font-mypage);
    & p.checkq{
       margin-bottom: 1rem;
       font-weight: 500;
   }

   &.alert{
    align-items: flex-start;
    color:${({theme})=>theme.colors.red};
    gap:0.3rem;
   }
 
`; 

const UserContent = styled(UserNm)`
    width: 100%;
    flex-direction:column;
    align-items: flex-start;
    >h1{
       color: ${({theme})=>theme.colors.darkgrey}; 
       font-size: ${({theme})=>theme.fonts.size.base};
       font-weight: ${({theme})=>theme.fonts.weight.bold};
    }

   >div{
       display:flex;
       flex-direction: row;
       align-items: center;
       gap:0.5rem;
       margin-bottom:0.5rem;
   }
  
`;


const UserBottom = styled(UserContainer)`
    flex:1;
  
`; 
const UserAlertBox = styled(UserTop)`
    width: 100%;
    border-radius:1rem;
    padding: 2.3rem 1rem;
    justify-content: center;
    align-items:center;
`; 

const VegAnswer = styled.div`
  display:flex;
  width:100%;
  height: 10px;
  margin-bottom: 1rem;
  align-items:center;
   >p{
       color: ${({theme})=>theme.colors.grey};
      margin-left:0.5rem;
 
   }

`;

/* 버튼 */
const ButtonBox = styled.div`
  height:100%;
  width:100%;
  display: flex;
  justify-content: center;
  align-items:center;
   >button{
       width: 7.375rem;
       height: 2.063rem;
       border: none;
       border-radius:0.6rem;
       background-color:${({theme})=>theme.colors.green}; 
       color: white;
       font-size: ${({theme})=>theme.fonts.base};
       font-family: var(--font-logo);
       transition: all 0.3s ease-in-out;  
       :hover{
        transition: all 0.3s ease-in-out;   
        background-color:white;
        color: ${({theme})=>theme.colors.green}; 
        border: 1px solid ${({theme})=>theme.colors.green}; 
        cursor: pointer;
       }
   }
`;
