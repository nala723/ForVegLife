import React from "react";
import styled, { css, keyframes } from "styled-components";
import theme from "../../styles/theme";

export default function DefaultModal(props) {
  if (props.isOpen) {
    const { isOpen, handleClick, header, children } = props;
    return (
      <>
        <Background className={`${isOpen ? "active" : ""}`}>
          <ModalSection
            className={`${isOpen ? "active" : ""}`}
            onClick={handleClick}
          >
            <ModalTitle>
              <img src="/image/logo.svg" />
              <div></div>
              <p>{header}</p>
            </ModalTitle>
            <OkBtn>
              <button>확인</button>
            </OkBtn>
            <Content>{children}</Content>
          </ModalSection>
        </Background>
      </>
    );
  }
}
// 애니메이션이 안먹힘 슬라이드같은거 줘야겠다

/* 버튼 */
const ButtonBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    ${theme.device.mobile}{
    width:6rem;
  } 
    ${theme.device.mobileM}{
      font-size:14px;
      width:5.5rem;
      height:2rem;
  }
    width: 7.375rem;
    height: 2.063rem;
    border: none;
    border-radius: 6px;
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

const Modalshow = keyframes`
 0% { 
  transform: scale(0.0);
 }
 100%  {
  transform: scale(1.0);
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

  &.active {
    background-color: rgba(0, 0, 0, 0.6);
    visibility: visible;
    opacity: 1;
    z-index:500;
  }
`;

const ModalSection = styled.div`
 ${theme.device.middle}{
   max-width:27.563rem;
   max-height: 18.5rem;
   width:90vw;
 }
  position: relative;
  background-color: white;
  width: 27.563rem;
  height: 18.5rem;
  border-radius: 10px;
  box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  max-width: 500px;
  transform: scale(0);
  animation: ${Modalshow} 0.3s ease-out;
  font-family: ${theme.fonts.family.mypage};
  &.active {
    transform: scale(1);
    animation: ${Modalshow} 0.3s ease-out;
    z-index:999;
  }
`;
const ModalTitle = styled.div`
  ${theme.device.mobile}{
      max-height: 8rem;
     }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  padding-top: 1.25rem;
  font-size: 20px;
  color: ${theme.colors.green};
  font-weight: ${theme.fonts.weight.bold};
  >img{
    ${theme.device.mobile}{
      width:11rem;
     }
    ${theme.device.mobileM}{
      width:10rem;
    }
  }
  > div {
    ${theme.device.mobile}{
      max-width: 18.5rem;
      width:75%;
    } 
    width: 18.5rem;
    border-bottom: 1px solid ${theme.colors.lightgrey};
    margin-bottom: 2.5rem;
  }
`;
const Content = styled.div`
${theme.device.mobileM}{
  padding: 0 1rem;
  padding-top: 1.6rem;
 }
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.6rem;
  font-size: ${theme.fonts.size.base};
  color: ${theme.colors.mapgrey};
  line-height: 1.2rem;
  font-weight: 500;
`;
const OkBtn = styled(ButtonBox)`
  position: absolute;
  align-items: flex-end;
  bottom: 10%;
`;
