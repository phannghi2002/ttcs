// import { useEffect, useState } from "react";
import { useState } from "react";

import GetAllData from "../GetAllData";
import "./Paying.scss";
import Header from "../DefaultPage/Header";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
let codeTicket = "";

const randomCharacters = () => {
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

codeTicket = randomCharacters();

function Paying() {
  const [show, setShow] = useState(false);

  const storedInforFlight = JSON.parse(localStorage.getItem("inforFlight"));
  const storedInforPerson = JSON.parse(localStorage.getItem("inforPerson"));
  const storedInforSeat = JSON.parse(localStorage.getItem("bookedButton"));
  const storedTypeTrip = JSON.parse(localStorage.getItem("TypeTrip"));

  // const data = {
  //   TypeFlight: storedTypeTrip,
  //   TypeTicket: storedInforFlight.selectedValue,
  //   AirportFrom: storedInforFlight.item.AirportFrom,
  //   AirportTo: storedInforFlight.item.AirportTo,
  //   FlightTime: storedInforFlight.item.Oneway.FlightTime,
  //   LandingTime: storedInforFlight.item.Oneway.LandingTime,
  //   DateGo: storedInforFlight.item.DateGo,
  //   TotalMoney: storedInforFlight.total,
  //   CodeTicket: codeTicket,
  //   FlightNumber: storedInforFlight.item.FlightNumber,
  //   UserName: storedInforPerson.Username,
  //   ID_Card: storedInforPerson.ID_Card,
  //   CodeSeat: storedInforSeat.join(" - "),
  //   Email: storedInforPerson.Email,
  // };

  const data = {
    TypeFlight: storedTypeTrip,
    TypeTicket: storedInforFlight.selectedValue,
    AirportFrom: storedInforFlight.item.AirportFrom,
    AirportTo: storedInforFlight.item.AirportTo,
    FlightTime: storedInforFlight.item[storedTypeTrip].FlightTime,
    LandingTime: storedInforFlight.item[storedTypeTrip].LandingTime,
    DateGo: storedInforFlight.item.DateGo,
    TotalMoney: storedInforFlight.total,
    CodeTicket: codeTicket,
    FlightNumber: storedInforFlight.item.FlightNumber,
    UserName: storedInforPerson.Username,
    ID_Card: storedInforPerson.ID_Card,
    CodeSeat: storedInforSeat.join(" - "),
    Email: storedInforPerson.Email,
  };
  console.log(data);

  // const [email1,setEmail1] = useState('')

  // let storedMyData = JSON.parse(localStorage.getItem("myData"));
  // console.log(storedMyData);

  // //use useEffect to get right codeTicket in Mongdb
  // useEffect(() => {
  //   localStorage.setItem("myData", JSON.stringify(data));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const sendInfoData = () => {
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
  };

  const handlePay = () => {
    setShow(true);

    sendInfoData();
    handleSendEmail();

    setTimeout(() => {
      localStorage.clear();
    });
  };

  // const email = "minh10a1quangtrung@gmail.com";
  // const code = "AJHHF";

  const handleSendEmail = async (e) => {
    const res = await fetch("http://localhost:4000/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.Email,
        code: data.CodeTicket,
      }),
    });
    console.log(res);
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
        {/* <button onClick={handleSendEmail}>Send Email</button> */}
        {show && <GetAllData data={data} />}
        {/* {show && <GetAllData data={storedMyData} />} */}
      </div>
    </div>
  );
}

export default Paying;

// "TypeFlight": "OneWay",
//     "TypeTicket" : "Economy Class",
//     "AirportFrom": "HAN",
//     "AirportTo": "SGN",
//     "FlightTime": "2024-01-01T04:30:00.000Z",
//    "LandingTime": "2024-01-01T06:55:00.000Z",
//    "DateGo": "2024-01-01T00:00:00.000Z",
//    "TotalMoney": 10000000,
//    "CodeTicket": "ERSAF",
//    "FlightNumber":"QH03",
//    "UserName": "Tran Linh",
//    "ID_Card": "21001125",
//    "CodeSeat": "8A",
//    "Email":"linh10a1@gmail.com"
