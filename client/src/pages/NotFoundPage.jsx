import styled from "styled-components";

export default function NotFound() {
 
  return (
   <>
    <Container>
     <img src="/image/notfound.svg" alt="notfound"/>
     </ Container>
    </>
    
  );
}

const Container = styled.div`
    width:100vw;
     height:auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
   
`;
