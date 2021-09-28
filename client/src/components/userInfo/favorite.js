import React, {useState, useEffect }from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getmyfavorite,newAccessToken,deletemyfavorite,getgoogleToken} from "../../actions";
import axios from "axios";
import { dummydatas } from "./dummydatas";
import theme from "../../styles/theme";
import { keyframes } from "styled-components";
import { TraceSpinner } from "react-spinners-kit";
import dotenv from 'dotenv';
dotenv.config();

export default function Favorite() {
  const dispatch = useDispatch();
  const history = useHistory();
  const myfavState = useSelector((state)=> state.myPlaceReducer);
  const userState = useSelector((state)=> state.userReducer);
  const googleState = useSelector((state)=> state.googleReducer);
  const {googleToken} = googleState;
  // const placeId = myfavState.placeId;
  const accessToken = userState.accessToken;
  const dummyplace = dummydatas.favorites; //더미용
  const dummyAdress = dummyplace.map(el => el.address);
  let PlaceState = myfavState.myFavPlaces.length !== 0 ? myfavState.myFavPlaces : [];
  let PlaceAdress = (PlaceState !== undefined) ? PlaceState.map(el => el.address) : [];
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(PlaceAdress) // 즐찾 없는 유저도 있을수 있으므로 초기값
  const [places,setPlaces] = useState(PlaceState);
  const [selected, setSelected] = useState(-1);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recommend,setRecommend] = useState(dummyplace.slice(0,4));// 추후수정
  const {nickName} = userState;
  


  //최초렌더링시- 
  useEffect(()=> {
    // getRecommendation()
     getFavList()
  },[])
  console.log(myfavState,myfavState.myFavPlaces,'되라') //아무것도 저장 안했을시 처리
 
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
 
 // 추천 식당 받기

 const getRecommendation = () => {
   setLoading(true)
        axios
        .get(process.env.REACT_APP_SERVER_URL + '/restaurant/recommendation',{ 
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
              
                if((res.data.data).length === 4){
                let recommendAr = res.data.data   
                setRecommend(recommendAr)  //--상태값 알아서 변경되는지 확인
                getFavList()
                }
                
            }
            else{
                history.push('/notfound');
            }
          console.log(res.data)
            setLoading(false) 
        })
        .catch(err => {
              console.log(err)
              
      })

 }


  // 유저가 즐찾한 것 목록 받아오기  
  
  const getFavList= () => {
     setLoading(true)
      axios
          .get(process.env.REACT_APP_SERVER_URL + '/mypage/like',{ 
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
                
                  // if((res.data.place).length > 0){
                   dispatch(getmyfavorite(res.data.place))
                   setPlaces(res.data.place)
                  // }
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

  // 삭제
 const deleteFavList = (e,place_id) => {
   e.preventDefault();
   setLoading(true)
   axios.
     delete(process.env.REACT_APP_SERVER_URL + `/restaurant/${place_id}/dislike`,{ 
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
            //갖고 있는 상태의 장소의 이름과 일치하는 것- 의 placeId
            let id = places.filter((el)=> el.place_id === place_id)[0]
            dispatch(deletemyfavorite(id)) // 추후 보고 수정 객체형으로?
            getFavList() // 다시 렌더링 호출
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
    setLoading(true)
    setPlaces(PlaceState)   // 실제구현   
    //  setPlaces(dummyplace);  //임시 더미
    setInputValue('');
    setLoading(false)         
  }
  
 // 다른 곳 클릭시 검색창 없어지게
  const handleDropVisible = (e) => { 
    e.preventDefault();
    setHasText(false);
  } 

  // 장소 별 검색 - 동 기준
  // 클릭하면- 드롭박스 식으로 밑으로 펼쳐짐 
  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.includes('\\')) return;

    // input에 텍스트가 있는지 없는지 확인하는 코드
    value ? setHasText(true) : setHasText(false);

    // updateText
    setInputValue(value);

    // dropdown을 위한 기능
    const filterRegex = new RegExp(value, 'i');

    let resultOptions
    if(PlaceAdress) {
      resultOptions = PlaceAdress.filter((option) =>
      option.match(filterRegex)
    );
    }  // 실제구현
  
    // const resultOptions = dummyAdress.filter((option) =>
    //   option.match(filterRegex)
    // );                                     // 임시더미
    setOptions(resultOptions);
    
  };

  const handleDropDownClick = (clickedOption) => {
    setInputValue(clickedOption);
    let resultOptions  

    // 실제구현
    if(PlaceAdress) {
      resultOptions  = PlaceAdress.filter(
        (option) => option === clickedOption
      );

    }  

    // 임시더미 *
    // resultOptions  = dummyAdress.filter(
    //   (option) => option === clickedOption
    // );                                          
    setOptions(resultOptions);
    const dum = PlaceState.filter(dum=> dum.address === clickedOption)// 검색하고 선택한 결과 조회
    // const dum = dummyplace.filter(dum=> dum.address === clickedOption)  //  임시더미 *
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
 
  const shareKakao = (el) => {
    if (window.Kakao) {
      const Kakao = window.Kakao
         // 중복 initialization 방지
         if (!Kakao.isInitialized()) {
          // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
          Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY)
          console.log(Kakao.isInitialized())
        }
  
    console.log('카카오되라')
    Kakao.Link.createDefaultButton({
      container: '#btnKakao', // 카카오공유버튼ID
      objectType: 'feed',
      content: {
        title: el.title, // 보여질 제목
        description: el.address, // 보여질 설명
        imageUrl: `http://localhost:3000/restaurant/${el.placeId}`, // 콘텐츠 URL
        link: {
          mobileWebUrl: "devpad.tistory.com/",
          webUrl: "devpad.tistory.com/"
        }
      }
    });
  }

  }

  const shareTwitter = (el) => {
    let sendText = el.title; // 전달할 텍스트
    let sendUrl = `http://localhost:3000/restaurant/${el.placeId}`; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  }

  const shareFacebook = (el) => {
    let sendUrl = `http://localhost:3000/restaurant/${el.placeId}`; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }

  // 아직 아무장소도 등록하지 않았을 때, 핫플레이스(추천) 몇개 배치해둘 수도 있겠음.

    if(loading){
      return ( 
        < Loadingbox>
          <StyledSpinner primary size={80} frontColor="#E2E700" backColor="#E2832B" loading={loading} />
           </ Loadingbox>
          )
    }
     
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
                     <Recommend>{`${nickName} 님만을 위한 hot 4`}</Recommend>
                    <CardBox>
                   
                    {recommend.map((dum,idx) => {
                        return (
                           <Card key={idx}>
                            <img src="/image/hot.png" className='selectcard hot' onClick={(e)=>deleteFavList(e,dum.placeId)}/>
                            <CardImg src={dum.pictureUr? dum.pictureUrl : dum.img}/> 
                                <CardContent> 
                                  <h4>{dum.title}</h4>
                                  <p>{dum.address}</p>
                                </CardContent>
                               <CardSns>
                                 <img src="/image/kakaotalk.png" onClick={()=>shareKakao(dum)} id="btnKakao"/>
                                 <img src="/image/facebook.png" onClick={()=>shareFacebook(dum)}/>
                                 <img src="/image/twitter.png" onClick={()=>shareTwitter(dum)}/>
                              </CardSns>
                        </Card>
                        )
                      })}
                      {places.map((dum,idx) => {
                        return (
                           <Card key={idx}>
                            <img src="/image/close.svg" className='selectcard' onClick={(e)=>deleteFavList(e,dum.place_id)}/>
                            <CardImg src={dum.picture_url? dum.picture_url : dum.img}/> 
                                <CardContent> 
                                  <h4>{dum.title}</h4>
                                  <p>{dum.address}</p>
                                </CardContent>
                               <CardSns>
                                 <img src="/image/kakaotalk.png" onClick={()=>shareKakao(dum)} id="btnKakao"/>
                                 <img src="/image/facebook.png" onClick={()=>shareFacebook(dum)}/>
                                 <img src="/image/twitter.png" onClick={()=>shareTwitter(dum)}/>
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
  } 
`;

const Container = styled.div`
${theme.device.tablet}{
  margin-left:0;
  padding:0;
}
${theme.device.mobile}{
  align-items: center;
}
  width: calc(100%-7.313rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-left: 7.313rem;
  padding-right: 3.5rem;
`;
const Title = styled.div`
${theme.device.mobile}{
  justify-content: center;
}
  display: flex;
  width: 100%;
  padding-top: 2.4rem;
  padding-bottom: 3rem;
  font-size: var(--font-size-xl);
  color: var(--color-darkgrey);
`;
const Bottom = styled.div`
${theme.device.tablet}{
  margin:0;
  align-items:center;
}
  height: 100%;
  margin-right: 3.5rem;
  flex-direction: column;
  align-items: flex-start;
`;

const Recommend = styled.div`
${theme.device.mobile}{
 justify-content: center;
}
 width:100%;
 height:2rem;
 display:flex;
 color: ${theme.colors.green};
 font-weight:600;
  
`;
const SearchContainer = styled.div`
 width:100%;
 padding-bottom: 4.5rem;
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
 ${theme.device.mobile}{
  /* display:block; */
  place-items: center;
}
  display: grid;
  width: 100%;
  min-height: 40rem;
  height: auto;
  grid-template-columns: repeat(auto-fill, minmax(12.313rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(14.313rem, 1fr));
  grid-auto-columns: minmax(12.313rem, 12.313rem);
  grid-auto-rows: minmax(14.313rem, 14.313rem);
  gap: 30px 15px;
`;
const Card = styled.div`
 ${theme.device.mobile}{
   width:23rem;
   flex-direction: row;
    >img{
      &.hot{
        opacity:1;
        z-index:5;
      }
    }
}
   /* width:12.313rem;  
   height: 14.313rem; */
   display:flex;
   background-color: var(--color-mypagecard);
   border-radius: 0.5rem;
   flex-direction: column;
   align-items:center;
   cursor: pointer;
   position:relative;
   transition: all 0.3s ease;
    :hover{
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    
        >img{
    
        &.selectcard{
          position:absolute;
         width:0.7rem;
         height:0.7rem;
         top:0.7rem;
         right:0.7rem;
          opacity:1;
         }
         &.hot{
          position:absolute;
         width:2rem;
         height:2rem;
         top:0.5rem;
         right:0.5rem;
         opacity:1;
        } 
        
    }
  }
    >img{
    
      &.selectcard{
        position:absolute;
        width:0.7rem;
        height:0.7rem;
        top:0.7rem;
        right:0.7rem;
        opacity:0;
        
        }
        &.hot{
          position:absolute;
         width:2rem;
         height:2rem;
         top:0.5rem;
         right:0.5rem;
         opacity:1;
        } 
  } 
  
  
`;
const CardImg = styled.img`
 ${theme.device.mobile}{
  width:15rem;
  height:100%;
  border-radius: 0.5rem 0 0 0.5rem;
}
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
 ${theme.device.mobile}{
  flex-direction:column;
  flex:2;
  margin:0;
  >p{
    line-height: 1rem;
  }
}
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
 ${theme.device.mobile}{
  flex:1;
  margin:0;
  gap: 0.6rem;
  position:absolute;
  width:20%;
  height:20%;
  bottom:0;
  right:28px;
  
}
   width:96%;
   margin-bottom:5px;
   flex:1.2;
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

const Loadingbox = styled.div`
 width: calc(100%-7.313rem);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;

`;
const StyledSpinner = styled(TraceSpinner)`
  
  
 `; 