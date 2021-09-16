import React from "react";
import styled from "styled-components";

export default function Star() {
  
    return (
        <Container>
        <Title>
           내가 준 별점
        </Title>
       <Bottom>
         <SearchContainer>
           <Search placeholder="별점 순 검색하기">
               </Search>
         </SearchContainer>
           <CardBox>
               <Card>
                       <CardContent>
                         <h4>{`어느 Vegan 카페`}</h4>
                         <h1>{`★★★★★`}</h1>
                         <p>{`짱 맛나염!! 굿굿`}</p>
                       </CardContent>
                      <CardSns><img src="/image/kakaotalk.svg" />카카오로 공유하기</CardSns>
               </Card>
               <Card>
               </Card>
               <Card>
               </Card>
               <Card>
               </Card>
               <Card/>
               <Card/>
               <Card/>
               <GotoCard>+<p></p>나의 장소 만들러가기</GotoCard>
           </CardBox>
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
    height: 100%;
    margin-right: 3.5rem;
    flex-direction: column;
    align-items: flex-start;
`; 
const SearchContainer = styled.div`
    width:100%;
    padding-bottom: 5rem;
    display: flex;
    justify-content: flex-end;

`;
const Search = styled.input`
display:flex;
margin-top: 2.5rem;
width:32.063rem;
height:2.563rem;
color: ${({theme})=>theme.colors.darkgrey}; 
border: 1.5px solid var(--color-grey);
border-radius: 0.5rem;
background-image: url("/image/search.svg");
background-repeat: no-repeat; 
background-position: 96% 50%;
box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
:focus {
    border:2px solid var(--color-lightgreen);
    /* border-radius:25px; */
    outline:none;
    /* transition: all 0.3s ease-in-out; */
}
:hover{
   border:2px solid var(--color-lightgreen);
    /* border-radius:25px; */
    outline:none;
    /* transition: all 0.3s ease-in-out; */
}
`;

const CardBox = styled.div`
  display:grid;
  width:100%;
  min-height:40rem;
  height: auto;
  grid-template-columns: repeat(auto-fill,minmax(12.313rem,1fr)); 
  grid-template-rows: repeat(auto-fill,minmax(14.313rem,1fr)); 
  grid-auto-columns: minmax(12.313rem,12.313rem);
  grid-auto-rows: minmax(14.313rem,14.313rem);
  gap: 30px 15px;

`; 
const Card = styled.div`
   width:12.313rem;  
   height: 14.313rem;
   display:flex;
   background-color: var(--color-mypagecard);
   border-radius: 0.5rem;
   flex-direction: column;
   align-items:center;
`;

const CardContent = styled(Card)`
    text-align: center;
    justify-content: center;
    margin-top:30px;
    gap:1.4rem;
    flex:5;
    >h4{
    color: #5B220A;
    font-size: var(--font-size-base);
    font-weight: 500;
    }
    >h1{
    color: ${({theme})=>theme.colors.green}; 
    font-size: ${({theme})=>theme.fonts.size.llg}; 
    }
    >p{
    color: var(--color-mapgrey);
    font-size:  12px;
    /* margin-top:12px;   */
    }
`;
const CardSns = styled(CardContent)`
   width:96%;
   margin-bottom:5px;
   /* border-radius: 0 0 0.5rem 0.5rem; */
   flex:1.2;
   background-color: white;
   color: var(--color-brown);
   font-size: var(--font-size-sm);
   flex-direction: row;
   gap:0.5rem;
   cursor: pointer;
`;
const GotoCard = styled(Card)`
    justify-content: center;
    gap:5px;
    font-size: var(--font-size-lg);
    color: var(--color-darkgrey);
`;

