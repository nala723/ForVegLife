import React, { useRef, useState } from "react"
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes  } from "@fortawesome/free-solid-svg-icons";
import theme from "../../styles/theme";

export function MenuPrices ({x,onRemove, onUpdate}){
 
    const onChange= (e) =>{
      onUpdate( e.target.name, e.target.value,x.id)
    }
     return (
         <>
    <MenuPrice>
    <Delete onClick={()=>onRemove(x.id)}><FontAwesomeIcon color="#7CB700" icon={faTimes}/> </Delete>
    <Menu name="menu" placeholder="menu" value={x.menu} onChange={e=>onChange(e)}/>
    <Price name="price" placeholder="price" value={x.price} onChange={e=>onChange(e)} />
    </MenuPrice>
    </>)
  }

  const Delete =styled.div`
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`
const MenuPrice = styled.div`
 ${theme.device.mobileS} {
  height: 2.5rem;
  gap: 0.6rem;
  }
  width:76%;
  height: 2.9rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display:flex;
  justify-content: space-between;
  gap:1rem;
`
const Menu = styled.input`
 ${theme.device.mobileS} {
  height: 2.5rem;
  }
  width: 44%;
  height: 2.9rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #C7B7B0;
  text-align: center;
  :focus {
      outline:none;
  }
`;
const Price = styled.input`
 ${theme.device.mobileS} {
  height: 2.5rem;
  }
  width: 44%;
  height: 2.9rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #C7B7B0;
  text-align: center;
  :focus {
      outline:none;
  }
`;