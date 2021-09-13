import React, { useState } from "react";
import styled from "styled-components";
// const cheerio = require("cheerio");
const axios = require("axios");

export default function MenuInfo() {
  const [menu, setMenu] = useState({
    1: 2,
    2: 3,
    3: 4,
  });

  return (
    <Temp>
      <Picture src="https://place.map.kakao.com/1796070591#none" />
      <Name style> hello world</Name>
      <Menubar>
        <tr>
          <td> hello</td>
          <Place> 1000원</Place>
        </tr>
      </Menubar>
    </Temp>
  );
}
const Temp = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
`;
const Picture = styled.img`
  width: 100%;
`;
const Name = styled.div`
  margin: 1rem 1rem 1rem 0;
  justify-content: flex-start;
`;
const Menubar = styled.table``;
const Place = styled.td`
  text-align: right;
`;
