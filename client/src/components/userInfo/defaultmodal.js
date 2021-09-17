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
    width: 7.375rem;
    height: 2.063rem;
    border: none;
    border-radius: 0.6rem;
    background-color: ${({ theme }) => theme.colors.green};
    color: white;
    font-size: ${({ theme }) => theme.fonts.base};
    font-family: var(--font-logo);
    transition: all 0.3s ease-in-out;
    :hover {
      transition: all 0.3s ease-in-out;
      background-color: white;
      color: ${({ theme }) => theme.colors.green};
      border: 1px solid ${({ theme }) => theme.colors.green};
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
  }
`;

const ModalSection = styled.div`
  position: relative;
  background-color: white;
  width: 27.563rem;
  height: 18.5rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  max-width: 500px;
  transform: scale(0);
  /* transition: all 0.3s ease-in-out; */
  animation: ${Modalshow} 0.3s ease-out;
  font-family: ${theme.fonts.family.mypage};
  &.active {
    transform: scale(1);
    /* transition: all 0.3s ease-in-out; */
    animation: ${Modalshow} 0.3s ease-out;
  }
`;
const ModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  padding-top: 1.25rem;
  /* transform: translate(10%, 50%); */
  font-size: 20px;
  color: ${theme.colors.green};
  font-weight: ${theme.fonts.weight.bold};
  > div {
    width: 18.5rem;
    border-bottom: 1px solid ${theme.colors.lightgrey};
    margin-bottom: 2.5rem;
  }
`;
const Content = styled.div`
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
