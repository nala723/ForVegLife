import React, {useEffect, useState} from "react";
import styled from "styled-components";
import DefaultModal from "./defaultmodal";
import theme from '../../styles/theme';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { withdraw,getgoogleToken} from "../../actions";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default function SignOut() {
    const userState = useSelector((state) => state.userReducer)
    const {
       accessToken, email, nickName, vegType, password, profileblob, isLogin 
    } = userState;
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
            dispatch(getgoogleToken({googleToken : ""}))
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
        },{
            email: email
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
        console.log(res,userwithDraw,email)

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
                          <p>계정을 삭제한 이후에는 회원님의 모든 콘텐츠와 활동 기록이 삭제됩니다. 삭제된 정보는 복구할 수 없으니 
                          신중하게 결정해주세요.</p>
                       </UserNm > 
                        <VegAnswer>
                        <input type="checkbox" onChange={handleChecked} /><p> 해당 내용을 모두 확인했으며, 회원탈퇴에 동의합니다.</p>
                        </VegAnswer>
                    </UserAlertBox>
                    <ButtonBox>
                        <button onClick={(e)=>handleClick(e)}>탈퇴</button>
                    </ButtonBox>
                     {(isOpen&&checked) ? <DefaultModal isOpen={isOpen} handleClick={(e)=>Handlewithdraw(e)} header="회원 탈퇴가 완료되었습니다.">그동안 forVegLife서비스를 이용해 주셔서 감사합니다.<br></br>
                                더욱더 노력하고 발전하는 forVegLife가 되겠습니다.</DefaultModal> : null}
                 </UserBottom>
           </UserContainer>
       </Bottom>   
     

  </Container>
)

}    


 const Container = styled.div`
 ${theme.device.change}{
    width: calc(100% - 0.5rem);
     margin-bottom:1rem;
     margin-left: 0.2rem;
     padding-right: 0;
     align-items: center;
 }
 ${theme.device.mobile}{
 margin-top: 0.2rem;
 margin-bottom:0;
}
    width: calc(100%-7.313rem);
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top:1rem;
    margin-left: 7.313rem;
    padding-right: 3.5rem;
`;
const Title = styled.div`
 ${theme.device.change}{
  padding-top: 1.4rem;
  
}
${theme.device.mobile}{
  font-size: 22px;
  height:4.5rem;
  padding-bottom:0;
  padding-top: 0.9rem;
}
    display:flex;
    width:100%;
    padding-top: 2.4rem;
    padding-bottom:8rem;
    font-size: ${theme.fonts.size.xl};
    color: ${theme.colors.darkgrey};
`; 
const Bottom = styled.div`
${theme.device.change}{
  margin: 0;
}
${theme.device.mobile}{
   align-items: flex-start;
   padding-top:1rem;
}
    display:flex;
    height: auto;
    max-height: 100%;
    margin-right: 3.5rem;
    justify-content: center;
    align-items: flex-start;

`; 
const UserContainer = styled.div`
${theme.device.tablet}{
   max-width:32.688rem;
   max-height:34.562rem;
   width:100%;
   height:100%;
}
${theme.device.mobile}{
    max-width:24rem;
    max-height:25rem;
}
   display:flex;
   flex-direction: column;
    width:32.688rem;
    min-height: 5rem;
    height: auto;
    
`; 
const UserTop = styled.div`
${theme.device.tablet}{
   max-width:32.688rem;
   width:auto;
}
 ${theme.device.mobile}{
   gap:0.5rem;
}
    height:auto;
    gap:1rem;
    display:flex;
   flex-direction: column;
    width:32.688rem;
`; 
const UserPhotoBox = styled.div`
${theme.device.tablet}{
    max-width:32.688rem;
    width:auto;
}
${theme.device.mobile}{
  height:30px;
  font-size:12px;
  padding-left:1rem;
 }
    height: 50px;
    gap:0;
    color: ${({theme})=>theme.colors.darkgrey};
    font-weight: 500;
`; 
const UserNmBox = styled(UserTop)`
${theme.device.mobile}{
    gap:1rem;
 }
 ${theme.device.mobileM}{
    padding: 1.5rem 1.8rem;
}

    background-color:  ${({theme})=>theme.colors.mypagecard}; 
    border-radius:1rem;
    padding: 2.3rem 3rem;
    justify-content: center;
    align-items:center;
    
  
`; 
const UserNm = styled.div`
${theme.device.mobileM}{
    font-size: 14px;  
    padding-top:0.5rem;

}
   width: 100%;
   height:100%;
   padding: 1rem 0 0.5rem 0;
   display:flex;
   flex-direction:column;
   align-items: center; 
   color: ${theme.colors.darkgrey};
    & p.checkq{
       margin-bottom: 1rem;
       font-weight: 500;
   }

   &.alert{
    font-size: 13px;
    line-height: 1rem;
     ${theme.device.mobile}{
        >p{
        font-size: 12px;
        text-align: left;
       }
  }

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


const UserBottom = styled.div`
${theme.device.tablet}{
    max-width:32.688rem;
    width:auto;
}

    flex:1;
    display:flex;
    flex-direction: column;
    width:32.688rem;
    min-height: 5rem;
    height: auto;
  
`; 
const UserAlertBox = styled(UserTop)`
${theme.device.mobile}{
    gap:0.2rem;
    padding: 0.5rem 1rem;
 }
    width: 100%;
    border-radius:1rem;
    padding: 1rem;
    justify-content: center;
    align-items:center;
`; 

const VegAnswer = styled.div`
${theme.device.mobile}{
   justify-content:flex-start;
   font-size: 13px;
 }
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
    ${theme.device.mobile}{
    width:6rem;
    margin-bottom:1rem;
} 
${theme.device.mobileM}{
    font-size:14px;
    width:5.5rem;
    height:2rem;
  }
       width: 7.375rem;
       height: 2.063rem;
       border: none;
       border-radius:0.6rem;
       background-color:${theme.colors.green};  
       color: white;
       font-size: ${theme.fonts.base};
       font-family: ${theme.fonts.logo};
       transition: all 0.3s ease-in-out;  
       :hover{
        transition: all 0.3s ease-in-out;   
        background-color:white;
        color: ${theme.colors.green}; 
        border: 1px solid ${theme.colors.green};  
        cursor: pointer;
       }
   }
`;
