import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as EmptyStar,faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import theme from "../../../styles/theme";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Review({ review, inReview, setDelete }) {
  const user = useSelector((state) => state.userReducer);
  let avearge = 0;
  const [Review, setReview] = useState(review.slice(0, 3));
  let star = [0, 0, 0, 0, 0];
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
  if (review.length !== 0) {
    avearge = review.reduce((acc, cur, idx, arr) => {
      return acc + cur.star / arr.length;
    }, 0);

    star = fillStar(avearge);
  }
  const DelReview = (el) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/restaurant/${el}/review`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setDelete();
        setReview(review.filter((x) => x.review_id === el));
      });
  };
  return (
    <Temp>
      <Title> 후기 </Title>
      {user.isLogin ? (
        <GoReview onClick={() => inReview()}> 후기 남기러 가기</GoReview>
      ) : (
        ""
      )}
      <Avearge>
        <Score> {avearge.toFixed(2)}점 </Score>
        {star.map((x) => {
          return <DrawStar star={x} />;
        })}
      </Avearge>
      <ReviewForm>
        {Review.length !== 0
          ? Review.map((x) => {
              return (
                <ReviewContainer>
                  <ReviewData>
                    <Review_1>
                      <ReviewStar>
                        {fillStar(x.star).map((x) => (
                          <DrawStar star={x} />
                        ))}
                      </ReviewStar>
                      <ReviewAt>
                        {x.createdAt.split("T")[0].replaceAll("-", ":")}
                      </ReviewAt>
                    </Review_1>
                    <Review_2>
                      <ReviewContent>{x.content}</ReviewContent>
                      <DeleteReview onClick={() => DelReview(x.reviewId)}>
                        <StyledDelete
                          color="#999090"
                          icon={faTrashAlt}
                        ></StyledDelete>
                      </DeleteReview>
                    </Review_2>
                  </ReviewData>
                </ReviewContainer>
              );
            })
          : ""}

        {Review.length <= 3 ? (
          <More onClick={() => setReview(review)}> ...더보기</More>
        ) : (
          <More onClick={() => setReview(review.slice(0, 3))}> 닫기</More>
        )}
      </ReviewForm>
    </Temp>
  );
}

function DrawStar({ star }) {
  if (star === 1) {
    return <FontAwesomeIcon color="#7CB700" icon={fullStar}></FontAwesomeIcon>;
  }
  return <FontAwesomeIcon color='#BBBBBB' icon={EmptyStar}></FontAwesomeIcon>;
}
const Temp = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
`;
const ReviewContainer = styled.div`
  display: flex;
  border-bottom: 0.1rem solid rgba(187, 187, 187, 0.5); ;
`;

const Title = styled.div`
  margin: 0 1rem 1rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.colors.mapgrey};
`;
const GoReview = styled.div`
  align-self: flex-end;
  margin: 0 0 1rem 0;
  background-color: #F7F9BA;
  font-size:14px;
  color: ${theme.colors.logoText};
  cursor: pointer;
   :hover{
    color: ${theme.colors.grey};
   }
`;
const Avearge = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
  border-bottom: 0.1rem solid rgba(187, 187, 187, 0.5);
  font-size: 1rem;
`;
const Score = styled.div`
  margin: 0 1rem 1rem 0;
  font-size: 1.2rem;
  font-weight:500;
  color:${theme.colors.mapgrey};
`;
const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewData = styled.div`
  width: 1000%;
  margin: 1rem 0 0 0;
`;
const Review_1 = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight:700;
`;
const Review_2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.6rem;
  height: 3.2rem;
  gap:1rem;
  font-weight:500;
`;
const DeleteReview = styled.div`
  display: flex;
  cursor:pointer;
`;
const StyledDelete = styled(FontAwesomeIcon)`
  :hover{
    color: ${theme.colors.grey};
   }
`;
const ReviewStar = styled.div`
  font-size: 0.7rem;
  color: ${theme.colors.mapgrey};
`;
const ReviewAt = styled.div`
 color:${theme.colors.grey};
 font-size:12px;
`;

const ReviewContent = styled.div`
  display: flex;
  color: #999090;
  font-size: 12px;
`;
const More = styled.div`
  text-align: right;
  font-size: 12px;
  color: ${theme.colors.grey};
  margin: 1rem 0.5rem;
  cursor:pointer;
   :hover{
     color: ${theme.colors.mapgrey};
   }
`;
