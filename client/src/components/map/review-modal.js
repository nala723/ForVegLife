import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as EmptyStar } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import theme from "../../styles/theme";
import axios from "axios";

export default function ReviewModal(props) {
  const selPlace = useSelector((state) => state.selectPlace);
  const user = useSelector((state) => state.isLogin);
  const [star, setStar] = useState({
    array: [0, 0, 0, 0, 0],
  });
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const Star = star.array.reduce((acc, cur) => acc + cur);
    axios
      .post(
        `http://localhost/restaurant/${selPlace.id}/review`,
        {
          content: content,
          stars: Star,
        },
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => console.log(res));
      props.exit()
  };
  const contentChange = (e) => {
    setContent(e.target.value);
  };
  const drawStar = (idx) => {
    let reviewStar = star.array;
    for (let i = 0; i < 5; i++) {
      reviewStar[i] = 0;
    }
    for (let i = 0; i <= idx; i++) {
      reviewStar[i] = 1;
    }
    console.log(reviewStar);
    setStar({
      array: reviewStar,
    });
  };
  return (
    <Temp>
      <ReviewModalForm onSubmit={handleSubmit}>
        <Exit onClick={() => props.exit()}>
          <FontAwesomeIcon color={"green"} icon={faTimes} />
        </Exit>
        <ReviewTitle>
          <Message>후기작성</Message>
        </ReviewTitle>
        <ReviewStar>
          {star.array.map((x, idx) => (
            <div onClick={() => drawStar(idx)}>
              <DrawStar star={x} />
            </div>
          ))}
        </ReviewStar>
        <ReviewContent
          placeholder="이 장소는 어떠셨나요? 여러분의 마음을 담아 작성해 주세요."
          onChange={contentChange}
        ></ReviewContent>
        <ReviewSubmit type="submit" />
      </ReviewModalForm>
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
  width: 100vw;
  height: 95vh;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Exit = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1rem;
`;
const ReviewTitle = styled.div`
  width: 80%;
  color: ${theme.colors.brown};
  font-size: 1.6rem;
  text-align: center;
  border-bottom: 0.1rem solid black;
`;
const Message = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;
const ReviewStar = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: ${theme.colors.green};
`;
const ReviewModalForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  top: 50vh;
  left: 50vw;
  min-width: 24rem;
  width: 27vw;
  min-height: 18rem;
  height: 21vw;
  background-color: white;
  border-radius: 1rem;
  transform: translate(-50%, -50%);
`;

const ReviewContent = styled.textarea`
  width: 80%;
  height: 6rem;
  resize: none;
  color: ${theme.colors.mapgrey};
`;
const ReviewSubmit = styled.input`
  background-color: #76be00;
  color: white;
  width: 20%;
  height: 2rem;
  border: none;
`;
