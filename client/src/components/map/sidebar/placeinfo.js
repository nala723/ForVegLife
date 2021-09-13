import React, { useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2/dist/index";

export default function PlaceInfo({ user }) {
  const likeType = Object.entries(user);
  const type = likeType.map((x) => x[0]);
  const ratio = likeType.map((x) => x[1].slice(0, -1));
  let data = {
    labels: type,
    datasets: [
      {
        label: "사용자 이용 현황",
        data: ratio,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(255,99,132,0.2)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Temp>
      <Title> 타입별 인기 현황 </Title>
      <Bar data={data} width="100%" height="100%" options={options} />
    </Temp>
  );
}

const Title = styled.div`
  margin: 0 1rem 1rem 0;
`;
const Temp = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
  border-bottom: 0.2rem solid blue;
`;
