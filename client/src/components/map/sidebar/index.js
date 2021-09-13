import react, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuInfo from "./menuInfo";
import PlaceInfo from "./placeinfo";
import Review from "./review";

export default function SideBar({ select }) {
  // axios 요청으로 받아오기
  // 일단은 더미데이터
  const time = Date.now();
  const data = {
    like: {
      Lacto: "30%",
      Pollo: "20%",
      Pesco: "20%",
      Ovo: "20%",
      Vegan: "10%",
    },
    placeId: 4,
    title: "어느 비건의 케이크집",
    menu: ["toast", "cake"],
    price: [3500, 5000],
    review_star: [
      {
        nickName: "lorem",
        content: "Elit dolore dolor veniam deserunt.",
        createdAt: "2021-09-03 02:08:30",
        star: 3.5,
        reviewId: 5,
      },
      {
        nickName: "ipsum",
        content:
          "Mollit exercitation enim do sit eu. Deserunt culpa pariatur excepteur aliquip do deserunt deserunt sint. Laborum veniam id nisi amet non anim cupidatat fugiat.",
        createdAt: "2021-09-03 02:08:30",
        star: 2,
        reviewId: 3,
      },
    ],
  };

  return (
    <Side>
      <MenuInfo place={data.title} menu={data.menu} price={data.price} />
      <PlaceInfo user={data.like} />
      <Review review={data.review_star} />
    </Side>
  );
}

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: absolute;
  top: 5vh;
  padding-top: 20px;
  min-width: 20%;
  max-width: 80%;
  height: 90vh;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
