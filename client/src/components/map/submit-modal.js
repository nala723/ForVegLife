import React, { useRef, useState } from "react"
import styled from "styled-components";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MenuPrices } from "./menuPrices";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
export default function EnrollPlace(props){
  const selPlace =useSelector(state=> state.selectPlace)
  const user =useSelector(state=> state.isLogin)
    const [place , setPlace ]= useState({
      place: "",
      address: selPlace.address,
      type: ""
    })
    const [menu,setMenu] = useState([
      {id: 1,
      menu: "",
     price: ""},
     {id: 2,
      menu: "",
     price: ""},
    ])
    const nextId = useRef(3)
    const plusMenu = ()=> {
            const menus = 
            {id: nextId.current,
            menu: "",
            price: ""}
          setMenu([...menu,menus])
        nextId.current +=1;
    }
    const onRemove = (id)=>{
      setMenu(menu.filter(x => x.id !== id));
    }
    const onsubmit = (e)=>{
      e.preventDefault()
      axios.post("http://localhost/restaurant",{
        title: place.place,
        address: place.address,
        category: place.type,
        point: [ selPlace.x, selPlace.y],
        menu: menu.map(x=> x.menu),
        price: menu.map(x=> x.price),
      },{   headers:{
        authorization: `Bearer ${user.acessToken}`}}
      
    )
      .then(res=>
        console.log(res)
      ).catch(
        err => console.log(err)
      )
    }
    const onUpdate =(name, value ,key)=>{
      setMenu( menu.map(x=>
        x.id ===key ? {...x, [name]: value}: x)
    )
    }
    const changePlace = (e) =>{
      setPlace({
        ...place,
        [e.target.name] : e.target.value
      })
    }
    return (
    <Temp>
    <Submit onSubmit={e=>onsubmit(e)}>
    <Exit onClick={()=>props.exit()}>
        <FontAwesomeIcon color={"green"} icon={faTimes}/>
     </Exit>
     <ReviewTitle>
      <Message>나의 장소 등록</Message>
    </ReviewTitle>
    <InputForm name="place" value={place.place} onChange={changePlace} placeholder="장소명을 입력해 주세요"/>
    <InputForm name="address" value={place.address} onChange={changePlace} placeholder="주소를 입력해 주세요"/>
    <InputForm name="type" value={place.type} onChange={changePlace} placeholder="채식타입을 선택해 주세요"/>
    <Keyword>
        {menu.map((x,idx) => {
  
            return(
              <MenuPrices x={x} key={idx} onRemove={onRemove} onUpdate={onUpdate}/>
            )
        })}
        </Keyword>
    <Plus onClick={plusMenu}> <FontAwesomeIcon color={"green"} icon={faPlus}/> 메뉴 추가</Plus>
    <EnrollButton type="submit" />
    </Submit>
    </Temp>)
}

const Temp = styled.div`
 width:100vw;
 height: 95vh;
 background-color: rgba(0,0,0,0.4)
`;
const Exit = styled.div`
position: absolute;
top:1rem;
right:1rem;
font-size: 1rem;
`;
const Plus = styled.div`
position: absolute;
bottom: 1rem;
right: 1rem;
`
const Submit = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50vh;
  left: 50vw;
  min-width: 18rem;
  width: 18vw;
  min-height: 27rem;
  height: 27vh;
  background-color: white;
  border-radius: 0.2rem;
  transform: translate(-50%, -50%);
  overflow: auto;
`;
const ReviewTitle = styled.div`
 width:80%;
 margin: 1rem;
 color: ${theme.colors.brown};
 font-size: 1.6rem;
 text-align: center;
 border-bottom: 0.1rem solid black;
`
const Message = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;
const InputForm = styled.input`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 2rem;
`;
const Keyword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 7rem;
  background-color: rgba(0, 0, 0, 0);
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const EnrollButton = styled.input`
background-color: #76BE00;
color: white;
width: 20%;
height: 2rem;
border:none;`