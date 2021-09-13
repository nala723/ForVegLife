import react, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { mapCenter } from "../../actions/index";
const { kakao } = window;

const API_KEY = "8ae459a51f5b018322fee10f7aa86f24";

export default function MapIndex({ latlng }) {
  console.log(latlng);
  let lng = latlng.x !== 0 ? latlng.x : 127.10676860117488;
  let lat = latlng.y !== 0 ? latlng.y : 37.365264512305174;
  const dispatch = useDispatch();
  useEffect(() => {
    let address = "";
    const container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();
    map.setDraggable(true);
    kakao.maps.event.addListener(map, "tilesloaded", function () {
      if (map.getCenter() > 4) {
        return;
      }

      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      let markerPosition = new kakao.maps.LatLng(latlng.y, latlng.x);
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다

      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "B") {
            dispatch(mapCenter({ x: result[i].x, y: result[i].y }));
            address = result[i].address_name;
            console.log(address);
          }
        }
      }
    }
  }, [latlng.x, latlng.y]);
  return (
    <>
      <Map id="map"></Map>
    </>
  );
}

const Map = styled.div`
  position: absolute;
  width: 100vw;
  height: 95vh;
  z-index: -1;
`;
