import { useState } from "react";
import GetAllData from "../GetAllData";
import "./Paying.scss";
import Header from "../DefaultPage/Header";

function Paying() {
  const [show, setShow] = useState(false);
  const storedInforFlight = JSON.parse(localStorage.getItem("inforFlight"));
  const storedInforPerson = JSON.parse(localStorage.getItem("inforPerson"));
  const storedInforSeat = JSON.parse(localStorage.getItem("bookedButton"));

  const randomCharacters = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let codeTicket = "";

    for (let i = 0; i < 6; i++) {
      if (i === 4) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        codeTicket += numbers[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * letters.length);
        codeTicket += letters[randomIndex];
      }
    }

    return codeTicket;
  };
  const codeTicket = randomCharacters();

  const handlePay = () => {
    setShow(!show);

    const data = {
      TypeFlight: "Oneway",
      TypeTicket: storedInforFlight.selectedValue,
      AirportFrom: storedInforFlight.item.AirportFrom,
      AirportTo: storedInforFlight.item.AirportTo,
      FlightTime: storedInforFlight.item.Oneway.FlightTime,
      LandingTime: storedInforFlight.item.Oneway.LandingTime,
      DateGo: storedInforFlight.item.DateGo,
      TotalMoney: storedInforFlight.total,
      CodeTicket: codeTicket,
      FlightNumber: storedInforFlight.item.FlightNumber,
      UserName: storedInforPerson.Username,
      ID_Card: storedInforPerson.ID_Card,
      CodeSeat: storedInforSeat[0],
      Email: storedInforPerson.Email,
    };

    fetch("http://localhost:4000/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent successfully");
        } else {
          console.error("Error sending data:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });

    fetch("http://localhost:4000/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   to: ""
      // }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent successfully");
        } else {
          console.error("KO ON ROI:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("LOI ROI", error);
      });
  };

  return (
    <div className="wrapper_pay">
      <Header />

      <div className="contain_pay">
        <h3 className="pay">Infomation Pay</h3>

        <div>
          TypeCard
          <select name="typeCard">
            <option value="visa">Visa</option>
            <option value="economy">Economy Class</option>
          </select>
        </div>
        <div>ID Card</div>

        <button onClick={handlePay}>Paying</button>

        {show && <GetAllData codeTicket={codeTicket} />}
      </div>
    </div>
  );
}

export default Paying;
