import React, {useEffect, useState}from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getmyreview,newAccessToken,getgoogleToken } from "../../actions";
import axios from "axios";
import { dummydatas } from "./dummydatas";
import theme from "../../styles/theme";
import { keyframes } from "styled-components";
import ReactTooltip from 'react-tooltip'
import { TraceSpinner } from "react-spinners-kit";
import dotenv from 'dotenv';
dotenv.config();


export default function Star() {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviewState = useSelector((state)=> state.myPlaceReducer);
    const userState = useSelector((state)=> state.userReducer);
    const googleState = useSelector((state)=> state.googleReducer);
    const {googleToken} = googleState;
    // const placeId = reviewState.placeId;// 다시
    const accessToken = userState.accessToken;
    const dummyReivews = dummydatas.reviews;
    const dummyStars = dummyReivews.filter((el,idx) => idx < 5 ).map(el => el.img);
  
    const [hasText, setHasText] = useState(false);
    const [inputValue, setInputValue] = useState(''); 
   const [options, setOptions] = useState(dummyStars) //서버접속시 검색창의 별점 클릭시 조회, id로 필터링- 트리거
   const [reivews, setReivews] = useState(reviewState.myReviews); 
    const [selected, setSelected] = useState(-1);
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(true);
    let ReviewState = (reviewState.myReviews).length > 0 ? reviewState.myReviews: []
     
     //최초렌더링시- 
  useEffect(()=> {
    getReviewList()
  },[])

  // 검색창 텍스트 유무확인
  useEffect(() => {
    if (inputValue === '' || isActive) {
      setHasText(false); 
    }

    setIsActive(false)
   
  }, [inputValue,isActive]);
  
 

  let token
  if(googleToken){
    token = googleToken;
  }else{
    token = accessToken;
  }
 
//카카오
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
  script.async = true
  document.body.appendChild(script)
  
  return () => {
    document.body.removeChild(script)
  }
}, ['https://developers.kakao.com/sdk/js/kakao.min.js'])

  // 유저가 즐찾한 것 목록 받아오기  
  
  const getReviewList= () => {
    setLoading(true)
      axios
          .get(process.env.REACT_APP_SERVER_URL + '/mypage/review',{ 
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ` + token
                },
            withCredentials: true
        })
        .then((res)=> {
            if(res.headers.accessToken){
              if(googleToken){
                dispatch(getgoogleToken({accessToken: res.headers.accessToken}));
              }else{
              dispatch(newAccessToken({accessToken: res.headers.accessToken}))
              }
            } 
             if(res.status === 200){ 
                   dispatch(
                       getmyreview(  // 상태전달 
                               res.data.review_star
                         )
                       )
                     setReivews(res.data.review_star)
             }
             else{
                  history.push('/notfound');
             }
             setLoading(false) 
         })
         .catch(err => {
                console.log(err)
        })
  }

  // 모두 조회 버튼
  const handleAllview = () => {
    setReivews(ReviewState)  // 실제 
    setInputValue('');        
    setOptions(dummyStars);
  }
  
 // 다른 곳 클릭시 검색창 없어지게
  const handleDropVisible = (e) => { 
    e.preventDefault();
    setHasText(false);
  }

  // 별점 별 조회 - 인풋창
  const handleInputChange = (event) => {
    setHasText(!hasText) 

  };
  //검색창 입력 이벤트
 const handleClick = (e) => {
     e.preventDefault();
     setHasText(!hasText)
     setIsActive(true)
     setOptions(dummyStars);
     
 }

  const handleDropDownClick = (clickedOption) => {
    setInputValue(' ');
    const resultOptions = dummyStars.filter(
      (option) => option === clickedOption
    );
    setOptions(resultOptions);
    const reviewFilter = dummyReivews.filter((r)=>r.img === clickedOption).map((r)=> r.placeId)[0]
    const dum = ReviewState.filter(dum=> dum.star === reviewFilter)// 검색하고 선택한 결과 조회
    setReivews(dum);
    setIsActive(true);
 
  };


  const handleKeyUp = (event) => {
    if (event.getModifierState("Fn") || event.getModifierState("Hyper") || event.getModifierState("OS") || event.getModifierState("Super") || event.getModifierState("Win")) return; if (event.getModifierState("Control") + event.getModifierState("Alt") + event.getModifierState("Meta") > 1) return;
    if (hasText) {
      if (event.code === 'ArrowDown' && options.length - 1 > selected) {
        setSelected(selected + 1);
      }
      if (event.code === 'ArrowUp' && selected >= 0) {
        setSelected(selected - 1);
      }
      if (event.code === 'Enter' && selected >= 0) {
        handleDropDownClick(options[selected]);
        setSelected(-1);
      }
    }
  };

  


  // 장소등록하러 가기
  const gotomap = (e) => {
    e.preventDefault()
    history.push('/');
  }


  // sns 공유 핸들러
 
  const shareKakao = (el) => {
    if (window.Kakao) {
      const Kakao = window.Kakao;
      // 중복 initialization 방지
      if (!Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);
        console.log(Kakao.isInitialized());
      }

      console.log("카카오되라",el);
      Kakao.Link.sendDefault({
        objectType: 'location',
        address: `${el.title}`,
        addressTitle: `${el.title}`,
        content: {
          title: `${el.title}`,
          description: `${el.content}`,
          imageUrl:`https://forveglife.ml/restaurant/${el.placeId}`,
          link: {
            mobileWebUrl:`https://forveglife.ml/restaurant/${el.placeId}`,
            webUrl: `https://forveglife.ml/restaurant/${el.placeId}`,
          },
        },
        social: {
          likeCount: el.star,
          commentCount: reviewState.myReviews.length,
          sharedCount: 123,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: `https://forveglife.ml/restaurant/${el.placeId}`,
              webUrl: `https://forveglife.ml/restaurant/${el.placeId}`,
            },
          },
        ],
      });
    }
  };

  const shareTwitter = (el) => {
    let sendText = el.title; // 전달할 텍스트
    let sendUrl = `https://forveglife.ml/restaurant/${el.placeId}`; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  }

  const shareFacebook = (el) => {
    let sendUrl = `https://forveglife.ml/restaurant/${el.placeId}`; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }
  
  if(loading){
    return ( 
      < Loadingbox>
        <StyledSpinner primary size={80} frontColor="#E2E700" backColor="#E2832B" loading={loading} />
         </ Loadingbox>
        )
  }


    return (
        <Container onClick={handleDropVisible} >
        <Title>
           내가 준 별점
        </Title>
       <Bottom>
         <SearchContainer hasText={hasText} onKeyUp={handleKeyUp}>
         <button onClick={handleAllview}> <p>전체 조회</p> </button>
           <Search placeholder="별점 순 검색"
             className={inputValue? 'autocomplete-input' : ''}
             onChange={handleInputChange}
             onClick={handleClick}
             value={inputValue}
             url= {`${options.length !== dummyStars.length ? options[0] : null}`} // 찝찝한방식
            />
             {hasText ? (
                <DropDownContainer>
                {options.map((option, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleDropDownClick(option)}
                    className={selected === idx ? 'selected' : ''}
                  >
                   <img src={option} />
                  </li>
                ))}
              </DropDownContainer>
                  ): null}            
         </SearchContainer>
           <CardBox>
                 {reivews.map((dum,idx) => {
                        return (
                          <div key={idx}>
                           <Card data-tip data-for={dum.content ?`${idx}` : null}>
                                <CardContent >
                                  <h4>{dum.title}</h4>
                                  <img src={dum.star ? dummyReivews.filter((o)=> o.placeId === dum.star)[0].img: null} className="star"/>
                                  <div>{dum.content ? '.....' : ""}</div>
                                </CardContent>
                               <CardSns>
                                <img src="/image/kakaotalk.png" onClick={()=>shareKakao(dum)} />
                                 <img src="/image/facebook.png" onClick={()=>shareFacebook(dum)}/>
                                 <img src="/image/twitter.png" onClick={()=>shareTwitter(dum)}/>
                              </CardSns>
                        </Card>
                          {dum.content ? (
                                <StyledTooltip id={`${idx}`} place="top"  type="success" effect="solid" className="toolTip">
                                  {dum.content}
                                </StyledTooltip>)
                                :null}
                        </div>
                        )
                      })}
                 <GotoCard data-tip data-for="go" onClick={(e)=>gotomap(e)}>
                      <p>+</p>
                      <img src='/image/five-star.png'/>
                      <div>.....</div>
                   </GotoCard>
                    <StyledTooltip id="go" place="top"  type="success" effect="solid" className="toolTip">
                      별점을 등록해주세요
                    </StyledTooltip>
           </CardBox>
       </Bottom>
  </Container>
)

}    

const transform = (start,middle,end) => keyframes`
  0% {
    width:${start};
  }
  
  10% {
    width:${middle};
  }

  100% {
    width:${end};
  } 
`;

const Container = styled.div`
${theme.device.mobile}{
 margin-top: 0.3rem;
}
${theme.device.change}{
  padding: 0;
  margin-left:0.5rem;
}
    width: calc(100%-7.313rem);
    height:100%;
    display: flex;
    flex-direction: column;
    margin-top:1rem;
    margin-left: 7.313rem;
    padding-right: 3.5rem;
`;
const Title = styled.div`
${theme.device.mobile}{
  font-size: ${theme.fonts.size.llg};
  justify-content:center;
  padding-bottom:1rem;
}
 ${theme.device.change}{
  padding-top: 1.4rem;
  padding-bottom: 2rem;
}
    display:flex;
    width:100%;
    padding-top: 2.4rem;
    padding-bottom:3rem;
    font-size: var(--font-size-xl);
    font-style: var(--font-mypage);
    color: var(--color-darkgrey);
`; 
const Bottom = styled.div`
${theme.device.change}{
  margin-right:0.5rem;
}
    height: 100%;
    margin-right: 3.5rem;
    flex-direction: column;
    align-items: flex-start;
`; 
const SearchContainer = styled.div`
${theme.device.mobile}{
  height:5rem;
  
}

    width:100%;
   padding-bottom: 5rem;
   display: flex;
   justify-content: flex-end;
  flex-direction: row;
  position: relative;
  >button{
    ${theme.device.mobile}{
      margin: 0;
      margin-right: 0.8rem;
      width: 3rem;
      height:3rem;
      background-color: ${theme.colors.lightgreen};
      font-size: 10px;
       >p{
         width:70%;
         text-align:center;
       }
   }
    margin-top: 2.5rem;
    margin-right: 2rem;
    width: 5.5rem;
    height:2.563rem;
    border-radius: 0.5rem;
    border: none;
    background-color: transparent;
    color: ${theme.colors.mapgrey};
    cursor: pointer;
    transition: all 0.3s linear;
     :hover {
       background-color: ${theme.colors.lightgreen};
       transition: all 0.3s linear;
     }
    }
`;
const Search = styled.input`
${theme.device.mobile}{
  margin: 0;
  width:3rem;
  ::placeholder{
    color: transparent;
  }
  background-position: center;
  cursor: pointer;
}

${theme.device.change}{
  height: 2.8rem;
}
display:flex;
margin-top: 2.5rem;
width:10rem;
height:2.563rem;
color: ${({theme})=>theme.colors.darkgrey}; 
border: 1.5px solid var(--color-grey);
border-radius: 0.5rem;
background-image: url(${props => props.url || null}),
url("/image/search.svg");
background-repeat: no-repeat,no-repeat;  
background-position: 4% 50%, 96% 50%;
box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
:focus {
  ${theme.device.mobile}{
      background-position: 96% 50%;
      width: 18rem;
      animation: ${transform('3rem','2.5rem','18rem')} 0.8s ease-in-out;
      ::placeholder{
        color: ${theme.colors.mapgrey};
       }
    }
      border:2px solid var(--color-lightgreen);
      outline:none;
      width:20rem;
      animation: ${transform} 0.8s ease-in-out;
  }
  &.autocomplete-input{
    ${theme.device.mobile}{
      width: 18rem;
      background-position: 96% 50%;
    }
    width:20rem;
    animation:none;
  }
  :hover{
     border:2px solid var(--color-lightgreen);
      outline:none;
  }
`;

const DropDownContainer = styled.ul` 
  ${theme.device.mobile}{
      width: 17.5rem;
      top:43px;
    }
background-color: #ffffff;
display: block;
width:20rem;
position: absolute;
margin-left: auto;
margin-right: auto;
list-style-type: none;
margin-block-start: 0;
margin-block-end: 0;
margin-inline-start: 0px;
margin-inline-end: 0px;
padding-inline-start: 0px;
color: ${({theme})=>theme.colors.darkgrey}; 
top: 80px;
padding: 0.5rem 0;
border: none;
border-radius: 0 0 1rem 1rem;
box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
z-index: 3;

> li {
  padding: 0 1rem;
  &:hover {
    background-color:${theme.colors.lightgreen};
  }
  &.selected {
    background-color:${theme.colors.lightgreen}; 
  }
}
`;
const CardBox = styled.div`
${theme.device.change}{
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(16rem, 1fr));
  grid-auto-columns: minmax(14rem, 14rem);
  grid-auto-rows: minmax(16rem, 16rem);
  gap: 30px 22px;
}
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
  /* ${theme.device.change}{
    height:16rem;
  } */
   height: 14.313rem;
   display:flex;
   background-color: var(--color-mypagecard);
   border-radius: 0.5rem;
   flex-direction: column;
   align-items:center;
   cursor: pointer;
   transition: all 0.3s ease;
    :hover{
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }
`;

const CardContent = styled(Card)`
  ${theme.device.change}{
       /* margin: 0; */
    }
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
    >img{
    &.star{
      ${theme.device.change}{
        width:150px;
       height:30px;
    }
      width:112px;
      height:21px;
    }
  }
    :hover{
      box-shadow: none;
      transform: none;
    }
    >div{
      color:${theme.colors.mapgrey};
      font-size: 13px;
      letter-spacing: 3px;
      font-weight: 900;
      :hover{
        border-bottom: 1px solid ${theme.colors.mapgrey};
      }
    }
`;
const CardSns = styled(CardContent)`
   width:96%;
   margin-bottom:5px;
   flex:1.2;
   /* background-color: white; */
   color: var(--color-brown);
   font-size: var(--font-size-sm);
   flex-direction: row;
   gap:2rem;
   cursor: pointer;
   :hover{
      box-shadow: none;
    }
    >img{
      opacity:0.4;
      :hover{
        opacity:1;
      }
    }
`;
const GotoCard = styled(Card)`
    justify-content: flex-start;
    font-size: var(--font-size-lg);
    color: var(--color-darkgrey);
    cursor: pointer;
    padding-top:2.2rem;
    gap:1.6rem;
    flex:5;
     >p{
       color: var(--color-brown);
       font-weight:900;
     }
     >div{
       margin-top:1rem;
      color:${theme.colors.mapgrey};
      font-size: 13px;
      letter-spacing: 3px;
      font-weight: 900;
     }
     >img{
      ${theme.device.change}{
        width:150px;
       height:30px;
    }
  }
`;

const StyledTooltip = styled(ReactTooltip)`
   &.toolTip{
    ${theme.device.change}{
     max-width: 17rem;
     min-height:3rem;
     display: flex;
     align-items:center;
  }
      max-width: 12rem;
      min-height:2rem;
      line-height: 1rem;
      background-color: ${theme.colors.darkgrey};
      
      &.toolTip::after{
        border-top-color: ${theme.colors.darkgrey} !important;
       
  
      }
   
   }
 `; 
 const Loadingbox = styled.div`
 width: calc(100%-7.313rem);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;

`;
const StyledSpinner = styled(TraceSpinner)`
  
  
 `; 
