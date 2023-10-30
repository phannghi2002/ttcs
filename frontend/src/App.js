import { useEffect, useState } from "react";
import "./App.scss";
import background from "./asset/images/background1.jpg";
import { BASE_URL } from "./utils/config";
// import useFetch from "./hooks/useFetch";
// import { BASE_URL } from "./utils/config";
import { DefaultPage1, DefaultPage2 } from "./component/DefaultPage";
import Check from "./component/Check";

function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [AirportFrom, setAirportFrom] = useState("");
  const [AirportTo, setAirportTo] = useState("");
  const [depart, setDepart] = useState("");
  const [return1, setReturn] = useState("");
  const [typeTrip, setTypeTrip] = useState("");
  const [compare, setCompare] = useState(false);

  const handleGetValueAirportFrom = (e) => {
    setAirportFrom(e.target.value);
  };
  const handleGetValueAirportTo = (e) => {
    setAirportTo(e.target.value);
  };
  const handleGetValueDepart = (e) => {
    setShow(false);
    setDepart(e.target.value);
  };
  const handleGetValueReturn = (e) => {
    setShow(false);
    setReturn(e.target.value);
  };
  const handleClick = (value) => {
    setShow(false);
    setTypeTrip(value);
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
  }, [typeTrip]);

  async function fetchAPI() {
    let response = await fetch(
      `${BASE_URL}/search/getTicketBySearch?AirportFrom=${AirportFrom}&AirportTo=${AirportTo}&DateGo=${depart}`
    );
    let data1 = await response.json();
    setData(data1.data);
    return data1;
  }

  const handleShowFlight = () => {
    const formElement = document.querySelector(".form");
    if (!show) {
      fetchAPI();
      formElement.classList.add("move");
    } else {
      formElement.classList.remove("move");
    }
    setShow(!show);
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="form">
        <div className="type">
          <div className="me-5">
            <input
              type="radio"
              id="Oneway"
              value="Oneway"
              name="typeTrip"
              onClick={handleRadioClick}
            />
            <label htmlFor="Oneway" onClick={() => handleClick("Oneway")}>
              One way
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="Roundtrip"
              value="Roundtrip"
              name="typeTrip"
              onClick={handleRadioClick}
            />
            <label htmlFor="Roundtrip" onClick={() => handleClick("Roundtrip")}>
              Round trip
            </label>
          </div>
        </div>

        <div>
          <div>
            FLYING FROM
            <br />
            <input
              type="text"
              placeholder="City or airport"
              onChange={handleGetValueAirportFrom}
              value={AirportFrom}
            />
          </div>

          <div>
            FLYING TO
            <br />
            <input
              type="text"
              placeholder="City or airport"
              onChange={handleGetValueAirportTo}
              value={AirportTo}
            />
          </div>
        </div>

        <div className="info">
          <div>
            DEPARTING <br />
            <input type="text" value={depart} onChange={handleGetValueDepart} />
          </div>
          {!compare && (
            <div>
              RETURNING <br />
              <input
                type="text"
                value={return1}
                onChange={handleGetValueReturn}
              />
            </div>
          )}
        </div>

        <div>
          <div>
            {/* TRAVEL CLASS <br />
            <select name="travelClass">
              <option value="indian">Bussiness Class</option>
              <option value="nepali">Economy Class</option>
            </select> */}
            <button className="show_flight mt-3" onClick={handleShowFlight}>
              SHOW FLIGHTS
            </button>
          </div>
        </div>
      </div>
      {show && typeTrip === "Roundtrip" && (
        <DefaultPage1 data={data} typeTrip={typeTrip} return1={return1} />
      )}

      {show && typeTrip !== "Roundtrip" && (
        <DefaultPage2 data={data} typeTrip={typeTrip} />
      )}

      {false && <Check />}
    </div>
  );
}

export default App;
