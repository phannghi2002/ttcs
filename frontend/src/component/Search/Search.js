import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config.js";

import { DefaultPage1, DefaultPage2 } from "../DefaultPage";

import Header from "../DefaultPage/Header";
// import Navbar from "../DefaultPage/Header/Navbar/Navbar";

const cx = classNames.bind(styles);

function Search() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [AirportFrom, setAirportFrom] = useState("HAN");
  const [AirportTo, setAirportTo] = useState("");
  const [depart, setDepart] = useState("");
  const [return1, setReturn] = useState("");
  const [typeTrip, setTypeTrip] = useState("");
  const [compare, setCompare] = useState(false);

  const handleGetValueAirportFrom = (e) => {
    setAirportFrom(e.target.value);
    console.log(AirportFrom);
  };
  const handleGetValueAirportTo = (e) => {
    setAirportTo(e.target.value);
  };
  const handleGetValueDepart = (e) => {
    setShow(false);
    setDepart(e.target.value);
    console.log(depart);
  };
  const handleGetValueReturn = (e) => {
    setShow(false);
    setReturn(e.target.value);
    console.log(return1);
  };
  const handleClick = (value) => {
    setShow(false);
    setTypeTrip(value);
    console.log(typeTrip);
  };

  const handleRadioClick = (e) => {
    setShow(false);
    const value = e.target.value;
    setTypeTrip(value);
  };

  useEffect(() => {
    if (typeTrip === "Oneway") {
      setCompare(true);
    } else if (typeTrip === "Roundtrip") {
      setCompare(false);
    }
    // console.log(typeTrip);
  }, [typeTrip, AirportFrom, AirportTo, depart, show]);

  async function fetchAPI() {
    let response = await fetch(
      `${BASE_URL}/search/getTicketBySearch?AirportFrom=${AirportFrom}&AirportTo=${AirportTo}&DateGo=${depart}`
    );
    let data1 = await response.json();
    setData(data1.data);
    console.log(data);
    return data1;
  }

  const handleShowFlight = () => {
    // const formElement = document.querySelector('.wrapper');
    if (!show) {
      console.log(AirportFrom, AirportTo, depart, typeTrip);
      fetchAPI();
      // formElement.classList.add('move');
    } else {
      // formElement.classList.remove('move');
    }
    setShow(!show);
  };

  // <div className={show ? `${styles.wrapper} ${styles.move}` : styles.wrapper}></div>
  return (
    <div className={cx("container")}>
      <Header />
      {/* <Navbar /> */}

      {!show && (
        <div className={cx("wrapper")}>
          <div className={cx("radio")}>
            <span className={cx("radio-content")}>
              <input
                type="radio"
                id="Oneway"
                value="Oneway"
                name="typeTrip"
                onClick={handleRadioClick}
              />
              <label htmlFor="Oneway" onClick={() => handleClick("Oneway")}>
                Một chiều
              </label>
            </span>
            <span className={cx("radio-content")}>
              <input
                type="radio"
                id="Roundtrip"
                value="Roundtrip"
                name="typeTrip"
                onClick={handleRadioClick}
              />
              <label
                htmlFor="Roundtrip"
                onClick={() => handleClick("Roundtrip")}
              >
                Khứ hồi
              </label>
            </span>
          </div>

          <div className={cx("location")}>
            <FontAwesomeIcon
              className={cx("location-icon")}
              icon={faLocationDot}
            />
            <span className={cx("name-field")}>Điểm đi</span>
            <select
              className={cx("location-list")}
              onChange={handleGetValueAirportFrom}
            >
              <optgroup label="MIỀN BẮC">
                <option value="HAN">Hà Nội (HAN) </option>
                <option value="HPH"> Hải Phòng (HPH) </option>
                <option value="DIN"> Điện Biên (DIN) </option>
                <option value="THD"> Thanh Hóa (THD) </option>
                <option value="VDO"> Quảng Ninh (VDO) </option>
              </optgroup>
              <optgroup label="MIỀN TRUNG">
                <option value="VII"> Vinh (VII) </option>
                <option value="HUI"> Huế (HUI) </option>
                <option value="VDH"> Đồng Nai (VDH) </option>
                <option value="DAD"> Đà Nẵng (DAD) </option>
                <option value="PXU"> Pleiku (PXU) </option>
                <option value="TBB"> Tuy Hòa (TBB) </option>
              </optgroup>
              <optgroup label="MIỀN NAM">
                <option value="SGN"> Hồ Chí Minh (SGN) </option>
                <option value="CXR"> Nha Trang (CXR) </option>
                <option value="DLI"> Đà Lạt (DLI) </option>
                <option value="PQC"> Phú Quốc (PQC) </option>
                <option value="VCL"> Tam Kì (VCL) </option>
                <option value="UIH"> Qui Nhơn (UIH) </option>
                <option value="VCA"> Cần Thơ (VCA) </option>
                <option value="VCS"> Côn Đảo (VCS) </option>
                <option value="BMV"> Ban Mê Thuật (BMV) </option>
                <option value="VKG"> Rạch Giá (VKG) </option>
                <option value="CAH"> Cà Mau (CAH) </option>
              </optgroup>
            </select>
          </div>
          <div className={cx("location")}>
            <FontAwesomeIcon
              className={cx("location-icon")}
              icon={faLocationDot}
            />
            <span className={cx("name-field")}>Điểm đến</span>
            <select
              className={cx("location-list")}
              onChange={handleGetValueAirportTo}
            >
              <optgroup label="MIỀN BẮC">
                <option value="HAN">Hà Nội (HAN) </option>
                <option value="HPH"> Hải Phòng (HPH) </option>
                <option value="DIN"> Điện Biên (DIN) </option>
                <option value="THD"> Thanh Hóa (THD) </option>
                <option value="VDO"> Quảng Ninh (VDO) </option>
              </optgroup>
              <optgroup label="MIỀN TRUNG">
                <option value="VII"> Vinh (VII) </option>
                <option value="HUI"> Huế (HUI) </option>
                <option value="VDH"> Đồng Nai (VDH) </option>
                <option value="DAD"> Đà Nẵng (DAD) </option>
                <option value="PXU"> Pleiku (PXU) </option>
                <option value="TBB"> Tuy Hòa (TBB) </option>
              </optgroup>
              <optgroup label="MIỀN NAM">
                <option value="SGN"> Hồ Chí Minh (SGN) </option>
                <option value="CXR"> Nha Trang (CXR) </option>
                <option value="DLI"> Đà Lạt (DLI) </option>
                <option value="PQC"> Phú Quốc (PQC) </option>
                <option value="VCL"> Tam Kì (VCL) </option>
                <option value="UIH"> Qui Nhơn (UIH) </option>
                <option value="VCA"> Cần Thơ (VCA) </option>
                <option value="VCS"> Côn Đảo (VCS) </option>
                <option value="BMV"> Ban Mê Thuật (BMV) </option>
                <option value="VKG"> Rạch Giá (VKG) </option>
                <option value="CAH"> Cà Mau (CAH) </option>
              </optgroup>
            </select>
          </div>
          <div className={cx("time")}>
            <div className={cx("time-content")}>
              <span className={cx("name-field")}>Ngày đi</span>
              <input
                className={cx("input-date")}
                type="date"
                name="txtDate"
                id="txtDate"
                min="2000-01-01"
                onChange={handleGetValueDepart}
              />
            </div>
            {!compare && (
              <div className={cx("time-content", "left-6")}>
                <span className={cx("name-field")}>Ngày về</span>
                <input
                  className={cx("input-date")}
                  type="date"
                  name="txtDate"
                  id="txtDate"
                  min="2000-01-01"
                  onChange={handleGetValueReturn}
                />
              </div>
            )}
          </div>

          <div className={cx("submit")}>
            <button className={cx("submit-btn")} onClick={handleShowFlight}>
              Tìm chuyến bay
            </button>
          </div>
        </div>
      )}

      {show && (
        <div className={cx("info")}>
          {typeTrip === "Roundtrip" && (
            <DefaultPage1 data={data} typeTrip={typeTrip} return1={return1} />
          )}
          {typeTrip !== "Roundtrip" && (
            <DefaultPage2 data={data} typeTrip={typeTrip} />
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
