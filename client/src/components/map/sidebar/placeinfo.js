import React, { useState } from "react";
import styled from "styled-components";

export default function PlaceInfo() {
  return (
    <>
      <div> 사용자 이용 현황</div>
      <Graph src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2526CA4C5565250603" />
    </>
  );
}

const Graph = styled.img`
  width: 80%;
`;
