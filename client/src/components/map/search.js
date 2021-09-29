import React, { useEffect, useState } from "react";
import MapIndex from "./index";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectPlace } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as SearchIcon } from "../../static/search.svg";
import axios from "axios";
import theme from "../../styles/theme";
const { kakao } = window;
const veggieIcon = [
  {
    img: "/image/abocado-icon.png",
    name: "비건",
  },
  {
    img: "/image/cheese-icon.png",
    name: "오보",
  },
  {
    img: "/image/egg-icon.png",
    name: "락토",
  },
  {
    img: "/image/eggcheese-icon.png",
    name: "락토오보",
  },
  {
    img: "/image/fish-icon.png",
    name: "페스코",
  },
];
export default function SearchPlace({ selData, setCategory }) {
  const mapCenter = useSelector((state) => state.MapCenter);
  const dispatch = useDispatch();
  const [latlng, setLatlng] = useState({
    x: 0,
    y: 0,
  });
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  // const ps = new kakao.maps.services.Places();
  const [data, setData] = useState([]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  useEffect(() => {
    if (inputText !== "") {
      let places = new kakao.maps.services.Places();
      let callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setData(result);

          return result;
        }
      };
      places.keywordSearch(inputText, callback, {
        x: mapCenter.x,
        y: mapCenter.y,
        radius: 1000,
      });
    }
  }, [mapCenter, inputText]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };
  const onClick = (x, y, address, name) => {
    setLatlng({
      ...latlng,
      x,
      y,
    });
    dispatch(selectPlace({ x, y, address: address, name: name, id: 0 }));
  };

  return (
    <>
      <SearchForm className="inputForm" onSubmit={handleSubmit}>
        <InputStyle>
          <PlaceInput
            placeholder="Search Place..."
            onChange={onChange}
            value={inputText}
          />
          <SubmitButton type="submit">
            <StyledSearch fill={`${theme.colors.darkgrey}`} />
          </SubmitButton>
        </InputStyle>
        <Keyword>
          {inputText !== ""
            ? data.map((x) => {
                return (
                  <PlaceData
                    onClick={() =>
                      onClick(x.x, x.y, x.address_name, x.place_name)
                    }
                  >
                    <PlaceName>{x.place_name}</PlaceName>
                    <PlaceAddress>{x.address_name}</PlaceAddress>
                  </PlaceData>
                );
              })
            : ""}
        </Keyword>
      </SearchForm>
      <Category>
        <VegeType>채식 타입</VegeType>
        {veggieIcon.map((x) => {
          return <Type src={x.img} onClick={() => setCategory(x.name)}></Type>;
        })}
      </Category>
      <MapIndex data={selData} latlng={latlng} />
    </>
  );
}

const SearchForm = styled.form`
  ${theme.device.moblie} {
    right: 2%;
    width: 14rem;
  }
  @media only screen and (min-width: 425px) {
    left: 40%;
    top: 3rem;
    width: 17.25rem;
    transform: translate(-50%, 0%);
  }
  width: 17.25rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 3rem;
  z-index: 2;
`;
const InputStyle = styled.div`
  margin-top: 0.3rem;
  width: 100%;
  position: relative;
`;
const Category = styled.div`
  @media only screen and (min-width: 425px) {
    top: 3rem;
    right: 3rem;
  }
  @media only screen and (min-width: 425px) and (max-width: 1024px) {
    flex-direction: column;
  }
  ${theme.device.mobile} {
    bottom: 3rem;
    top: 85vh;
    left: 0;
    right: 0;
  }
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: flex;
  z-index: 2;
  gap: 1rem;
`;

const Type = styled.img`
  ${theme.device.mobile} {
    width: 2.5rem;
    height: 2.5rem;
  }
  width: 3.5rem;
  height: 3.5rem;
  z-index: 2;
  border-radius: 100%;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`;

const PlaceInput = styled.input`
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 0.625rem;
  color: ${theme.colors.mapgrey};
  padding: 0 1rem;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
  :focus {
    outline: none;
  }
`;
const SubmitButton = styled.button`
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  right: 0;
  height: 3rem;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  padding: 0 1rem;
`;

const StyledSearch = styled(SearchIcon)``;
const PlaceData = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 17rem;
  height: 6rem;
  color: black;
  margin-left: 0.1rem;
`;
const PlaceName = styled.div`
  font-size: 1rem;
  margin: 0.2rem;
  color: ${theme.colors.mapgrey};
`;
const PlaceAddress = styled.div`
  font-size: 0.3rem;
  margin: 0.2rem;
  color: ${theme.colors.darkgrey};
`;
const Keyword = styled.div`
  display: flex;
  flex-direction: column;
  height: 7rem;
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const VegeType = styled.div`
  ${theme.device.mobile} {
    display: none;
  }
  width: 6em;
  height: 1.625rem;
  font-size: 0.75rem;
  padding-top: 0.2rem;
  background-color: #b96619;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  color: white;
  margin: 1rem;
  margin-right: 0.6rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
`;
