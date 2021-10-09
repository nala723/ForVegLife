import styled from "styled-components";
import { dummydatas } from "../components/userInfo/dummydatas";
import theme from "../styles/theme";
import ReactTooltip from 'react-tooltip'
import  {useEffect, useState} from 'react';
import { useHistory } from "react-router";
import { keyframes } from "styled-components";

export default function Tutorial() {
  const history = useHistory();
  const [Order,setOrder] = useState(-1);
  const [Up,setUp] = useState(false); 
  const toolTip = dummydatas.toolTips;

  useEffect(()=>{
    setOrder(0)
  },[])
   const handleStep = (e) => {
     e.preventDefault();
     setOrder(Order+1)
     console.log(Order);
     if(Order >= 6){
       history.push('/')
     }
   }
   const handleMove=(e,step)=>{
    e.preventDefault();
    if(step === 7){
      history.push('/')
    }
    setOrder(step)
    
   }

   const handleTutolist = (e) =>{
    e.preventDefault();
    setUp(!Up);
   }
 
    return (
     <>
      <Container >
        <Map>  
          <TopBox >
              <Enroll data-tip data-for='5' className={Order===5 && 'active'} onClick={(e)=>handleStep(e)}> 장소 추가</Enroll>
              <Searchbar data-tip data-for='0' className={Order===0 && 'active'} src="/image/searchbar.svg" onClick={(e)=>handleStep(e)} />
              <IconBox data-tip data-for='3' className={Order===3 && 'active'} onClick={(e)=>handleStep(e)}>
                <button>채식 타입</button>
                {dummydatas.veggieIcon.map((v,idx) => (
                  <img src={v.img} key={idx} alt={idx}/>))}
              </ IconBox >
          </TopBox>
          <MiddleBox>
              <MarkerTwo data-tip data-for='4' className={Order===4 && 'active'} src="/image/selectMarker.svg" onClick={(e)=>handleStep(e)}/>
              <Marker data-tip data-for='1' className={Order===1 && 'active'} src="/image/marker.svg" onClick={(e)=>handleStep(e)}/>
              <SubmitMdr data-tip data-for='6' className={Order===6 && 'active'} src="/image/장소등록모달.svg" onClick={(e)=>handleStep(e)}/>
          </MiddleBox>
          <BarBox >
              <Sidebar data-tip data-for='2' className={Order===2 && 'active'} src="/image/sidebar.svg" onClick={(e)=>handleStep(e)}/> 
              <Rightbar className={Up? 'up':''}> 
                <div className="titleBox" onClick={(e)=>handleTutolist(e)}>
                  <p>튜토리얼</p><img src="/image/anker-icon.svg" alt="anker"/>
                </div>
                <div className="listBox">
                  <ul>
                    <li>
                      <img src="/image/diamond-icon.svg" alt="icon"/><p onClick={(e)=>handleMove(e,0)}>장소 검색</p>
                    </li>
                    <li>
                    <img src="/image/diamond-icon.svg" alt="icon"/><p onClick={(e)=>handleMove(e,3)}>카테고리별 검색</p>
                    </li>
                    <li>
                    <img src="/image/diamond-icon.svg" alt="icon"/><p onClick={(e)=>handleMove(e,4)}>장소 등록</p>
                    </li>
                    <li>
                    <img src="/image/diamond-icon.svg" alt="icon"/><p onClick={(e)=>handleMove(e,7)}>튜토리얼 종료</p>
                    </li>
                  </ul>
                </div>
              </Rightbar> 
         </ BarBox >
         {toolTip.map((t,idx) => {
            return (
              <div>
                {Order === idx 
                  ?
                 <StyledTooltip 
                  id={(idx === 0 || idx === 3 ) ? `${idx}`: ''} 
                  place="bottom"  
                  type="success" 
                  effect="solid" 
                  className="active" 
                  onClick={(e)=>handleStep(e)}
                 >
                    {t.content}
                 </StyledTooltip>
                 : null}
                {Order === idx 
                  ?
                <SecondTooltip 
                  id={(idx === 1 || idx === 5 || idx=== 2 || idx ===4 ||  idx === 6)? `${idx}`: ''} 
                  place="right"  
                  type="success" 
                  effect="solid"  
                  className="active" 
                  onClick={(e)=>handleStep(e)}
                >
                   {t.content}
                </SecondTooltip>
                  : null}
           </div>
              )
           })
         }
        </Map>
       </ Container>
      </>
      
    );
  }
  
  const upside = keyframes`
  0% {
   bottom:-15rem;
  }
  100% {
    bottom:0rem;
  } 
`;

  const downside = keyframes`
  0% {
  bottom:0rem
  }
  100% {
    bottom:-15rem;
  } 
  `;



  const Container = styled.div`
      max-width:100%;
      width:100vw;
      height:auto;
      min-height: 94vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url('/image/map.png');
      background-repeat: no-repeat;
      object-fit: cover;
     
  `;
 const Map = styled.div`
     position: fixed;
     width:100%;
     min-height: 100%;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     background-color:rgba(0, 0, 0, 0.7);
     display: flex;
     flex-direction: column;

 `;

  const TopBox = styled.div`
   position: relative;
   min-width:100%;
   height: 3rem;
   top: 5.3rem;
   display: flex;
   justify-content: space-between;
   padding: 0 4rem 0 5rem;

  `;
 
 const Enroll = styled.div`
 position: absolute;
 left: 7rem;
 top: 2.23rem;
 width: 6rem;
 height: 2rem;
 display: flex;
 justify-content: center;
 align-items: center;
 color: white;
 border-radius: 0.3rem;
 background-color: ${theme.colors.green};
 opacity:0;

 &.active{
      opacity:1;
      cursor:pointer;
      z-index:5;
      transition: all 0.5s ease-in-out;
    }
`;

 const Searchbar = styled.img`
  position:absolute;
  display: flex;
   width:22.25rem;
   height:12.563rem;
   opacity:0;
   margin-left:42.5rem;
    &.active{
      opacity:1;
      z-index:999;
      cursor:pointer;
      transition: all 0.5s ease-in-out;
    }
 `;


const IconBox = styled.div`
  position:absolute;
  display:flex;
  width: 30rem;
  top:1.25rem;
  right:1.8rem;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  opacity:0;
  transition: all 0.5s ease-in-out;
  >img{
    height:3.5rem;
    width:3.5rem;
    border-radius: 100%;
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  >button{
  width: 6em;
  height: 1.625rem;
  font-size: 0.75rem;
  background-color: #b96619;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem; 
  color: white;
  margin-right:0.65rem;
  border: none;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  }
  &.active{
      opacity:1;
      >button,img{
        cursor:pointer;
      }
      
    }

`;
 
const MiddleBox = styled.div`
  width:100%;
  height:50rem;
  display: flex;
  padding-top: 10rem;
  align-items:center;
  justify-content: center;
 
`;


const Marker = styled.img`
   position: absolute;
   bottom:17rem;
   left:48.5rem;
   opacity:0;
   &.active{
      opacity:1;
       z-index:100;
      cursor:pointer;
      transition: all 0.5s ease-in-out;
    }
 `;

const MarkerTwo = styled(Marker)`
   bottom:23.6rem;
   left:46.6rem;
`;


const SubmitMdr = styled.img`
opacity: 0;
transform: translate(0%,15%);
&.active{
      opacity:1;
      cursor:pointer;
      z-index:500;
      transition: all 0.5s ease-in-out;
    }

`;

const BarBox = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

`;

const Sidebar = styled.img`
position: relative;
top:-580px; 
opacity: 0;
&.active{
      opacity:1;
      z-index:500;
      display: flex;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
    }

`;

const Rightbar = styled.div`
position: fixed;
display: flex;
flex-direction: column;
right:0;
bottom:-15rem;
z-index:500;
width:15.438rem;
height:20rem;
background-color:${theme.colors.green};
border-radius: 0.5rem 0.5rem 0 0;
animation: ${downside} 0.5s ease-in-out;
  >div {
    border-radius: 0.5rem 0.5rem 0 0;  
    display:flex;
      &.titleBox{
      width:100%;
      height:4.125rem;
      align-items: center;
      justify-content:space-between;
      color:white;
      font-weight:600;
      font-size: ${theme.fonts.size.lg};
      padding: 0 1.4rem;
      cursor:pointer;
    }
    &.listBox{
      width:100%;
      height:calc(100% - 4.125rem);
      flex-direction: column;
      justify-content: center;
      background-color:white;
       > ul {
         padding: 0 2rem;
         width:100%;
         height: 60%;
         display:flex;
         flex-direction: column;
         gap:1.5rem;
         align-items: left;
         justify-content: center;
          > li{
            width:100%;
             color: ${theme.colors.mapgrey};
             font-weight:450;
             display:flex;
             justify-content: space-between;
             gap:4rem;
             >img{
              width:11px;
             }
             >p{
               cursor:pointer;
               :hover{
                color: ${theme.colors.grey};
               }
             }
          }
       }
    }
  }
  &.up{
      bottom:0;
      animation: ${upside} 0.5s ease-in-out;
    }
`;



const StyledTooltip = styled(ReactTooltip)`
    &.active{
        max-width: 26.313rem;
        min-height:9rem;
        line-height:1.5rem;
        background-color: ${theme.colors.green};
        font-size: ${theme.fonts.size.lg};
        font-weight:500;
        display: flex;
        align-items: center;
        text-align: center;
      
        &.active::after{
        border-color: ${theme.colors.green} transparent !important;
      } 
   }
 
 `; 
 const SecondTooltip = styled(ReactTooltip)`
 &.active{
     max-width: 26.313rem;
     min-height:9rem;
     line-height:1.5rem;
     background-color: ${theme.colors.green};
     font-size: ${theme.fonts.size.lg};
     font-weight:500;
     display: flex;
     align-items: center;
     text-align: center;
   
     &.active::after{ 
     border-color: transparent ${theme.colors.green} !important;
  }
 }   

`; 