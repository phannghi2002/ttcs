import "./DefaultPage.scss";
import VNA from "../../asset/images/Vietnam_Airlines.png";
import VJ from "../../asset/images/VietJet_Air_logo.svg.png";
import QH from "../../asset/images/bambo.jpg";
import BL from "../../asset/images/Pacific_Airline.png";

export function DefaultPage1({ data, typeTrip, return1 }) {
  console.log(data, typeTrip, return1);
  const formattedDateReturn = new Date(return1).toISOString();
  // console.log(formattedDateReturn);
  let data1 = [];
  // let formattedDateReturn = new Date(return1).toISOString();

  if (typeTrip === "Roundtrip" && return1) {
    data1 = data.filter(
      (item) => item.Roundtrip.DateReturn === formattedDateReturn
    );
  } else data1 = data;

  return (
    <div className="contain ms-3">
      <h2> Information Flight</h2>

      {/* eslint-disable-next-line array-callback-return */}
      {data1.map((item, key) => {
        if (item.AirlineCode === "VNA") {
          return (
            <div key={item._id}>
              <img src={VNA} alt="Vietnam Airlines" className="image" />
              {item.AirlineCode}
            </div>
          );
        } else if (item.AirlineCode === "VJ") {
          return (
            <div key={item._id}>
              <img src={VJ} alt="VietJet" className="image" />
              {item.AirlineCode}
            </div>
          );
        } else if (item.AirlineCode === "QH") {
          return (
            <div key={item._id}>
              <img src={QH} alt="BamBo" className="image" />
              {item.AirlineCode}
            </div>
          );
        } else if (item.AirlineCode === "BL") {
          return (
            <div key={item._id}>
              <img src={BL} alt="Pacific" className="image" />
              {item.AirlineCode}
            </div>
          );
        }
      })}
    </div>
  );
}

export function DefaultPage2({ data, typeTrip }) {
  console.log(data, typeTrip);

  return (
    <div className="contain ms-3">
      <h2> Information Flight</h2>

      {/* eslint-disable-next-line array-callback-return */}
      {data.map((item, key) => {
        if (item.AirlineCode === "VNA") {
          return (
            <div key={item._id}>
              <img src={VNA} alt="Vietnam Airlines" className="image" />
              {item.AirlineCode}
            </div>
          );
        } else if (item.AirlineCode === "VJ") {
          return (
            <div key={item._id}>
              <img src={VJ} alt="VietJet" className="image" />
              {item.AirlineCode}
            </div>
          );
        } else if (item.AirlineCode === "QH") {
          return (
            <div key={item._id}>
              <img src={QH} alt="BamBo" className="image" />
              {item.AirlineCode}
            </div>
          );
        } else if (item.AirlineCode === "BL") {
          return (
            <div key={item._id}>
              <img src={BL} alt="Pacific" className="image" />
              {item.AirlineCode}
            </div>
          );
        }
      })}
    </div>
  );
}
