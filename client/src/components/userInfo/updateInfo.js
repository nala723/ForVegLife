import React, {useState,useCallback,useRef,useEffect} from "react";
import styled from "styled-components";
import DefaultModal from "./defaultmodal";
import theme from "../../styles/theme";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { userInfo,userUpdateInfo,newAccessToken,getgoogleToken} from "../../actions/index";
import {Buffer} from 'buffer';
import axios from 'axios';
import { dummydatas } from "./dummydatas";
import { TraceSpinner } from "react-spinners-kit";
import dotenv from 'dotenv';
dotenv.config();

export default function UpdateInfo() {
    const userState = useSelector((state) => state.userReducer);
    const googleState = useSelector((state)=> state.googleReducer);
    const {
      accessToken, email, nickName,profileblob
    } = userState;
    const {googleToken} = googleState;
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpen,setIsOpen] = useState(false);
    const [imageSizeError,setImageSizeError] = useState(false);
    const [currentInput, setCurrentInput] = useState({
        imgFile:'',
        previewUrl: '',
        inputPassword:'',
        inputPasswordCheck:'',
        inputVegtype:''
    })
    
    const [inValidEditMSG,setInvalidEditMSG] = useState("");
    const [changed,setIsChanged] = useState(false)
    const refPassword = useRef(null);
    const refPasswordCheck = useRef(null);
    const photoInput = useRef(null);
    const veggieIcon = dummydatas.veggieIcon; 
    const [loading, setLoading] = useState(true);

    // 최초 렌더링시 유저정보 받아오기
    useEffect(()=>{
        let token
        if(googleToken){
          token = googleToken
           getUserInfo(token)
        }else {
            token = accessToken
         getUserInfo(token)
        }
    },[])
 
    

   // 유저 정보 요청 함수 - 통과
    const getUserInfo = (token) => {
        setLoading(true)
        axios
          .get(process.env.REACT_APP_SERVER_URL + '/mypage/user-info',{
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ` + token
                },
            withCredentials: true
        })
        .then((res)=> {
            if(res.headers.accessToken){
                if(googleToken){
                        dispatch(getgoogleToken({accessToken: res.headers.accessToken}));
                    }
                else {
                    dispatch(newAccessToken({accessToken: res.headers.accessToken}));
                }
              }
             if(res.status === 200){
                 if(googleToken){
                    dispatch(userInfo({vegType :res.data.vegType}))
                 }
                else{
                   dispatch(userInfo({nickName :res.data.nickname,vegType :res.data.vegType,profileblob:res.data.profileblob, email:res.data.email}))
                }
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
    
    //프로필 이미지 설정
   
    let profileIMG;
    if (profileblob === null || Object.keys(profileblob).length === 0) {
      profileIMG = "/image/bros_blank.jpg";
    } else {
      if (typeof(profileblob) === "string") {
        profileIMG = profileblob;
      } else {
        profileIMG =
          "data:image/png;base64, " +
          Buffer(profileblob, "binary").toString("base64");
      }
    }

   // 이미지 업로드
    const imageFileHandler = (key) => (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];  
            reader.onloadend = () => {
                setCurrentInput({
                    ...currentInput,
                    imgFile : file,
                    previewUrl : reader.result
                })
            }
            reader.readAsDataURL(file);
    }

   // open모달 위한 상태변경함수
    const handleClick = () => {
        setIsOpen(!isOpen)
        if((isOpen===true) && changed){
            setCurrentInput({
                ...currentInput,
                 inputPassword:'',
                 inputPasswordCheck:'',
                 inputVegtype:''

            })
            getUserInfo(accessToken) 
            history.push('/mypage')
        }
        
    }

   // 카메라아이콘 커스텀
    const handlePhotoClick = (e) => {
        e.preventDefault();
        photoInput.current.click();
    }
    // 인풋창
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
    const checkValidPW = ()=>{

     let pw= currentInput.inputPassword
     if(!pw && !currentInput.inputPasswordCheck){
         return
     }
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
        setInvalidEditMSG("")
        return true;
      }
     
     }

    // 두 비밀번호 모두 입력 시 일치 여부
     const handleCompleteInput = () => {
        if(!checkValidPW(currentInput.inputPassword)){
            return
        } 
        else if(currentInput.inputPasswordCheck !== currentInput.inputPassword){
            setInvalidEditMSG("비밀번호를 다시 확인해주세요")
            return
        }
        setInvalidEditMSG("")
        return 
    }

    //회원정보 수정

    const onSubmitHandler = async (e) => { 
        e.preventDefault();
        if(googleToken){
            handleBack(e)
            return;
        }
      
        if(inValidEditMSG){
            return
        }
         
         if((!currentInput.inputPassword || !currentInput.imgFile || !currentInput.inputVegtype || inValidEditMSG)){
            setInvalidEditMSG('입력을 모두 완료해주세요') 
            return
         } 
        setLoading(true)
        const MAX_WIDTH = 320;
        const MAX_HEIGHT = 180;
        const MIME_TYPE = "image/*";
        const QUALITY = 0.7;

        let imgforaxios;
        
        const file = currentInput.imgFile; 
        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
            URL.revokeObjectURL(this.src);
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
                const formData = new FormData();
                formData.append("profile",imgforaxios);
                formData.append("password",currentInput.inputPassword);
                formData.append("vegType",currentInput.inputVegtype);
                    axios
                    .patch(process.env.REACT_APP_SERVER_URL + `/mypage/user-info`,formData,{
                           headers: {
                                "Content-Type": "multipart/form-data",
                                authorization: `Bearer ` + accessToken
                                },
                           withCredentials: true
                       })  
                       .then((res)=> {
                            if(res.headers.accessToken){
                                dispatch(newAccessToken(res.headers.accessToken));
                                }
                            if(res.status === 200){
                                dispatch(userUpdateInfo({vegType: currentInput.inputVegtype,profileblob: currentInput.imgFile}))
                                 setIsChanged(true);
                                 handleClick();
                             }
                             else{
                                 history.push('/notfound');
                             }
                         
                             setLoading(false) 
                        })
                        .catch(error=>
                            console.log(error)
                        )
                
            },
            MIME_TYPE,
            QUALITY
            );
        }; 
        // 이미지 사이즈 계산
        function calculateSize(img, maxWidth, maxHeight) {
            let width = img.width;
            let height = img.height;
    
            if (width > height) {
                if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
                }
            }
            return [width, height];
            }

    };
   
    // 채식 아이콘 선택 
    const hanldeVegIcon = (name) => {
       let iconname =
            veggieIcon.filter(icon=>
            icon.name=== name)
            [0].name
        setCurrentInput({
            ...currentInput,
            inputVegtype: iconname}); 
           
    }

  
    
   // 구글유저 아웃     
     const handleBack = () => {
          if(googleToken){
          setIsOpen(!isOpen)
           if(isOpen === true){
           history.push('/mypage'); 
         }
         
      } 
     }
     if(loading){
        return ( 
          < Loadingbox>
            <StyledSpinner primary size={80} frontColor="#E2E700" backColor="#E2832B" loading={loading} />
             </ Loadingbox>
            )
      }

    return (
        <Container >
        <Title>
           나의 정보 수정
        </Title>
     
       <Bottom>
           <UserContainer>
               <UserTop>     
                   <UserPhotoBox >
                       <UserPhoto>   
                            <input type='file' accept='image/*' name='profile' ref={photoInput}
                            onChange={imageFileHandler('profile')}  />
                             <Camera src="/image/camera.svg" onClick={handlePhotoClick} />
                                 <UserPic src={currentInput.imgFile?currentInput.previewUrl : profileIMG }/>   
                       </UserPhoto>
                   </UserPhotoBox >
                   <UserNmBox>
                       <UserNm > 
                            <UserIcon src="/image/userIcon.svg"/>
                            <UserContent>
                                <p className="shorten">username</p>  
                              <h1> {nickName || 'Kimusername'} </h1>
                           </UserContent>
                        </UserNm >
                       <UserNm >
                           <UserIcon src="/image/email.svg"/>
                           <UserContent>
                               <p className="shorten">e-mail</p>
                             <h1> {email || `hahihuheho@gmail.com`}</h1> 
                           </UserContent>
                       </UserNm >
                   </UserNmBox >
                </UserTop>
                 <UserBottom>
                 <UserBotBox className={inValidEditMSG ? 'msg' : ''}>
                 <h5>{inValidEditMSG  ? inValidEditMSG : null}</h5>
                    <UserNm primary> 
                            <UserIcon src="/image/lock.svg" primary/>
                            <UserContent >
                                <p className="password">new PW</p> 
                              <PwContainer placeholder="새 비밀번호를 입력해주세요"  onChange={handleInputValue('inputPassword')}
                                onKeyPress={handleMoveTopPW} ref={refPassword} onBlur={checkValidPW} value={currentInput.inputPassword}/>
                           </UserContent>
                        </UserNm >
                       <UserNm >
                           <UserIcon src="/image/lock.svg" primary/>
                           <UserContent>
                               <p className="password">new PW</p>
                             <PwContainer placeholder="새 비밀번호를 재입력해주세요" onChange={handleInputValue('inputPasswordCheck')}
                             onKeyPress={handleMoveTopPWCheck} ref={refPasswordCheck} onBlur={handleCompleteInput} value={currentInput.inputPasswordCheck}/>
                           </UserContent>
                       </UserNm >
                    </UserBotBox>
                    <VegAnswer>
                       <p> 해당하는 채식 타입을 선택해 주세요.</p>
                       <VegIconBox>
                           <VegImgBox>
                       {veggieIcon.map((veg,idx)=>{
                           return (
                             <div key={idx}>
                                <VegImg src={veg.img} onClick={()=>hanldeVegIcon(veg.name)} className={currentInput.inputVegtype===veg.name ? 'selected' : ''}/>
                                <div>{veg.name}</div>
                             </div>
                             )
                          })
                         } 
                        </VegImgBox>
                    </VegIconBox>
                    </VegAnswer>
                    
                    <ButtonBox>
                        <button onClick={(e)=>onSubmitHandler(e)} >수정</button>
                    </ButtonBox>
                         {(isOpen && changed) ? <DefaultModal isOpen={isOpen} handleClick={handleClick} header="회원정보 수정이 완료되었습니다.">
                     앞으로도 계속 forVegLife 안에서 건강한 life 누리세요</DefaultModal> : null}
                     {(googleToken && isOpen) ? <DefaultModal isOpen={isOpen} handleClick={handleBack} header="경고">
                     소셜 로그인 유저는 정보 수정을 할 수 없습니다</DefaultModal> : null}
                 </UserBottom>
           </UserContainer>
       </Bottom>
  </Container>
)
                     
}    

 const Container = styled.div`
 ${theme.device.change}{
    width: calc(100% - 0.5rem);
     min-height:100vh;
     margin-bottom:0;
     margin-left: 0.5rem;
     padding-right: 0;
 }
 ${theme.device.mobile}{
 margin-top: 0.2rem;
  
}
    width: calc(100% - 7.313rem);
    height:100%;
    display: flex;
    flex-direction: column;
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
  padding-bottom:0;
  padding-top: 0.9rem;
  height:4.5rem;
}
    display:flex;
    width:100%;
    padding-top: 2.4rem;
    padding-bottom:8rem;
    font-size: ${theme.fonts.size.xl};
    color: ${theme.colors.darkgrey};
    height:2rem;
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
    margin-right: 3.5rem;
    justify-content: center;
    align-items: center;

`; 
const UserContainer = styled.div`
${theme.device.tablet}{
   max-width:32.688rem;
   max-height:45.313rem;
   width:100%;
   height: 97%;
}
   display:flex;
   flex-direction: column;
    width:32.688rem;
    height: 45.313rem;
    align-items: center;
    
`; 
const UserTop = styled(UserContainer)`
 ${theme.device.mobile}{
    height:auto;
}
    height: 18.438rem;
    >input{
       display:none;
       
   }
`; 
const UserPhotoBox = styled(UserTop)`
${theme.device.middle}{
   max-width:20rem;
}
${theme.device.mobile}{
    height: 6.7rem;
}

    height: 7.375rem;
    position:relative; 

`; 
const Camera = styled.img`
${theme.device.middle}{
   right:30%;
}
${theme.device.mobile}{
    width: 40px;
   height: 40px;
}
${theme.device.mobileM}{
    width: 38px;
   height: 38px;
   right:32%;
}
   width: 45px;
   height: 45px;
   position: absolute; 
   z-index:5px;
   bottom: 5px;
   right:195px;
   cursor: pointer;
   
`;
const UserPhoto = styled(UserPhotoBox)`
${theme.device.middle}{
   min-width:7.375rem;
}

${theme.device.mobile}{
    min-width: 6.6rem;
    height: 6.6rem;
    width: 6.6rem;
}
${theme.device.mobileM}{
   min-width: 6rem;
   width: 6rem;
   height: 6rem;
}

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
${theme.device.mobile}{
    padding: 1.2rem 1.5rem;
    height:6rem;
    position:static;
    gap:0.2rem;
}
${theme.device.mobileM}{
    padding: 0.8rem 1.5rem;
    max-height:5rem;
}
    width: 100%;
    height:11.5rem;
    padding: 2.3rem 3rem;
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
${theme.device.mobile}{
   margin-left: 0;
}
${theme.device.mobileM}{
   width:18px;
   height:18px;
}
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
    ${theme.device.mobile}{
        display:flex;
        align-items:flex-end;
        &.password,&.shorten{
            display:none;
        }
      }
       font-size:14px;
        color: ${theme.colors.mapgrey}; 
        font-family: ${theme.fonts.button}; 
        font-weight: 600;
    }

`;


const UserBottom = styled.div`
${theme.device.mobile}{
    height: 20rem;
}
   display:flex;
   flex-direction: column;
   width:inherit;
    height: 100%;
    align-items: center;
    background-color:  ${theme.colors.mypagecard}; 
    border-radius:1rem;
`; 

const UserBotBox = styled(UserTop)`
${theme.device.mobile}{
    padding: 2rem 1.5rem;
    height:9rem;
    max-height:9rem;
    position:static;
    gap:0.5rem;
}
    width: 100%;
    height:11.5rem;
    padding: 2.3rem 2rem;
    justify-content: center;
    align-items:center;
    >h5{
       color:red;
       font-size: 12px;
    
    }
    &.msg{
        padding-top: 1.5rem;
    }

`; 


const PwContainer = styled.input.attrs(props=>({
    type:'password',

}))` 
 ${theme.device.mobile}{
    width:100%;
 }

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
      outline:none;
  }
`;

const VegAnswer = styled.div`
  ${theme.device.mobile}{
   gap:0.5rem;
  }
  ${theme.device.mobileM}{
  gap:0;
  }
  display:flex;
  flex-direction: column;
  width:100%;
   >p{
    ${theme.device.mobile}{
     font-size: 12px;
     margin-left:1.5rem;
     margin-top: 0.8rem;
    
  }
       color:  ${({theme})=>theme.colors.green};
       margin-left:2.5rem;
       margin-top:1rem;
   }

`;
const VegIconBox = styled.div`
  ${theme.device.mobile}{
    height:6rem;
    justify-content: center;
    padding: 0 0.5rem;
  }
 
  display:flex;
  flex-direction: column;
  width:100%;
  height:7rem;
  justify-content: flex-end;
  align-items:center;
  gap: 1rem;
  padding: 0 2rem;
`;
const VegImgBox = styled.div`
 ${theme.device.mobile}{
    width:97%;
  }

  width:90%;
  display:flex;
  justify-content: space-between;
  
  >div{
      >div{  
        ${theme.device.mobile}{
           font-size:10px;   
        }
           text-align:center;
            color: ${({theme})=>theme.colors.mapgrey}; 
        }
  }
   
`;

const VegImg = styled.img`
 ${theme.device.mobileM}{
   min-width:45px;
   min-height:45px;
   height:20%;
   width:20%;
  }
  height:50px;
  width:50px;
  margin-bottom:0.6rem;     
  transition: all 0.2s ease;
  :hover{
       cursor:pointer;
      transform: scale(1.1);
       border-radius: 100%; //추후수정?
       box-shadow: 0 3px 9px rgba(0, 0, 0, 0.15);
   }
   &.selected{
       border-radius:100%;
       transform: scale(1.1);
       transition: all 0.3s ease;
       border: 2px solid #B4E943;
   }
`;
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

const Loadingbox = styled.div`
 width: calc(100%-7.313rem);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;

`;
const StyledSpinner = styled(TraceSpinner)`
  
  
 `; 