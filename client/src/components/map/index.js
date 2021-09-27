import react, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { mapCenter, selectPlace } from "../../actions/index";
import { useHistory } from "react-router-dom";
import TutoModal from "./tuto-modal";
const { kakao } = window;

const API_KEY = "8ae459a51f5b018322fee10f7aa86f24";

export default function MapIndex({ data, latlng }) {
  const selPlace = useSelector((state) => state.selectPlace);
  const MapCenter = useSelector((state) => state.MapCenter);
  const history = useHistory();
  const [isOpen,setIsOpen] = useState(false)
  const [tutorial,setTutorial] = useState(false)
  let lng =
    MapCenter.x !== 0
      ? MapCenter.x
      : selPlace.x
      ? selPlace.x
      : 126.92512436231502;
  let lat =
    MapCenter.y !== 0
      ? MapCenter.y
      : selPlace.y
      ? selPlace.y
      : 37.54994023025598;
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
      if (map.getLevel() > 4) {
        return;
      }
      let markerPosition = new kakao.maps.LatLng(selPlace.y, selPlace.x);
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      if (data.length !== 0) {
        data.map((x) => {
          let markerPosition = new kakao.maps.LatLng(x.latitude, x.longitude);
          let marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
          let iwContent = `<div>${x.title}</div>`,
            iwRemoveable = true;

          let infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });
          kakao.maps.event.addListener(marker, "click", function () {
            dispatch(
              selectPlace({
                x: x.latitude,
                y: x.longitude,
                id: x.placeId,
                name: x.title,
              })
            );
            infowindow.open(map, marker);
          });
        });
      }
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다

      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const { region_1depth_name, region_2depth_name, region_3depth_name } =
          result[0].address;
        dispatch(
          mapCenter({
            x: map.getCenter().La,
            y: map.getCenter().Ma,
            address: `${region_1depth_name} ${region_2depth_name} ${region_3depth_name}`,
          })
        );
      }
    }
  }, [selPlace, data]);

  useEffect(()=>{
    handleOpenTuto(true)
  },[])

  const handleOpenTuto=(boolean) => {
    setIsOpen(boolean)
    if(isOpen=== true ){
       setTutorial(true)
       history.push('/tutorial')
    }
  }
  const handleCloseTuto = () => {
    setIsOpen(false)
  }
  return (
    <>
      {isOpen
          ? 
        <TutoModal isOpen={isOpen}  handleClick={handleOpenTuto} handleClose={handleCloseTuto} >
            환영합니다.<p></p> ForVegiLife는 채식주의자를 위한 지도 기반 서비스입니다.<p></p> 여러분의 성향에 맞는 장소를 검색할 수 있고,<p></p>
            여러분만의 장소를 직접 등록할 수 있습니다.
          </TutoModal> 
          :
        null}
          <Map id="map"></Map>
    </>
  );
}

const Map = styled.div`
  position: absolute;
  max-width: 100%;
  width: 100vw;
  height: calc(100vh - 3.35rem);
`;
