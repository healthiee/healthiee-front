import { useState, Fragment, useEffect } from "react";
import { Map, MapMarker,} from "react-kakao-maps-sdk";
import {ReactComponent as LocationOn} from '../../assets/images/locationOn.svg';
import {ReactComponent as Search} from '../../assets/images/search.svg';
import styles from './Kakao.module.css';
import locationAddress from '../../assets/images/locationAddress.png'


const { kakao } = window;
const markerImg = locationAddress;

const Kakao = (props) => {

  const [position, setPosition] = useState({
    lat: 33.5563, lng: 126.79581
  }); // 클릭된 주소의 좌표
  const [address, setAddress] = useState(null); // 클릭된 주소의 좌표를 주소로 변환
  const [search, setSearch] = useState(); // 원하는 주소 검색

  // 현재 위치

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  },[])

  const successHandler = (response) => {
		console.log(response);
		const { latitude, longitude } = response.coords;
		setPosition({ lat: latitude, lng: longitude });
	};

	const errorHandler = (error) => {
		console.log(error);
	};

  // 장소 검색

  const SearchMap = () => {
    const ps = new kakao.maps.services.Places()
    const placesSearchCB = function(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = data[0]
        setPosition({lat : newSearch.y, lng : newSearch.x})
      }
    };
    ps.keywordSearch(`${search}`, placesSearchCB); 
  }

  // address

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const addressHandler = (_t, mouseEvent) => {

    const lat = mouseEvent.latLng.getLat(); // 위도
    const lng = mouseEvent.latLng.getLng(); // 경도

    setPosition({lat, lng});

    const geocoder = new kakao.maps.services.Geocoder();
		const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력

		const callback = function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setAddress(result[0].address.address_name);
			}
		};

		geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  // 주소값 보내기
  useEffect(()=>{
    props.onLocation(position, address);
  },[position,address])

  return(
    <Fragment>

      <div className={styles.search}>
        <div className={styles.search_input}>
          <Search className={styles.search_icon}/>
          <input type="text" onChange={searchHandler} placeholder='관련위치를 검색하세요.'/>
        </div>
        <div className={styles.search_btn}>
          <button type="button" onClick={SearchMap}>확인</button>
        </div>
      </div>

      <div className={styles.location}>
        <div className={styles.lo_img}><LocationOn width='32px' height='32px' fill="white"/></div>
        <div className={styles.lo_address}>{address}</div>
      </div>

      <Map className={styles.map} center={position} isPanto={true}
      style={{ width: '300px', height: '200px' }}
      level={3} onClick={addressHandler}>
        {position && <MapMarker position={position} image={{src:markerImg, size:{width:22, height:22}}}/>}
      </Map>
    
    </Fragment>
  )
};

export default Kakao;