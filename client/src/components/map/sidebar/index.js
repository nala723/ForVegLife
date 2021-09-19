import react, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuInfo from "./menuInfo";
import PlaceInfo from "./placeinfo";
import Review from "./review";
import { useSelector, useDispatch } from "react-redux";
import { selectPlace } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function SideBar({ select, inReview, exitReview }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const selPlace = useSelector((state) => state.selectPlace);
  const [tempdata, setTempData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/restaurant/${selPlace.id}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTempData(...res.data);
      });
  }, [selPlace.id]);
  let data = tempdata;
  console.log(data);
  // axios 요청으로 받아오기
  // 일단은 더미데이터
  // const data = {
  //   like: {
  //     Lacto: "30%",
  //     Pollo: "20%",
  //     Pesco: "20%",
  //     Ovo: "20%",
  //     Vegan: "10%",
  //   },
  //   placeId: 4,
  //   title: "어느 비건의 케이크집",
  //   menu: ["toast", "cake"],
  //   price: [3500, 5000],
  //   review_star: [
  //     {
  //       nickName: "lorem",
  //       content: "Elit dolore dolor veniam deserunt.",
  //       createdAt: "2021-09-03 02:08:30",
  //       star: 3.5,
  //       reviewId: 5,
  //     },
  //     {
  //       nickName: "ipsum",
  //       content:
  //         "Mollit exercitation enim do sit eu. Deserunt culpa pariatur excepteur aliquip do deserunt deserunt sint. Laborum veniam id nisi amet non anim cupidatat fugiat.",
  //       createdAt: "2021-09-03 02:08:30",
  //       star: 2,
  //       reviewId: 3,
  //     },
  //   ],
  // };
  return (
    <>
      {!(Array.isArray(data) && data.length === 0) ? (
        <Side>
          <Exit onClick={() => dispatch(selectPlace({ x: 0, y: 0, id: 0 }))}>
            <FontAwesomeIcon icon={faTimes} />
          </Exit>
          <MenuInfo
            place={data.title}
            menu={data.menu}
            price={data.price}
            like={data.favirote}
          />
          <PlaceInfo user={data.like} />
          <Review
            review={data.review}
            inReview={inReview}
            exitReview={exitReview}
          />
        </Side>
      ) : (
        ""
      )}
    </>
  );
}

const Exit = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  font-size: 2rem;
`;
const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: absolute;
  margin: 0;
  top: 5vh;
  min-width: 20%;
  max-width: 80%;
  height: 90vh;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
