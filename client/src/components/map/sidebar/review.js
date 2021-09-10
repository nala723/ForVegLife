import React, { useState } from "react";
import styled from "styled-components";

export default function Review() {
  return (
    <>
      <div> 안녕하세요 </div>
      <ReviewImg src="https://www.tournews21.com/news/photo/201909/32808_68693_1940.png" />
    </>
  );
}
const ReviewImg = styled.img`
  width: 80%;
`;
