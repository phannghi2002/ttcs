/* eslint-disable react-hooks/exhaustive-deps */
import "./DefaultPage.scss";
import VNA from "../../asset/images/Vietnam_Airlines.png";
import VJ from "../../asset/images/VietJet_Air_logo.svg.png";
import QH from "../../asset/images/bambo.jpg";
import BL from "../../asset/images/Pacific_Airline.png";
import InforFlight from "../InforFlight";
import InforFlightRoundTrip from "../InforFlightRoundTrip";
import NotFoundFlight from "../NotFoundFlight";
import { useState } from "react";

export function DefaultPage1({
  data,
  typeTrip,
  handleConvert,
  handleSwitchPage,
  switchPage,
}) {
  if (data[0]) {
    const d = new Date(data[0].DateGo);
    const dateConvert = d.toLocaleDateString("en-GB");
    // console.log(dateConvert);
    return (
      <div className="contain roundtrip">
        <div className="info_flight mb-5 pt-4">
          <h2 className="title"> Information Flight</h2>
          <h4>Ngày đi: {dateConvert}</h4>
          <h5>Điểm đi: {data[0].AirportFrom}</h5>
          <h5>Điểm đến: {data[0].AirportTo}</h5>
        </div>

        {/* eslint-disable-next-line array-callback-return */}
        {data.map((item, key) => {
          return (
            <div key={item._id}>
              {item.AirlineCode === "VNA" && (
                <div className="container wrapper_info">
                  <img src={VNA} alt="Vietnam Airlines" className="image" />

                  <InforFlightRoundTrip
                    item={item}
                    name="Vietnam Airlines"
                    handleConvert={handleConvert}
                    handleSwitchPage={handleSwitchPage}
                    switchPage={switchPage}
                  />
                </div>
              )}

              {item.AirlineCode === "VJ" && (
                <div className="container wrapper_info">
                  <img src={VJ} alt="VietJet" className="image" />

                  <InforFlightRoundTrip
                    item={item}
                    name="VietJet Air"
                    handleConvert={handleConvert}
                    handleSwitchPage={handleSwitchPage}
                    switchPage={switchPage}
                  />
                </div>
              )}

              {item.AirlineCode === "QH" && (
                <div className="container wrapper_info">
                  <img src={QH} alt="BamBo" className="image" />

                  <InforFlightRoundTrip
                    item={item}
                    name="BamBo Airways"
                    handleConvert={handleConvert}
                    handleSwitchPage={handleSwitchPage}
                    switchPage={switchPage}
                  />
                </div>
              )}

              {item.AirlineCode === "BL" && (
                <div className="container wrapper_info">
                  <img src={BL} alt="Pacific" className="image" />

                  <InforFlightRoundTrip
                    item={item}
                    name="Jetstar Pacific Airlines"
                    handleConvert={handleConvert}
                    handleSwitchPage={handleSwitchPage}
                    switchPage={switchPage}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

//Oneway
export function DefaultPage2({
  data,
  typeTrip,
  onData,
  AirportFrom,
  AirportTo,
  depart,
}) {
  // console.log(AirportFrom, AirportTo, depart);
  const formattedDate = new Date(depart).toLocaleDateString("en-GB");
  // console.log(formattedDate);

  const sendDataToParent = (value) => {
    // onData(handleOption());
    // console.log("kiemer tra lai xem", handleOption());

    onData(value);
    // console.log("Value sent to parent:", value);
  };

  // console.log("ko co du lieu:", data);

  if (data.length === 0) {
    console.log("m ngu lam nghi à");
  }
  const handleOption = (e) => {
    return e.target.value;
  };

  const [progress, setProgress] = useState(240);

  const convertToHourMinute = (progress) => {
    const hours = Math.floor(progress / 60);
    const minutes = progress % 60;
    return `${hours}h${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const handleProgressChange = (event) => {
    const value = parseInt(event.target.value);
    setProgress(value);
    console.log(value);
  };

  let filteredData = data;
  //const [filteredData, setFilterData] = useState(data);

  if (data) {
    filteredData = data.filter((item) => progress >= item.Duration);
    console.log(filteredData);
  }

  // const handleFilter = () => {
  //   if (filteredData) {
  //     // filteredData = data.filter((item) => progress >= item.Duration);
  //     setFilterData(data.filter((item) => progress >= item.Duration));

  //     console.log(filteredData);
  //   }
  // };

  return (
    <div className="contain">
      <div className="wrapper_5">
        <div className="info_flight mb-5 pt-4">
          <h2 className="title"> Information Flight</h2>
          <h4>Ngày đi: {formattedDate}</h4>
          <h5>Điểm đi: {AirportFrom}</h5>
          <h5>Điểm đến: {AirportTo}</h5>
        </div>

        <div className="info_flight_1 mb-5 pt-4">
          <div>
            <h6> Tìm kiếm theo hãng bay</h6>
            <div
              className="radio-content"
              onClick={(e) => sendDataToParent(handleOption(e))}
            >
              <input
                type="radio"
                id="VNA"
                value="VNA"
                name="company"
                onChange={(e) => handleOption(e)}
              />
              <label htmlFor="VNA">Vietnam Airlines</label>
            </div>

            <div
              className="radio-content"
              onClick={(e) => sendDataToParent(handleOption(e))}
            >
              <input
                type="radio"
                id="QH"
                value="QH"
                name="company"
                onChange={(e) => handleOption(e)}
              />
              <label htmlFor="QH">BamBo Airways</label>
            </div>
            <div
              className="radio-content"
              onClick={(e) => sendDataToParent(handleOption(e))}
            >
              <input
                type="radio"
                id="BL"
                value="BL"
                name="company"
                onChange={(e) => handleOption(e)}
              />
              <label htmlFor="BL">Jetstar Pacific Airlines</label>
            </div>
            <div
              className="radio-content"
              onClick={(e) => sendDataToParent(handleOption(e))}
            >
              <input
                type="radio"
                id="VJ"
                value="VJ"
                name="company"
                onChange={(e) => handleOption(e)}
              />
              <label htmlFor="VJ">VietJet Air</label>
            </div>

            <div
              className="radio-content"
              onClick={(e) => sendDataToParent(handleOption(e))}
            >
              <input
                type="radio"
                id="all"
                value="all"
                name="company"
                defaultChecked
                onChange={(e) => handleOption(e)}
              />
              <label htmlFor="all">Tất cả các hãng hàng không</label>
            </div>
          </div>

          <div>
            Tìm kiếm theo thời lượng bay
            <input
              type="range"
              min="30"
              max="240"
              value={progress}
              onChange={handleProgressChange}
              // onMouseUp={handleFilter}
              className="progress-bar"
              step={15}
            />
            <p>Progress: 0.5h- {convertToHourMinute(progress)}</p>
          </div>
        </div>
      </div>
      {filteredData[0] &&
        filteredData.map((item, key) => {
          return (
            <div key={item._id}>
              {item.AirlineCode === "VNA" && (
                <div className="container">
                  <img src={VNA} alt="Vietnam Airlines" className="image" />

                  <InforFlight item={item} name="Vietnam Airlines" />
                </div>
              )}

              {item.AirlineCode === "VJ" && (
                <div className="container">
                  <img src={VJ} alt="VietJet" className="image" />

                  <InforFlight item={item} name="VietJet Air" />
                </div>
              )}

              {item.AirlineCode === "QH" && (
                <div className="container">
                  <img src={QH} alt="BamBo" className="image" />

                  <InforFlight item={item} name="BamBo Airways" />
                </div>
              )}

              {item.AirlineCode === "BL" && (
                <div className="container">
                  <img src={BL} alt="Pacific" className="image" />

                  <InforFlight item={item} name="Jetstar Pacific Airlines" />
                </div>
              )}
            </div>
          );
        })}

      {filteredData.length === 0 && <NotFoundFlight />}
    </div>
  );
}
