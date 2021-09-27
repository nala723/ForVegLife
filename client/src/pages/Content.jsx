import styled from "styled-components";
import theme from "../styles/theme";
import react,{useState,useEffect} from 'react';
import { dummydatas } from "../components/userInfo/dummydatas";


export default function Content() {
    const [isHot,setIsHot] = useState(dummydatas.favorites)
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = isHot.length - 1;
        if (index < 0) {
          setIndex(lastIndex);
        }
        if (index > lastIndex) {
          setIndex(0);
        }
      }, [index, isHot]);
    
      // 자동 슬라이더
      // clearInterval 설정해주면 다음 index가 setIn~되기 전에 현재 영향받은 index 효과 제거
      useEffect(() => {
        let slider = setInterval(() => {
          setIndex(index + 1);
        }, 3000);
        return () => clearInterval(slider); 
      }, [index]);
    
    const handleIndex = (e,changeIdx) => {
        e.preventDefault();
        setIndex(changeIdx)
    }


    return(
     <>
        <Container>
            <HotPlace>이 달의 HOT PLACE</HotPlace>
            <First className="first">
                <SlideBox>
                    <img src="/image/slide-anker.svg" onClick={() => setIndex(index - 1)}/>
                       <SlideContent>
                            <DotBox>
                                {isHot.map((h,idx)=>{
                                    return (
                                        <img 
                                        src ="/image/dot.svg" 
                                        art={idx} 
                                        onClick={(e)=>handleIndex(e,idx)}
                                        className={idx===index ? 'active' : ''}
                                        />
                                    )
                                })}
                            </ DotBox>  
                            {isHot.map((h,idx)=>{
                                const {img,title,address,placeId,star,content} = h;
                                let position = "next";
                                if(idx === index){
                                position = 'active';
                                }
                                if(idx === index -1 || (index === 0 && idx === isHot.length - 1)){
                                position = 'last'; /* -1 인덱스 가진 사람은 없다-> useEffect로 조정 */
                                }
                                return(
                                    <SlideDiv key={placeId} className={position}>
                                        <LeftBox>
                                            <h1>{title}</h1>
                                            <img src="/image/bigstars.svg" alt={title} className="star"/>
                                            <p className="review">"{content}"</p>
                                        </LeftBox>
                                        <ImgBox>   
                                            <img src={img} alt={title} className="photo"/>
                                            <p className="address">{address}</p>
                                        </ImgBox>   
                                    </SlideDiv>
                                )
                            })}
                       </SlideContent>
                    <img src="/image/slide-anker.svg" className="right" onClick={() => setIndex(index + 1)}/>

                </SlideBox>
            </First>
            <Second className="second">
                <h2>읽으면 유용한 ARTICLE</h2>
                <div>
                  <img src="/image/smallanker.svg" alt="image" className="left"/>
                      <ul>
                          {dummydatas.articles.map((ar)=>{
                              return(
                                   <li>
                                     <img src={ar.img}/>
                                      <div>
                                         <h5>{ar.author}</h5>
                                         <h4>{ar.title}</h4>
                                         <p>{ar.content.length >47 ? ar.content.slice(0,47) : ar.content}...</p>
                                     </div>
                                  </li>
                              )
                          })}
                     </ul>
                  <img src="/image/smallanker.svg" alt="image" className="right"/>
                </div>
            </Second>
            <Third className="third">
                <h2>당신을 위한 RECIPE</h2>
                <div>
                  <img src="/image/smallanker.svg" alt="image" className="left"/>
                    <ul>
                    {dummydatas.recipe.map((ar)=>{
                              return(
                                   <li>
                                     <img src={ar.img}/>
                                      <div>
                                         <h5>{ar.calories}</h5>
                                         <h4>{ar.title}</h4>
                                         <p>{ar.content.length >30 ? ar.content.slice(0,30) : ar.content}...</p>
                                     </div>
                                  </li>
                              )
                          })}
                    </ul>
                <img src="/image/smallanker.svg" alt="image" className="right"/>
                </div>
            </Third>
            <Firth className="firth">
                <h2>채식 YOUTUBE</h2>
                <div>
                  <img src="/image/smallanker.svg" alt="image" className="left"/>
                    <ul>
                    {dummydatas.youtube.map((ar)=>{
                              return(
                                   <li>
                                     <img src={ar.img}/>
                                      <div>
                                         <div>
                                            <h5>{ar.name}</h5>
                                            <p>구독자 수 : {ar.follower}</p>
                                          </div>
                                         <h4>{ar.title}</h4>
                                         <span>바로가기</span>
                                     </div>
                                  </li>
                              )
                          })}
                    </ul>
                <img src="/image/smallanker.svg" alt="image" className="right"/>
                </div>
            </Firth>
            <Final className="final">
                <div>
                    <div className="feedBox">
                         <img src="/image/message.png" />
                         <h1><p>ForVegLife</p>에게 피드백을 남겨주세요</h1>
                    </div> 
                     <div>
                         <p>아직 계정이 없으신가요?<span>→</span> </p>
                         <button>Resister</button>
                     </div>               
                </div>
            </Final>
            <Footer>
                <div>
                    <ul>Contact
                        <li>조우빈</li>
                        <li>심지현</li>
                        <li>윤현섭</li>
                        <li>이빛나라</li>
                    </ul>
                    <ul>About
                        <li>wiki</li>
                        <li>repository</li>
                    </ul>
                    <div>
                        <img src="/image/logo.svg" />
                        <p>
                        @Copyright 2021 team ForVegLife.
                        </p>
                        <p>
                        All right reserved.
                        </p>
                    </div>
                    <ul>Codestates
                        <li>codestates.com</li>
                        <li>urclass</li>
                    </ul>
                    <ul>Sitemap
                        <li>mypage</li>
                        <li>mappage</li>
                        <li>content</li>
                        <li>login</li>
                    </ul>
                </div>
            </Footer>
        </Container>
    </>
    )

}    

const Container = styled.div`
    width:100%;
    max-width:100%;
    height:auto;
    min-height: 100vh;
    display: flex;
    padding-top: 5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


const HotPlace = styled.div`
   width:1216px;
   font-size: ${theme.fonts.size.base};
   font-weight: 600;
   color:${theme.colors.logoText};
   margin-bottom: 1rem;
`;

const First = styled.section`
    height: 24.563rem;
    margin-bottom:3.5rem;
    background-color: ${theme.colors.lightgreen};
    width:100%;
    display:flex;
    justify-content: center;
`;
const SlideBox = styled.div`
   width:1216px;
   height:inherit;
   display:flex;
   justify-content: space-between;
  
    >img{
       width:2.375rem;
       cursor: pointer;
       &.right{
            transform:rotate(90deg);
            -moz-transform: scaleX(-1); 
            -o-transform: scaleX(-1); 
            -webkit-transform: scaleX(-1); 
            transform: scaleX(-1);   
            filter: FlipH;
            -ms-filter: "FlipH";
       }

    }
`;
const SlideContent = styled.div`
   width:100%;
   height: inherit;
   margin: 0 1.625rem;
   display:flex;
   position:relative;
   overflow: hidden;
 
`;

const SlideDiv = styled.div`
   position: absolute; /*이유: 모든 사진 컨텐츠들을 같은 곳에 위치시킴*/
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* 다른것들은 모두 안보이게 하기 위해 (밑 active만 보이게) */
    display:flex;
    transition:  all 0.3s linear;
    justify-content: space-between;

    &.active{
         opacity:1;
         transform: translateX(0);
     }
     &.last{
       
         transform: translateX(-100%);
     }
     &.next {
      transform: translateX(100%);
      }

`;

const DotBox = styled.div`
  width:100%;
  height:100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  z-index:500;
  cursor: pointer;
  >img{
    margin-bottom: 1rem;
    width:0.7rem;
    cursor: pointer;
     &.active{
         width:0.8rem;
         border-radius: 100%;
         border: 2px solid ${theme.colors.mapgrey};
     }

  }
`;


const LeftBox = styled.div`
   width:37.188rem;
   height:100%;
   display:flex;
   flex-direction: column;
   align-items:flex-start;
   justify-content:center;
   font-family:${theme.fonts.family.mypage};
   padding: 4rem 3rem 5.75rem 4rem;
   gap:1.1rem;
   /* padding: 3.6rem 3rem 5.75rem 4rem; // 수정할까 이렇게
   gap:1.6rem;
    >img{
        width:9rem;
        margin-top:1.3rem; */
    >img{
        width:12rem;
        margin-bottom:1.2rem;
    }
    >h1{
        font-size:48px;
        color:#5B220A;
        font-weight:500;
        text-shadow: #5B220A 0 0 0;
        
    }
    >p{  
        font-size:${theme.fonts.size.base};
        color:#887C3C;
        font-weight:800;
        line-height: 1.5rem;
    }
   
`;
const ImgBox = styled.div`
  position: relative;
  min-width:30rem;
   width:auto;
   height:100%;
   display:flex;
    >img{
        width:100%;
        height:100%;
        object-fit: cover;
    }
    >p{
      position:absolute;
      right:12px;
      top:12px;
      font-size:${theme.fonts.size.sm};
      color:${theme.colors.darkgrey};
    }
   
`;


const Second =styled(First)`
    width:1246px;
    background-color: white;
    flex-direction: column;
    align-items:flex-start;
    margin-bottom:3.5rem;
     >h2{
         margin-left:30px;
         margin-bottom: 2.2rem;
         font-size: 24px;
         font-weight: ${theme.fonts.weight.bold};
         color:  ${theme.colors.darkgrey};
     }
     >div{
         display:flex;
         width:100%;
         height:100%;
         align-items:center;
         justify-content:center;
         position:relative;
         >img{
             position:absolute;
             &.left{
                left:0;
             }
             &.right{
                 right:0;
                 transform:rotate(90deg);
                -moz-transform: scaleX(-1); 
                -o-transform: scaleX(-1); 
                -webkit-transform: scaleX(-1); 
                transform: scaleX(-1);   
                filter: FlipH;
                -ms-filter: "FlipH";
             }

         }
         >ul{
            display:grid;
            width:1216px;
            height: 100%;
            grid-template-columns: repeat(4, minmax(16.875rem, 1fr));
            justify-content: center;
            place-items:center;
            
            >li{
                width:16.875rem;
                height:100%;
                display: flex;
                flex-direction: column;
                >img{
                    width:100%;
                    min-height:12.5rem;
                    max-height:12.5rem;
                    object-fit:cover;
                }
                >div{
                    width:100%;
                    height: 100%;
                    /* border: 1px solid grey; */
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items:center;
                    gap:0.5rem;
                    text-align:center;
                    padding: 1rem;
                    padding-bottom:3rem;
                    color:${theme.colors.mapgrey};
                    font-weight: 500;
                    >h5{
                      height:14px;  
                      font-size:14px;
                    }
                    >h4{
                      margin-top:0.5rem;
                      font-size:${theme.fonts.size.lg};
                      color: ${theme.colors.darkgrey};
                    }
                    >p{
                      font-size:12px;
                      line-height: 1rem;
                    }
                }
            }

         }
 
     }
     
`;


const Third =styled(Second)`
  >div{
    >ul{
        grid-template-columns: repeat(5, minmax(13.625rem, 1fr));
            >li{
                width:13.625rem;
                >img{
                    width:100%;
                    min-height:13.625rem;
                    max-height:13.625rem;
                    border-radius:100%;
                    object-fit:cover;
                }
                >div{
                    justify-content:flex-start;
                    height:10.625rem;
                    >p{}
                }
            }
        }
  }
`;
const Firth =styled(Second)`
  >div{
    >ul{
        grid-template-columns: repeat(2, minmax(28.125rem, 1fr));
            >li{
                width:28.125rem;
                >img{
                    width:100%; 
                    min-height:15.899rem;
                    object-fit:cover;
                }
                >div{
                    height:10.625rem;
                    padding: 1rem;
                    justify-content: flex-start;
                    >div{
                    display: flex;
                    width:100%;
                    justify-content: space-between;
                    /* padding:0rem 0.3rem; */
                    font-size:14px;
                        >h5{
                        }
                        >p{
                        }
                    } 
                    >h4{
                        width:100%;
                        line-height: 1.4rem;
                        text-align:justify;
                        /* position: relative; */

                    }
                    >span{
                                /* position: absolute;
                                right:0; */
                                position: relative;
                                top:-10px;
                                width:100%;
                                color: ${theme.colors.green};
                                text-align:end;
                                cursor:pointer;
                                font-size:14px;
                                }
                  
                }
            }
        }
  }
    
  
`;
const Final =styled(Second)`
    margin-bottom: 0;
   
      >div{
        width: 1216px;
        height:100%;
        flex-direction: column;
        justify-content: center;
        padding: 4rem 0;
            >div{
              width:100%;
              height:100%;
              display:flex;
              align-items:center;
              justify-content: center;
                 &.feedBox{
                    height:100%;
                    justify-content: flex-start;
                    background-color:#FDC189;
                    color:white;
                    font-size: ${theme.fonts.size.base};
                    font-weight: ${theme.fonts.weight.bold};
                    padding-left:2rem;
                    gap:0rem;
                    cursor: pointer;
                    >img{

                    }
                    >h1{
                        display: flex;
                        align-items:flex-end;
                        
                        >p{
                            color:#B96619;
                            font-family:${theme.fonts.family.mypage};
                            font-size: ${theme.fonts.size.llg};
                            font-weight: 500;
                            margin-right:0.3rem;
                        }
                    }     
                 }
              }
            >div{
              gap:3rem;
                 >p{
                    color:${theme.colors.mapgrey};
                    font-size:${theme.fonts.size.base};
                    font-weight: 500;
                    >span{
                        margin:0 1rem;
                    }
                  
                 }
                 >button{
                    display: flex;
                    width: 7.375rem;
                    font-size: ${theme.fonts.size.base};
                    font-family: ${theme.fonts.button};
                    font-weight: 500;
                    justify-content: center;
                    align-items: center;
                    height: 3rem;
                    border-radius: 0.5rem;
                    border: none;
                    background-color: ${theme.colors.green};
                    color: white;
                    cursor: pointer;
                    transition: all 0.5s ease-in-out;
                    :hover {
                        background-color: white;
                        color: ${theme.colors.green};
                        transition: all 0.5s ease-in-out;
                        border: 1px solid ${theme.colors.green};
                        
                    }
                 }
            }     
      }                   
`;


const Footer =styled.footer`
    border-top: 1px solid ${theme.colors.grey};
    width:100%;
    height:26.625rem;
    display:flex;
    justify-content: center;
      >div{
        width:1216px;
        height:100%;
        display:flex;
        justify-content: space-between;
        padding: 6rem 0;
        >ul{
            display:flex;
            flex-direction: column;
            align-items: center;
            flex:1;
            color:${theme.colors.mapgrey};
            font-weight:bold;
            font-size:${theme.fonts.size.lg};
            gap:0.5rem;
            >li{
                opacity: 0.9;
                font-weight:500;
                font-size:15px;
            }
        }
        >div{
            flex:1.5;
            display:flex;
            flex-direction: column;
            align-items:center;
            text-align:center;
            >img{
                width:11.563rem;
                margin-bottom:1rem;
            }
            >p{
               width:100%;
               color:${theme.colors.mapgrey};
               line-height: 1.3rem;
            }
        }
      }
`;
