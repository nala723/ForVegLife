import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getmyfavorite,newAccessToken,deletemyfavorite } from "../../actions";
import axios from "axios";
import { dummydatas } from "./dummydatas";
import theme from "../../styles/theme";
import { keyframes } from "styled-components";
import {useScript} from '../../hooks/useScript';
require('dotenv').config();
const { Kakao } = window;


export default function Favorite() {
  const dispatch = useDispatch();
  const history = useHistory();
  const myfavState = useSelector((state)=> state.myPlaceReducer.myFavPlaces);
  const userState = useSelector((state)=> state.userReducer);
  const placeId = myfavState.placeId;
  const accessToken = userState.accessToken;
  const dummyplace = dummydatas.favorites;
  const dummyAdress = dummyplace.map(el => el.address);

  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // const [options, setOptions] = useState(myFavState.address)
  // const [places,setPlaces] = useState(myfavState); -- 검색 후 필터링 가능
  const [options, setOptions] = useState(dummyAdress);
  const [places, setPlaces] = useState(dummyplace);
  const [selected, setSelected] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  //최초렌더링시- 
  useEffect(()=> {
    getFavList()
  },[])


  // 검색창 텍스트 유무확인
  useEffect(() => {
    if (inputValue === '' || isActive) {
      setHasText(false); 
    }

    setIsActive(false)
   
  }, [inputValue,isActive]);
 
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
  
  const getFavList= () => {
      axios
          .get(`${process.env.REACT_APP_SERVER_URL}/mypage/like`,{ 
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
             if(res.status === 200){
                   dispatch(getmyfavorite({placeId: res.data.place_Id, title: res.data.title, pictureUrl: res.data.picture_url,address: res.data.address}))
                 // 상태전달 
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

  // 삭제
 const deleteFavList = (name) => {
   axios.
     delete(`${process.env.REACT_APP_SERVER_URL}/restaurant/${placeId}/dislike`,{ 
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
       if(res.status === 200){
            //갖고 있는 상태의 장소의 이름과 일치하는 것- 의 placeId
            let id = myfavState.filter((el)=> el.title === name)[0].placeId;
            dispatch(deletemyfavorite(id)) // 추후 보고 수정 객체형으로?
            getFavList() // 다시 렌더링 호출
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
    setPlaces(dummyplace);  
    setInputValue('');         /*서버 통신시 수정*/
  }
  
 // 다른 곳 클릭시 검색창 없어지게
  const handleDropVisible = (e) => { 
    e.preventDefault();
    setHasText(false);
  } 

  // 장소 별 검색 - 동 기준
  // 클릭하면- 드롭박스 식으로 밑으로 펼쳐짐 
  // 1. 정확한 주소 / 2. 동까지  /3. 시
  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.includes('\\')) return;

    // input에 텍스트가 있는지 없는지 확인하는 코드
    value ? setHasText(true) : setHasText(false);

    // updateText
    setInputValue(value);

    // dropdown을 위한 기능
    const filterRegex = new RegExp(value, 'i');
    const resultOptions = dummyAdress.filter((option) =>
      option.match(filterRegex)
    );
    setOptions(resultOptions);
    
  };

  const handleDropDownClick = (clickedOption) => {
    setInputValue(clickedOption);
    const resultOptions = dummyAdress.filter(
      (option) => option === clickedOption
    );
    setOptions(resultOptions);
    const dum = dummyplace.filter(dum=> dum.address === clickedOption)// 검색하고 선택한 결과 조회
    setPlaces(dum);
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
        title: places.title, // 보여질 제목
        description: places.address, // 보여질 설명
        imageUrl: "devpad.tistory.com/", // 콘텐츠 URL
        link: {
          mobileWebUrl: "devpad.tistory.com/",
          webUrl: "devpad.tistory.com/"
        }
      }
    });
}



  const shareTwitter = () => {
    let sendText = places.title; // 전달할 텍스트
    let sendUrl = `http://localhost:4000/restaurant/${placeId}`; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  }

  const shareFacebook = () => {
    let sendUrl = `http://localhost:4000/restaurant/${placeId}`; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }

  // 아직 아무장소도 등록하지 않았을 때, 핫플레이스(추천) 몇개 배치해둘 수도 있겠음.

  
    return (
           <Container onClick={handleDropVisible}>
                 <Title>
                    나의 즐겨찾기
                 </Title>
                <Bottom>
                  <SearchContainer hasText={hasText} onKeyUp={handleKeyUp}>
                    <button onClick={handleAllview}> 전체 조회 </button>
                    <Search placeholder="주소로 검색" 
                      className={inputValue? 'autocomplete-input' : ''}
                      onChange={handleInputChange}
                      value={inputValue}
                      />  
                       {hasText ? (
                          <DropDownContainer>
                          {options.map((option, idx) => (
                            <li
                              key={idx}
                              onClick={() => handleDropDownClick(option)}
                              className={selected === idx ? 'selected' : ''}
                            >
                              {option}
                            </li>
                          ))}
                        </DropDownContainer>
                            ): null}
                  </SearchContainer>
                    <CardBox>
                      {places.map((dum,idx) => {
                        return (
                           <Card key={idx}>
                            <CardImg src={dum.img}/>
                                <CardContent>
                                  <h4>{dum.title}</h4>
                                  <p>{dum.address}</p>
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
    width:32.063rem;
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
  background-image: url("/image/search.svg");
  background-repeat: no-repeat; 
  background-position: 96% 50%;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  :focus {
      border:2px solid var(--color-lightgreen);
      outline:none;
      width:32.063rem;
      animation: ${transform} 0.8s ease-in-out;
  }
  &.autocomplete-input{
    width:32.063rem;
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
width:32.063rem;
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
/* border:2px solid var(--color-lightgreen);
outline:none; */
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
const CardImg = styled.img`
   display:flex;
   width:100%;
   height:6.438rem;
   object-fit: cover;
   border-radius: 0.5rem 0.5rem 0 0;
     :hover{
       width:100%;
       /* transform: scale(1.1); */
       display:absolute;
       box-shadow: none;
       transform: none;
     }
`;
const CardContent = styled(Card)`
   text-align: center;
   justify-content: center;
   margin-bottom:12px;
   gap:0.8rem;
   flex:3;
     >h4{
         color: #5B220A;
         font-size: var(--font-size-base);
         font-weight: 500;
     }
     >p{
         color: var(--color-mapgrey);
         font-size: var(--font-size-sm);
     }
     :hover{
      box-shadow: none;
      transform: none;
    }
`;
const CardSns = styled(CardContent)`
   width:96%;
   margin-bottom:5px;
   /* border-radius: 0 0 0.5rem 0.5rem; */
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

