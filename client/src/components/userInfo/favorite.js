import React from "react";
import styled from "styled-components";

export default function Favorite() {
  return (
    <Container>
      <Title>나의 즐겨찾기</Title>
      <Bottom>
        <SearchContainer>
          <Search placeholder="주소로 검색하기"></Search>
        </SearchContainer>
        <CardBox>
          <Card>
            <CardImg src="/image/cakes.png" />
            <CardContent>
              <h4>{`어느 Vegan 카페`}</h4>
              <p>{`서울시 광장동 구의 사거리 가동 202호`}</p>
            </CardContent>
            <CardSns>
              <img src="/image/kakaotalk.svg" />
              카카오로 공유하기
            </CardSns>
          </Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card />
          <Card />
          <Card />
          <GotoCard>
            +<p></p>나의 장소 만들러가기
          </GotoCard>
        </CardBox>
      </Bottom>
    </Container>
  );
}

const Container = styled.div`
  width: calc(100%-7.313rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-left: 7.313rem;
  padding-right: 3.5rem;
`;
const Title = styled.div`
  display: flex;
  width: 100%;
  padding-top: 2.4rem;
  padding-bottom: 3rem;
  font-size: var(--font-size-xl);
  font-style: var(--font-mypage);
  color: var(--color-darkgrey);
`;
const Bottom = styled.div`
  height: 100%;
  margin-right: 3.5rem;
  flex-direction: column;
  align-items: flex-start;
`;
const SearchContainer = styled.div`
  width: 100%;
  padding-bottom: 5rem;
  display: flex;
  justify-content: flex-end;
`;
const Search = styled.input`
  display: flex;
  margin-top: 2.5rem;
  width: 32.063rem;
  height: 2.563rem;
  color: ${({ theme }) => theme.colors.darkgrey};
  border: 1.5px solid var(--color-grey);
  border-radius: 0.5rem;
  background-image: url("/image/search.svg");
  background-repeat: no-repeat;
  background-position: 96% 50%;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  :focus {
    border: 2px solid var(--color-lightgreen);
    /* border-radius:25px; */
    outline: none;
    /* transition: all 0.3s ease-in-out; */
  }
  :hover {
    border: 2px solid var(--color-lightgreen);
    /* border-radius:25px; */
    outline: none;
    /* transition: all 0.3s ease-in-out; */
  }
`;

const CardBox = styled.div`
  display: grid;
  width: 100%;
  min-height: 40rem;
  height: auto;
  grid-template-columns: repeat(auto-fill, minmax(12.313rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(14.313rem, 1fr));
  grid-auto-columns: minmax(12.313rem, 12.313rem);
  grid-auto-rows: minmax(14.313rem, 14.313rem);
  gap: 30px 15px;
`;
const Card = styled.div`
  width: 12.313rem;
  height: 14.313rem;
  display: flex;
  background-color: var(--color-mypagecard);
  border-radius: 0.5rem;
  flex-direction: column;
  align-items: center;
`;
const CardImg = styled.img`
  display: flex;
  width: 100%;
  height: 6.438rem;
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0 0;
`;
const CardContent = styled(Card)`
  text-align: center;
  justify-content: center;
  margin-bottom: 12px;
  gap: 0.8rem;
  flex: 3;
  > h4 {
    color: #5b220a;
    font-size: var(--font-size-base);
    font-weight: 500;
  }
  > p {
    color: var(--color-mapgrey);
    font-size: var(--font-size-sm);
  }
`;
const CardSns = styled(CardContent)`
  width: 96%;
  margin-bottom: 5px;
  /* border-radius: 0 0 0.5rem 0.5rem; */
  flex: 1.2;
  background-color: white;
  color: var(--color-brown);
  font-size: var(--font-size-sm);
  flex-direction: row;
  gap: 0.5rem;
  cursor: pointer;
`;
const GotoCard = styled(Card)`
  justify-content: center;
  gap: 5px;
  font-size: var(--font-size-lg);
  color: var(--color-darkgrey);
`;
