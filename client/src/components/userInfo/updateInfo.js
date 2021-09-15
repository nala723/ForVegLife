import React, {useState,useCallback,useRef,useEffect} from "react";
import styled from "styled-components";
import DefaultModal from "./defaultmodal";
import theme from "../../styles/theme";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { userInfo,userUpdateInfo,newAccessToken } from "../../actions";
import { rootReducer} from '../../reducers';
import axios from 'axios';

export default function UpdateInfo() {
    const userState = useSelector((rootReducer) => rootReducer.userInfoReducer)
    const {
        user: { accessToken, email, nickName, vegType, password, profileblob, isLogin } 
    } = userState;
    const dispatch = useDispatch();
    /*const history = useHistory(); */
    const [isOpen,setIsOpen] = useState(false);
    const [currentInput, setCurrentInput] = useState({
        imgFile:'',
        previewUrl: '',
        inputPassword:'',
        inputPasswordCheck:''
    })
    // const [inputPassword, setInputPassword] = useState("");
    // const [imgFile,setImgFile] = useState('');
    // const [ previewUrl, setPreviewUrl] = useState('');
    // const [inputPasswordCheck, setInputPasswordCheck] = useState("");
    const [imageSizeError, setImageSizeError] = useState(false); // 이미지에러 메세지상태도 추가?
    const [inValidEditMSG,setInvalidEditMSG] = useState("");
    const refPassword = useRef(null);
    const refPasswordCheck = useRef(null);
    const history = useHistory();
    // 최초 렌더링시 유저정보 받아오기
    useEffect(()=>{
        getUserInfo(accessToken)
    },[])

   // 유저 정보 요청 함수
    const getUserInfo = (accessToken) => {
        axios
          .get(`${process.env.REACT_APP_URL}/mypage/user-info`,{
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${accessToken}`
                },
            withCredentials: true
        })
        .then((res)=> {
            if(res.headers.accessToken){
              dispatch(newAccessToken(res.headers.accessToken));
              }
             if(res.status === 200){
                   dispatch(userInfo(res.data.nickname,res.data.vegType,res.data.profileblob,res.data.email))
                 // 그다음은 얻은 상태정보들을 렌더링하는 로직 
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
    
    // 프로필 이미지 설정
    let profileIMG
    if(typeof(profileblob)==='string'){
        profileIMG = profileblob;
    }else{
        profileIMG =  'data:image/png;base64, '+ Buffer(userInfo.profile,'binary').toString('base64');
    } 
   // 이미지 업로드
    const imageFileHandler = (key) => (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file.size>4000000){
            setImageSizeError(true)
        }else{
            setImageSizeError(false)
            reader.onloadend = () => {
                setCurrentInput({
                    imageFile : file,
                    previewUrl : reader.result
                })
            }
            reader.readAsDataURL(file);
        }
    }
  //이미지삭제
    const deleteImage = () => {
        if(!!(currentInput.imageFile)){
            setCurrentInput({
                ...currentInput,
                imageFile:'',
                previewUrl:''
            })
        }
        // else{
        //     setCurrentInput({
        //         ...currentInput,
        //         imageFile: 'default_profile',
        //         previewUrl: 'bros_blank.jpg'
        //     })
        // }
    }
    // 

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    const handleInputValue = useCallback((key) => (e) => {
        setCurrentInput({ ...currentInput, [key]:e.target.value})
    },[currentInput])


   // 인풋창 포커스 핸들
    const handleMoveTopPW = (e)=>{
        if(e.key === 'Enter') {
            refPassword.current?.focus();
        }
      }
    const handleMoveTopPWCheck = (e)=>{
        if(e.key === 'Enter') {
            refPasswordCheck.current?.focus();
        }
    };
    
     // 유효성 검사
    const checkValidPW = useCallback((pw)=>{

     let num = pw.search(/[0-9]/g);
     let eng = pw.search(/[a-z]/ig);
     let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
     
     if(pw.length < 8 || pw.length > 20){
    
      setInvalidEditMSG("8자리 ~ 20자리 이내로 입력해주세요.");
       return false;
      }
      else if(pw.search(/\s/) != -1){
       setInvalidEditMSG("비밀번호는 공백 없이 입력해주세요.");
       return false;
      }
      else if(num < 0 || eng < 0 || spe < 0 ){
        setInvalidEditMSG("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
        return false;
      }
      else {
        return true;
      }
     
     },[currentInput.inputPassword,inValidEditMSG])

    const handleCompleteInput = () => {
        if(!checkValidPW(currentInput.inputPassword)){
            refPassword.current?.focus();
            return false;
        } 
        else if(currentInput.inputPasswordCheck !== currentInput.inputPassword){
            refPasswordCheck.current?.focus();
            setInvalidEditMSG("비밀번호를 다시 확인해주세요")
        }
        return true;
    }

    //회원정보 수정

    // const handleUserEditInfo = () => {
    //     // 비밀번호 조건 만족시 요청되는 함수 (추후 보충)
    // }
    // 수정 - 모달창에서 예를 눌렀을 때 실행
    const onSubmitHandler = async (e) => {
        const MAX_WIDTH = 320;
        const MAX_HEIGHT = 180;
        const MIME_TYPE = "image/jpeg";
        const QUALITY = 0.7;

        let imgforaxios;
        
        const file = currentInput.imageFile; // get the file
        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            console.log("Cannot load image");
        };
        img.onload = await function () {
            URL.revokeObjectURL(this.src);
            const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            canvas.toBlob(
            (blob) => {
                imgforaxios=blob;
                let tmpAccessToken = 'Bearer ' + accessToken;
                const formData = new FormData();
                formData.append("profileblob",imgforaxios);
                formData.append("password",currentInput.username);

                if(!!(currentInput.imageFile) || !!(currentInput.username)){
                    axios
                    .patch(`${process.env.REACT_APP_URL}/mypage/user-info`,{
                           headers: {
                                "Content-Type": "multipart/form-data",
                                authorization: `Bearer ${accessToken}`
                                },
                           withCredentials: true
                       },)
                       .then((res)=> {
                            if(res.headers.accessToken){
                                dispatch(newAccessToken(res.headers.accessToken));
                                }
                            if(res.status === 200){
                                     dispatch(userUpdateInfo(res.data.nickname,res.data.vegType,res.data.profileblob,res.data.email))
                                   // 그다음은 얻은 상태정보들을 렌더링하는 로직 
                             }
                             else{
                                 history.push('/notfound');
                             }
                            //  setIsLoding(false) 
                        })
                        .catch((error)=>{
                            console.log('error')
                        })
                }
            },
            MIME_TYPE,
            QUALITY
            );
        }; 



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


const UserBottom = styled.div`
    display:flex;
   flex-direction: column;
   width:inherit;
    height: 100%;
    /* border: 1px solid yellowgreen; */
    align-items: center;
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

