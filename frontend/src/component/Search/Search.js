/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config.js";

import { DefaultPage1, DefaultPage2 } from "../DefaultPage";

import Header from "../DefaultPage/Header";
import Content from "./Content";
import Footer from "../DefaultPage/Footer";
// import { Link } from "react-router-dom";
// import Navbar from "../DefaultPage/Header/Navbar/Navbar";

const cx = classNames.bind(styles);

function Search() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [AirportFrom, setAirportFrom] = useState("HAN");
  const [AirportTo, setAirportTo] = useState("");
  const [depart, setDepart] = useState("");
  const [return1, setReturn] = useState("");
  const [typeTrip, setTypeTrip] = useState("");
  const [compare, setCompare] = useState(false);
  const [convert, setConvert] = useState(true);

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

  // const [dataFromChild, setDataFromChild] = useState("all");

  const handleDataFromChild = (dataFromChild) => {
    if (dataFromChild === "all" || dataFromChild === "") {
      fetchAPI1();
      console.log("có lọt vào đây ko nhủ");
    } else if (dataFromChild) {
      fetchAPI3(dataFromChild);
      console.log("thảo nào nó sai ", dataFromChild);
    }
  };

  useEffect(() => {
    if (typeTrip === "Oneway") {
      setCompare(true);
    } else if (typeTrip === "Roundtrip") {
      setCompare(false);
    }
    // console.log(typeTrip);
  }, [typeTrip, AirportFrom, AirportTo, depart, show]);

  async function fetchAPI1() {
    let response = await fetch(
      `${BASE_URL}/search/getTicketBySearch?AirportFrom=${AirportFrom}&AirportTo=${AirportTo}&DateGo=${depart}`
    );
    let data1 = await response.json();
    setData(data1.data);
    console.log("sao sai nhỉ");
    return data1;
  }

  async function fetchAPI3(dataFromChild) {
    console.log("m bu ngu a", dataFromChild);

    let response = await fetch(
      `${BASE_URL}/search/getTicketBySearchCompany?AirportFrom=${AirportFrom}&AirportTo=${AirportTo}&DateGo=${depart}&AirlineCode=${dataFromChild}`
    );
    let data1 = await response.json();
    setData(data1.data);
    console.log("đù má éo được ta", data);
    return data1;
  }

  async function fetchAPI2() {
    let response = await fetch(
      `${BASE_URL}/search/getTicketBySearch?AirportFrom=${AirportTo}&AirportTo=${AirportFrom}&DateGo=${return1}`
    );
    let data1 = await response.json();
    setData2(data1.data);
    console.log("in ra anh xem nao", data2);
    return data1;
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.id === "txtDate") {
      handleShowFlight();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [depart, return1]);
  const handleShowFlight = () => {
    // const formElement = document.querySelector('.wrapper');
    if (!show) {
      console.log(AirportFrom, AirportTo, depart, typeTrip);

      fetchAPI1();

      // localStorage.setItem("TypeTrip", typeTrip);

      //convert string to JSON to storage in localStorage
      localStorage.setItem("TypeTrip", JSON.stringify(typeTrip));

      const storedTypeTrip = JSON.parse(localStorage.getItem("TypeTrip"));

      console.log(storedTypeTrip);
    }

    if (typeTrip === "Roundtrip") {
      fetchAPI2();
    }

    setShow(!show);
  };

  const handleConvert = () => {
    setConvert(!convert);
    // alert("heibro");
  };

  const [, setSwitchPage] = useState(false);
  const handleSwitchPage = () => {
    setSwitchPage(true);
  };
  const functionNothing = () => {};
  return (
    <div className={cx("container")}>
      <Header />

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
            <span className={cx("roundtrip")}>
              <div className={cx({ depart: convert, return: !convert })}>
                <span onClick={handleConvert}> Chuyến đi</span>
                <div className={cx({ return_0: !convert })}>
                  <DefaultPage1
                    data={data}
                    typeTrip={typeTrip}
                    handleConvert={handleConvert}
                    handleSwitchPage={functionNothing}
                  />
                </div>
              </div>

              <div className={cx({ depart: !convert, return: convert })}>
                <span onClick={handleConvert}> Chuyến về</span>
                <div className={cx({ return_0: convert })}>
                  <DefaultPage1
                    data={data2}
                    typeTrip={typeTrip}
                    handleConvert={functionNothing}
                    handleSwitchPage={handleSwitchPage}
                    switchPage="true"
                  />
                </div>
              </div>
            </span>
          )}
          {typeTrip === "Oneway" && (
            <DefaultPage2
              data={data}
              typeTrip={typeTrip}
              onData={handleDataFromChild}
              AirportFrom={AirportFrom}
              AirportTo={AirportTo}
              depart={depart}
            />
          )}
        </div>
      )}

      <Content />
      <Footer />
    </div>
  );
}

export default Search;
