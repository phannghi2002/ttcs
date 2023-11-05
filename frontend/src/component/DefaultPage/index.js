import "./DefaultPage.scss";
import VNA from "../../asset/images/Vietnam_Airlines.png";
import VJ from "../../asset/images/VietJet_Air_logo.svg.png";
import QH from "../../asset/images/bambo.jpg";
import BL from "../../asset/images/Pacific_Airline.png";
import InforFlight from "../InforFlight";

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
      <h2 className="title"> Information aor mjr Flight</h2>

      {/* eslint-disable-next-line array-callback-return */}
      {data1.map((item, key) => {
        if (item.AirlineCode === "VNA") {
          return (
            <div key={item._id} className="container">
              <img src={VNA} alt="Vietnam Airlines" className="image" />
              {item.AirlineCode}

              <InforFlight item={item} />
            </div>
          );
        } else if (item.AirlineCode === "VJ") {
          return (
            <div key={item._id} className="container">
              <img src={VJ} alt="VietJet" className="image" />
              {item.AirlineCode}

              <InforFlight item={item} />
            </div>
          );
        } else if (item.AirlineCode === "QH") {
          return (
            <div key={item._id} className="container">
              <img src={QH} alt="BamBo" className="image" />
              {item.AirlineCode}

              <InforFlight item={item} />
            </div>
          );
        } else if (item.AirlineCode === "BL") {
          return (
            <div key={item._id} className="container">
              <img src={BL} alt="Pacific" className="image" />
              {item.AirlineCode}

              <InforFlight item={item} />
            </div>
          );
        }

        // console.log(item);
        // return <div>Duration: {item.Duration}</div>;
      })}
    </div>
  );
}

//Oneway
export function DefaultPage2({ data, typeTrip }) {
  if (data[0]) {
    const d = new Date(data[0].DateGo);
    const dateConvert = d.toLocaleDateString("en-GB");
    // console.log(dateConvert);
    return (
      <div className="contain ms-3">
        <div className="info_flight mb-3">
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

                  <InforFlight item={item} name="etstar Pacific Airlines" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
