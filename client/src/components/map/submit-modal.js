import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MenuPrices } from "./menuPrices";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import gsap from "gsap";
export default function EnrollPlace(props) {
  const selPlace = useSelector((state) => state.selectPlace);
  const user = useSelector((state) => state.userReducer);
  const [place, setPlace] = useState({
    place: selPlace.name,
    address: selPlace.address,
  });
  const [type, setType] = useState([]);
  const size = useRef();
  useEffect(() => {
    gsap.to(size.current, { scale: 1, duration: 0.5, ease: "back" });
  });
  const [menu, setMenu] = useState([
    { id: 1, menu: "", price: "" },
    { id: 2, menu: "", price: "" },
  ]);
  const nextId = useRef(3);
  const plusMenu = () => {
    const menus = { id: nextId.current, menu: "", price: "" };
    setMenu([...menu, menus]);
    nextId.current += 1;
  };
  const onRemove = (id) => {
    setMenu(menu.filter((x) => x.id !== id));
  };
  const onsubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/restaurant`,
        {
          title: place.place,
          address: place.address,
          category: type,
          point: [selPlace.x, selPlace.y],
          menu: menu.map((x) => x.menu),
          price: menu.map((x) => x.price),
        },
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => res);
  };
  const onUpdate = (name, value, key) => {
    setMenu(menu.map((x) => (x.id === key ? { ...x, [name]: value } : x)));
  };
  const changePlace = (e) => {
    setPlace({
      ...place,
      [e.target.name]: e.target.value,
    });
  };
  const changeType = (e) => {
    let temp = type.filter((x) => x === e.target.value);

    if (temp.length === 0) {
      setType([...type, e.target.value]);
    } else {
      setType([...type.filter((x) => x !== e.target.value)]);
    }
  };
 
  return (
    <Temp>
      <Submit ref={size} onSubmit={(e) => onsubmit(e)}>
        <Exit onClick={() => props.exit()}>
          <FontAwesomeIcon color={"green"} icon={faTimes} />
        </Exit>
        <ReviewTitle>
          <Message>나의 장소 등록</Message>
        </ReviewTitle>
        <InputForm
          name="place"
          value={place.place}
          onChange={changePlace}
          placeholder="장소명을 입력해 주세요"
        />
        <InputForm
          name="address"
          value={place.address}
          onChange={changePlace}
          placeholder="주소를 입력해 주세요"
        />
        <TypeForm
          name="type"
          value={type}
          onChange={(e) => changeType(e)}
          placeholder="채식타입을 선택해 주세요"
          multiple
        >
          <option value="비건">비건</option>
          <option value="락토">락토</option>
          <option value="오보">오보</option>
          <option value="락토오보">락토오보</option>
          <option value="페스코">페스코</option>
        </TypeForm>
        <Keyword>
          {menu.map((x, idx) => {
            return (
              <MenuPrices
                x={x}
                key={idx}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            );
          })}
        </Keyword>
        <Plus onClick={plusMenu}>
          {" "}
          <FontAwesomeIcon color={"green"} icon={faPlus} /> 메뉴 추가
        </Plus>
        <EnrollButton type="submit" />
      </Submit>
    </Temp>
  );
}

const Temp = styled.div`
  width: 100vw;
  height: calc(100vh - 3.35rem);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Exit = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1rem;
`;
const Plus = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
const Submit = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  min-width: 18rem;
  width: 18vw;
  min-height: 27rem;
  height: 27vh;
  background-color: white;
  border-radius: 0.2rem;
  overflow: auto;
`;
const ReviewTitle = styled.div`
  width: 80%;
  margin: 1rem;
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
const InputForm = styled.input`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 2rem;
`;
const TypeForm = styled.select`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 0.5px solid #bbbbbb;
  text-align: left;
  text-indent: 2rem;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Keyword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 7rem;
  background-color: rgba(0, 0, 0, 0);
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const EnrollButton = styled.input`
  background-color: #76be00;
  color: white;
  width: 20%;
  height: 2rem;
  border: none;
`;
