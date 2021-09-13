import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as EmptyStar } from "@fortawesome/free-regular-svg-icons";

export default function Review({ review }) {
  const avearge = review.reduce((acc, cur, idx, arr) => {
    return acc + cur.star / arr.length;
  }, 0);
  const date = Date.now();
  console.log(date);
  const fillStar = (avearge) => {
    let CeilStar = Math.round(avearge);
    let array = [];
    for (let i = 0; i < CeilStar; i++) {
      array.push(1);
    }
    for (let i = 0; i < 5 - CeilStar; i++) {
      array.push(0);
    }
    return array;
  };
  let star = fillStar(avearge);
  return (
    <Temp>
      <Title> 후기 </Title>
      <GoReview> 후기 남기러 가기</GoReview>
      <Avearge>
        <Score> {avearge}점 </Score>
        {star.map((x) => {
          return <DrawStar star={x} />;
        })}
      </Avearge>
      <ReviewForm>
        {review.map((x) => {
          return (
            <ReviewData>
              <Review_1>
                <ReviewStar>
                  {fillStar(x.star).map((x) => (
                    <DrawStar star={x} />
                  ))}
                </ReviewStar>
                <ReviewAt>
                  {x.createdAt.split(" ")[0].replaceAll("-", ":")}
                </ReviewAt>
              </Review_1>
              <Review_2>
                <ReviewNickname>{x.nickName}</ReviewNickname>
                <ReviewContent>{x.content}</ReviewContent>
              </Review_2>
            </ReviewData>
          );
        })}
        <More> ...더보기</More>
      </ReviewForm>
    </Temp>
  );
}

function DrawStar({ star }) {
  if (star === 1) {
    return <FontAwesomeIcon color="#7CB700" icon={fullStar}></FontAwesomeIcon>;
  }
  return <FontAwesomeIcon icon={EmptyStar}></FontAwesomeIcon>;
}
const Temp = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
`;

const Title = styled.div`
  margin: 0 1rem 1rem 0;
  font-size: 1.4rem;
`;
const GoReview = styled.div`
  align-self: flex-end;
  margin: 0 0 1rem 0;
`;
const Avearge = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
  border-bottom: 0.1rem solid blue;
  font-size: 1.4rem;
`;
const Score = styled.div`
  margin: 0 1rem 1rem 0;
`;
const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewData = styled.div`
  margin: 1rem 0 0 0;
  border-bottom: 0.1rem solid blue;
`;
const Review_1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const Review_2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
`;
const ReviewStar = styled.div`
  font-size: 0.7rem;
`;
const ReviewAt = styled.div``;
const ReviewNickname = styled.div`
  width: 30%;
  font-size: 0.8rem;
`;
const ReviewContent = styled.div`
  width: 10rem;
  font-size: 0.6rem;
`;
const More = styled.div`
  text-align: right;
  margin: 1rem 0 1rem 1rem;
`;
