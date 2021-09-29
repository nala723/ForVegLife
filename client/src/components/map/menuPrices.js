import React, { useRef, useState } from "react"
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes  } from "@fortawesome/free-solid-svg-icons";

export function MenuPrices ({x,onRemove, onUpdate}){
 
    const onChange= (e) =>{
      onUpdate( e.target.name, e.target.value,x.id)
    }
     return (
         <>
    <MenuPrice>
    <Delete onClick={()=>onRemove(x.id)}><FontAwesomeIcon color={"green"} icon={faTimes}/> </Delete>
    <Menu name="menu" placeholder="menu" value={x.menu} onChange={e=>onChange(e)}/>
    <Price name="price" placeholder="price" value={x.price} onChange={e=>onChange(e)} />
    </MenuPrice>
    </>)
  }

  const Delete =styled.div`
display: flex;
justify-content: center;
align-items: center
`
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
  text-align: center;
  /* text-indent: 2rem; */
`;
const Price = styled.input`
  width: 40%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: center;
  /* text-indent: 2rem; */
`;