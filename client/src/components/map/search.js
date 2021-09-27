import React, { useEffect, useState } from "react";
import MapIndex from "./index";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectPlace } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
    var places = new kakao.maps.services.Places();
    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setData(result);
        console.log(result);
        return result;
      }
    };
    places.keywordSearch(inputText, callback, {
      x: mapCenter.x,
      y: mapCenter.y,
      radius: 1000,
    });
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
        <div>
          {" "}
          <PlaceInput
            placeholder="Search Place..."
            onChange={onChange}
            value={inputText}
          />
          <SubmitButton type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </SubmitButton>
        </div>
        <Keyword>
          {data.map((x) => {
            return (
              <PlaceData
                onClick={() => onClick(x.x, x.y, x.address_name, x.place_name)}
              >
                <PlaceName>{x.place_name}</PlaceName>
                <PlaceAddress>{x.address_name}</PlaceAddress>
              </PlaceData>
            );
          })}
        </Keyword>
      </SearchForm>
      <Category>
        {veggieIcon.map((x) => {
          return (
            <Type src={x.img} onClick={() => setCategory(x.name)}>
              {" "}
              {x.name}
            </Type>
          );
        })}
      </Category>
      <MapIndex data={selData} latlng={latlng} />
    </>
  );
}

const SearchForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 3rem;
  right: 30%;
  z-index: 2;
`;
const Category = styled.div`
  position: absolute;
  flex-direction: row;
  display: flex;
  top: 3rem;
  right: 10%;
  display: flex;
  z-index: 2;
`;

const Type = styled.image`
  width: 3rem;
  height: 3rem;
`;

const PlaceInput = styled.input`
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  width: 20rem;
  height: 2rem;
  border-radius: 0.2rem;
  color: ${theme.colors.mapgrey};
`;
const SubmitButton = styled.button`
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  right: 0;
  top: 0;
  font-size: 1.8rem;
`;
const PlaceData = styled.div`
  background-color: rgba(255, 255, 255, 0.6);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20rem;
  height: 6rem;
  color: black;
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
  width: 20rem;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
