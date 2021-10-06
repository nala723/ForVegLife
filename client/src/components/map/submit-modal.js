import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MenuPrices } from "./menuPrices";
import { newAccessToken, getgoogleToken } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import gsap from "gsap";
export default function EnrollPlace(props) {
  const dispatch = useDispatch();
  const selPlace = useSelector((state) => state.selectPlace);
  const user = useSelector((state) => state.userReducer);
  const googleState = useSelector((state) => state.googleReducer);
  const { googleToken } = googleState;
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
      .then((res) => {
        if (res.headers.accessToken) {
          if (googleToken) {
            dispatch(getgoogleToken({ accessToken: res.headers.accessToken }));
          } else {
            dispatch(newAccessToken({ accessToken: res.headers.accessToken }));
          }
        }
        props.exit();
      });
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
          <FontAwesomeIcon color="#7CB700" icon={faTimes} />
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
          <StyledPlus color="#C5E87C" icon={faPlus} /> 메뉴 추가
        </Plus>
        <EnrollButton type="submit" />
      </Submit>
    </Temp>
  );
}

const Temp = styled.div`
  width: 100vw;
  height: calc(100vh - 3.45rem);
  max-height: calc(100vh - 3.45rem);
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
  cursor: pointer;
`;
const Plus = styled.div`
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  color: ${theme.colors.mapgrey};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
`;
const StyledPlus = styled(FontAwesomeIcon)`
 :hover{
  color: ${theme.colors.green};
 }
`;
const Submit = styled.form`
  display: flex;
  ${theme.device.mobile} {
    max-width: 24.313rem;
    max-height: 32.938rem;
    width:90vw;
  }
  ${theme.device.mobileM} {
    max-height: 31rem;
  }
  ${theme.device.mobileS} {
    max-width: 20rem;
    max-height: 28rem;
  }
  flex-direction: column;
  align-items: center;
  width: 24.313rem;
  height: 32.938rem;
  background-color: white;
  border-radius:10px;
  overflow: auto;
  transform: scale(0);
`;
const ReviewTitle = styled.div`
 ${theme.device.mobile} {
  font-size:20px;
  margin-top:2rem;
  }
  ${theme.device.mobileS} {
    margin-bottom:1rem;
  }
  width: 75%;
  margin: 1.9rem 0;
  margin-top:3rem;
  color: ${theme.colors.brown};
  font-size:22px;
  text-align: center;
  font-weight: 700;
  border-bottom: 0.15rem solid ${theme.colors.lightgrey};
  :focus {
      outline:none;
  }
`;
const Message = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;
const InputForm = styled.input`
 ${theme.device.mobileS} {
  height: 2.5rem;
  }
  width: 76%;
  height: 3.063rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #C7B7B0;
  text-align: left;
  text-indent: 2rem;
  :focus {
      outline:none;
  }
`;
const TypeForm = styled.select`
 ${theme.device.mobileS} {
  height: 2.5rem;
  padding: 0;
  }
  width:76%;
  height: 3.063rem;
  padding: 0.3rem 0;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #C7B7B0;
  text-align: left;
  text-indent: 2rem;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  :focus {
      outline:none;
  }
`;
const Keyword = styled.div`
 ${theme.device.mobileS} {
  height: 6rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 7.5rem;
  background-color: rgba(0, 0, 0, 0);
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const EnrollButton = styled.input`
 ${theme.device.mobileS} {
  width: 6.5rem;
  height: 2rem;
  font-size:13px;
  }
  margin-top: 1rem;
  background-color: ${theme.colors.green}; 
  color: white;
  width: 7.188rem;
  height: 2.1rem;
  border-radius:6px;
  border: none;
  cursor: pointer;
  font-size:15px;
  font-family: ${theme.fonts.logo};
  transition: all 0.3s ease-in-out; 
       :hover{
         transition: all 0.3s ease-in-out;   
         background-color:white;
         color: ${theme.colors.green}; 
         border: 1px solid ${theme.colors.green}; 
         cursor: pointer;
       }
`;
