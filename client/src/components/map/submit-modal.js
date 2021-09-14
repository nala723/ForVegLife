import React, { useState } from "react"
import styled from "styled-components";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
export default function EnrollPlace(){
    const [menu,setMenu] = useState({
        menu: ["",""],
        price: ["",""]
    })
    const plusMenu = ()=> {
    let tempMenu = menu;
    tempMenu.menu.push("")
    tempMenu.price.push("")
        setMenu({
            ...tempMenu
        })
    }
    const changeMenu = (idx, e) =>{
        let tempMenu = menu;
        tempMenu.menu[idx] = e.target.value
        setMenu({
            ...menu,
            ...tempMenu
        })
    }
    const changePrice = (idx,e)=>{
        let tempMenu = menu;
        tempMenu.menu[idx] = e.target.value
        setMenu({
            ...menu,
            ...tempMenu
        })
    }
    const DeleteMenu = (num)=>{
        let Menu = menu.menu.filter((x,idx) => idx !== num );
        let price = menu.price.filter((x,idx) => idx !== num )
        console.log(Menu)
        console.log(price)
        setMenu({
           menu: Menu,
           price
         })
    }
    return (
    <Temp>
    <Submit>
    <Exit>
        <FontAwesomeIcon color={"green"} icon={faTimes}/>
     </Exit>
     <ReviewTitle>
      <Message>나의 장소 등록</Message>
    </ReviewTitle>
    <InputForm placeholder="장소명을 입력해 주세요"/>
    <InputForm placeholder="주소를 입력해 주세요"/>
    <InputForm placeholder="채식타입을 선택해 주세요"/>
        {menu.menu.map((x,idx) => {

            return(
                <MenuPrice>
                <Delete onClick={(e)=>DeleteMenu(idx)}><FontAwesomeIcon color={"green"} icon={faTimes}/> </Delete>
                <Menu  placeholder="menu" onChange={e=>changeMenu(idx, e)}/>
                <Price placeholder="price" onChange={e=>changePrice(idx, e)}/>
                </MenuPrice>
            )
        })}
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
const Delete =styled.div`
display: flex;
justify-content: center;
align-items: center
`
const Submit = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50vh;
  left: 50vw;
  min-width: 20rem;
  width: 20vw;
  min-height: 32rem;
  height: 32vw;
  background-color: white;
  border-radius: 0.2rem;
  transform: translate(-50%, -50%);
`;
const ReviewTitle = styled.div`
 width:80%;
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
const MenuPrice = styled.div`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display:flex;
  justify-content: space-between;
`
const Menu = styled.input`
  width: 40%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 2rem;
`;
const Price = styled.input`
  width: 40%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 2rem;
`;
const EnrollButton = styled.input`
background-color: #76BE00;
color: white;
width: 20%;
height: 2rem;
border:none;`