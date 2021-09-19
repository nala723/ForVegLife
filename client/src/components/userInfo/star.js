import React, {useEffect, useState}from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getmyreview,newAccessToken } from "../../actions";
import axios from "axios";
import { dummydatas } from "./dummydatas";
import theme from "../../styles/theme";
import { keyframes } from "styled-components";
import {useScript} from '../../hooks/useScript';
require('dotenv').config();
const { Kakao } = window;

export default function Star() {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviewState = useSelector((state)=> state.myPlaceReducer.myReviews);
    const userState = useSelector((state)=> state.userReducer);
    const googleState = useSelector((state)=> state.googleReducer);
    const {googleToken} = googleState;
    const placeId = reviewState.placeId;
    const accessToken = userState.accessToken;
    const dummyReivews = dummydatas.reviews;
    const dummyStars = dummyReivews.filter((el,idx) => idx < 5 ).map(el => el.img);

    const [hasText, setHasText] = useState(false);
    const [inputValue, setInputValue] = useState(''); 
   // const [options, setOptions] = useState(dummyStars) 서버접속시 검색창의 별점 클릭시 조회, id로 필터링- 트리거
  // const [reivews, setReivews] = useState(reviewState); 
    const [options, setOptions] = useState(dummyStars);
    const [reivews, setReivews] = useState(dummyReivews);
    const [selected, setSelected] = useState(-1);
    const [isActive, setIsActive] = useState(false);

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
  
  if(googleToken){
    accessToken = googleToken;
  }
 
 
  // 카카오 
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.min.js");
  
  // kakao sdk 초기화하기
   // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
   useEffect(() => {
     if (status === "ready" && Kakao) {
         // 중복 initialization 방지
         if (!Kakao.isInitialized()) {
             // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
             Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);
             console.log('되나이거')
         }
     }
 }, [status]);

  // 유저가 즐찾한 것 목록 받아오기  
  
  const getReviewList= () => {
      axios
          .get(`${process.env.REACT_APP_SERVER_URL}/mypage/review`,{ 
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ` + accessToken
                },
            withCredentials: true
        })
        .then((res)=> {
            if(res.headers.accessToken){
                dispatch(newAccessToken({accessToken: res.headers.accessToken}));
            } 
             if(res.status === 200){ // review_star이 res.data.review_star인지 확인할것!!
                   dispatch(
                       getmyreview(  // 상태전달 
                           {
                               placeId: res.data.review_star.placeId,
                               title: res.data.review_star.title,
                               content: res.data.review_star.content,
                               star: res.data.review_star.star,
                               createdAt: res.data.review_star.createdAt,
                               reviewId: res.data.review_star.reviewId,
                            }
                       )
                    )
               
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

  // 모두 조회 버튼
  const handleAllview = () => {
    setReivews(dummyReivews);  
    setInputValue('');         /*서버 통신시 수정*/
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
    const dum = dummyReivews.filter(dum=> dum.img === clickedOption)// 검색하고 선택한 결과 조회
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
 
  const shareKakao = () => {
    // console.log('카카오되라 첫번쨰')
    // Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);  // 사용할 앱의 JavaScript 키 설정
    console.log('카카오되라')
    Kakao.Link.createDefaultButton({
      container: '#btnKakao', // 카카오공유버튼ID
      objectType: 'feed',
      content: {
        title: reivews.title, // 보여질 제목
        description: reivews.content, // 보여질 설명
        imageUrl: "devpad.tistory.com/", // 콘텐츠 URL
        link: {
          mobileWebUrl: "devpad.tistory.com/",
          webUrl: "devpad.tistory.com/"
        }
      }
    });
}



  const shareTwitter = () => {
    let sendText = reivews.title; // 전달할 텍스트
    let sendUrl = `http://localhost:4000/restaurant/${placeId}`; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  }

  const shareFacebook = () => {
    let sendUrl = `http://localhost:4000/restaurant/${placeId}`; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }
  
    return (
        <Container onClick={handleDropVisible} >
        <Title>
           내가 준 별점
        </Title>
       <Bottom>
         <SearchContainer hasText={hasText} onKeyUp={handleKeyUp}>
         <button onClick={handleAllview}> 전체 조회 </button>
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
                           <Card key={idx}>
                                <CardContent>
                                  <h4>{dum.title}</h4>
                                  <img src={dum.img} className="star"/>
                                  <div>{dum.content ? '...내 리뷰보기' : ""}</div>
                                </CardContent>
                               <CardSns>
                                 <img src="/image/kakaotalk.png" onClick={shareKakao} id="btnKakao"/>
                                 <img src="/image/facebook.png" onClick={shareFacebook}/>
                                 <img src="/image/twitter.png" onClick={shareTwitter}/>
                              </CardSns>
                        </Card>
                        )
                      })}
                 <GotoCard onClick={(e)=>gotomap(e)}>+<p></p>나의 장소 만들러가기</GotoCard>
           </CardBox>
       </Bottom>
  </Container>
)

}    

const transform = keyframes`
  0% {
    width:10rem;
  }
  
  10% {
    width:9rem;
  }

  100% {
    width:20rem;
  } // 안먹힘
`;

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
  flex-direction: row;
  position: relative;
  >button{
    margin-top: 2.5rem;
    margin-right: 2rem;
    width: 5.5rem;
    height:2.563rem;
    border-radius: 0.5rem;
    border: none;
    background-color: transparent;
    color: ${theme.colors.mapgrey};
    cursor: pointer;
    transition: all 0.5s ease;
     :hover {
       background-color: ${theme.colors.lightgreen};
       /* border: 2px solid var(--color-lightgreen); */
       transition: all 0.5s ease;
     }
    }
`;
const Search = styled.input`
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
      border:2px solid var(--color-lightgreen);
      outline:none;
      width:20rem;
      animation: ${transform} 0.8s ease-in-out;
  }
  &.autocomplete-input{
    width:20rem;
    animation:none;
  }
  :hover{
     border:2px solid var(--color-lightgreen);
      outline:none;
  }
`;

const DropDownContainer = styled.ul` 
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
   cursor: pointer;
   transition: all 0.3s ease;
    :hover{
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
      transform: translateY(-5%);
      transition: all 0.3s ease;
    }
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
    &.star{
      width:100%;
      height:100%;
      transform: scale(1.1); // 현재 안먹힘
    }
    :hover{
      box-shadow: none;
      transform: none;
    }
    >div{
      color:${theme.colors.mapgrey};
      font-size: 13px;
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
    justify-content: center;
    gap:5px;
    font-size: var(--font-size-lg);
    color: var(--color-darkgrey);
    cursor: pointer;
`;

