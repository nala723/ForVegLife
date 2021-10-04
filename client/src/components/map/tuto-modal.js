import React from "react";
import styled, { css, keyframes } from "styled-components";
import theme from "../../styles/theme";

export default function TutoModal(props) {
  if (props.isOpen) {
    const { isOpen, handleClick,handleClose, children } = props;
    return (
      <>
        <Background className={`${isOpen ? "active" : ""}`}>
          <ModalSection
            className={`${isOpen ? "active" : ""}`}
          >
            <ModalTitle >
              <img src="/image/logo.svg" />
              <div></div>
            </ModalTitle>
            <OkBtn>
              <button className="tuto" onClick={()=>handleClick(false)}>튜토리얼 보기</button> 
              <button onClick={()=>handleClose()}>튜토리얼 생략</button>
            </OkBtn>
            <Content >{children}</Content>
          </ModalSection>
        </Background>
      </>
    );
  }
}

/* 버튼 */
const ButtonBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 7.5rem;
    height: 2.4rem;
    border: none;
    border-radius: 0.4rem;
    background-color: white;
    color: #E26D00;
    border: 1px solid #E26D00;
    font-size: ${theme.fonts.base};
    font-family: ${theme.fonts.bautton};
    transition: all 0.3s ease-in-out;
    &.tuto{
      color: ${theme.colors.green};
      border: 1px solid ${theme.colors.green};
    }
    :hover {
      transition: all 0.3s ease-in-out;
      background-color:#E26D00;
      color: white;
      border: 1px solid #E26D00;
      cursor: pointer;
      &.tuto{
      background-color: ${theme.colors.green};
      border: 1px solid ${theme.colors.green};
    }
    }
  }
`;

const Contentshow = (middle,bt)=> keyframes`
0% { 
bottom: ${bt-15}%;
opacity: 0;
}
${middle}% {
  bottom: ${bt-15}%;
opacity: 0;
}
100%  {
  bottom: ${bt}%;
 opacity: 1;
}
`;


const Modalshow = keyframes`
 0% { 
 transform:  translateY(-30%);
 opacity: 0;
 }
 100%  {
  transform: translateY(0%);
  opacity: 1;
 }

`;

/* 모달 */
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s  ease;

  &.active {
    background-color: rgba(0, 0, 0, 0.7);
    visibility: visible;
    opacity: 1;
    z-index:500;
    transition: all 0.5s  ease;
  }
`;

const ModalSection = styled.div`
  position: relative;
  background-color: white;
  width: 29.813rem;
  height: 21.688rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.3);
  max-width: 29.813rem;
  animation: ${Modalshow} 0.8s ease-in-out;
  font-family: ${theme.fonts.family.mypage};
  &.active {
    animation: ${Modalshow} 0.8s ease-in-out;
    z-index:999;
  }
`;
const ModalTitle = styled.div`
 position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  padding-top: 1.25rem;
  font-size: 20px;
  color: ${theme.colors.green};
  font-weight: ${theme.fonts.weight.bold};
  animation: ${Contentshow(10,73)} 1.3s ease-in-out;
  right:19%;
  bottom: 73%;
  > div {
    width: 18.5rem;
    border-bottom: 1px solid ${theme.colors.lightgrey};
    margin-bottom: 2rem;
  }
`;
const Content = styled.div`
 position: absolute;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  font-size: ${theme.fonts.size.base};
  color: ${theme.colors.mapgrey};
  line-height: 2rem;
  font-weight: 600;
  right:12%;
  bottom: 36%;
  text-align:center;
 animation: ${Contentshow(30,36)} 1.3s ease-in-out;
 transition-delay: 1s;

`;
const OkBtn = styled(ButtonBox)`
  position: absolute;
  align-items: flex-end;
  display:flex;
  gap:4rem;
  bottom: 10%;
  animation: ${Contentshow(60,10)} 1.3s ease-in-out; 

`;