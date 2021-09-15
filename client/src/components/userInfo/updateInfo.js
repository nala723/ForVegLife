import React, {useState} from "react";
import styled from "styled-components";
import DefaultModal from "./defaultmodal";
import theme from "../../styles/theme";

export default function UpdateInfo() {
    const [isOpen,setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
   
    const veggieIcon = [
      {   
            img :  '/image/abocado.svg',
            name : '비건'
       },
       {   
        img :  '/image/cheese.svg',
        name : '오보'
       },
       {   
        img :   '/image/egg.svg',
        name : '락토'
       },
       {   
        img :   '/image/eggcheese.svg',
        name : '락토오보' 
       },
       {   
        img :   '/image/fish.svg',
        name : '페스코'
       },
    ]

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
                       <UserNm > 
                            <UserIcon src="/image/userIcon.svg"/>
                            <UserContent>
                                <p>username</p>  
                              <h1> {`Kimusername`} </h1>
                           </UserContent>
                        </UserNm >
                       <UserNm >
                           <UserIcon src="/image/email.svg"/>
                           <UserContent>
                               <p>e-mail</p>
                             <h1> {`hahihuheho@gmail.com`}</h1> 
                           </UserContent>
                       </UserNm >
                   </UserNmBox >
                </UserTop>
                 <UserBottom>
                 <UserNmBox primary >
                    <UserNm primary> 
                            <UserIcon src="/image/lock.svg" primary/>
                            <UserContent >
                                <p>new PW</p> 
                              <PwContainer placeholder="새 비밀번호를 입력해주세요"/>
                           </UserContent>
                        </UserNm >
                       <UserNm >
                           <UserIcon src="/image/lock.svg" primary/>
                           <UserContent>
                               <p>new PW</p>
                             <PwContainer placeholder="새 비밀번호를 재입력해주세요"/>
                           </UserContent>
                       </UserNm >
                    </UserNmBox>
                    <VegAnswer>
                       <p> 당신의 채식 타입을 선택해 주세요.</p>
                       <VegIconBox>
                           <VegImgBox>
                       {veggieIcon.map(veg=>{
                           return (
                             <div>
                                <VegImg src={veg.img} />
                                <p classname="p">{veg.name}</p>
                             </div>
                             )
                          })
                         } 
                        </VegImgBox>
                    </VegIconBox>
                    </VegAnswer>
                    <ButtonBox>
                        <button >수정</button>
                    </ButtonBox>
                         {isOpen ? <DefaultModal isOpen={isOpen} handleClick={handleClick} header="회원정보 수정이 완료되었습니다.">
                     앞으로도 계속 forVegLife 안에서 건강한 life 누리세요</DefaultModal> : null}
                    
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
    /* border: 1px solid yellowgreen; */
    align-items: center;
    
`; 
const UserTop = styled(UserContainer)`
    
    height: 18.438rem;
`; 
const UserPhotoBox = styled(UserTop)`
    height: 7.375rem;
    position:relative; 
`; 
const Camera = styled.img` //처리
   width: 45px;
   height: 45px;
   position: absolute; 
   z-index:999px;
   bottom: 5px;
   right:195px;
   cursor: pointer;
`;
const UserPhoto = styled(UserPhotoBox)`
   height: 7.375rem;
   width: 7.375rem;
   border-radius: 100%;
   display: flex;
   overflow: hidden;
   position: static;
   z-index:-1px;
   
`;
const UserPic = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color:  ${({theme})=>theme.colors.mypagecard}; 
`;
const UserNmBox = styled(UserTop)`
    width: 100%;
    height:11.5rem;
    padding: ${props => props.primary ? '2.3rem 2rem' : '2.3rem 3rem'};
    justify-content: center;
    align-items:center;
`; 
const UserNm = styled.div`
   width: 100%;
   height:${props => props.primary ? '11.688rem' : '100%' };
   display:flex;
   flex-direction:row;
   align-items: center;

`; 
const UserIcon = styled.img`
   margin-right: 1rem;
   margin-left:${props => props.primary ? '1rem' : '' };
  
`; 
const UserContent = styled(UserNm)`
    width: 100%;
    justify-content: space-between;
    >h1{
       color: ${({theme})=>theme.colors.darkgrey}; 
       font-size: ${({theme})=>theme.fonts.size.base};
       font-weight: ${({theme})=>theme.fonts.weight.bold};
    }
   >p{  
       font-size:14px;
        color: ${({theme})=>theme.colors.mapgrey}; 
        font-family: var(--font-button);
        font-weight: 600;
    }

`;


const UserBottom = styled(UserContainer)`
    height: inherit;
    background-color:  ${({theme})=>theme.colors.mypagecard}; 
    border-radius:1rem;
`; 

const PwContainer = styled.input.attrs(props=>({
    type:'text',

}))` // input으로 변경
  width:13rem;
  height:2.875rem;
  background-color:white;
  border-radius:0.6rem;
  text-align:center;
  display:flex;
  justify-content: center;
  border:none;
  color: ${({theme})=>theme.colors.darkgrey}; 
  font-size: ${({theme})=>theme.fonts.size.base};
  ::placeholder{
      color: ${({theme})=>theme.colors.mapgrey}; 
      font-size:${({theme})=>theme.fonts.size.sm}; 
  }
  :focus {
     /* outline:2px solid #d50000; input박스 클릭시 나오는 테두리 색 변경*/
      outline:none;
  }
`;

const VegAnswer = styled.div`
  display:flex;
  flex-direction: column;
 
  width:100%;
   >p{
       color:  ${({theme})=>theme.colors.green};
      margin-left:2.5rem;
   }

`;
const VegIconBox = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  height:8.125rem;
  justify-content: flex-end;
  align-items:center;
  gap: 1rem;
  padding: 0 2rem;

       
`;
const VegImgBox = styled.div`
  width:90%;
  display:flex;
  justify-content: space-between;
  >div{
      >p{  
            color: ${({theme})=>theme.colors.mapgrey}; //고치기 색..
        }
  }
   
`;

const VegImg = styled.img`
  height:50px;
  width:50px;
  margin-bottom:0.6rem; 
  :hover{
       cursor:pointer;
       
       border-radius: 100%; //추후수정?
       box-shadow:  8px 8px 16px rgba(0, 0, 0, 0.2);
   }
`;
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

