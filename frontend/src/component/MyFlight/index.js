import classNames from "classnames/bind";
import styles from "./MyFlight.module.scss";
import { useEffect } from "react";

import { BOOKED_URL } from "../../utils/config";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import GetAllData from "../GetAllData";
import Header from "../DefaultPage/Header";

const cx = classNames.bind(styles);

function MyFlight() {
  const [data, setData] = useState("");
  const [CodeTicket, setCodeTicket] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  async function fetchAPI() {
    let response = await fetch(
      `${BOOKED_URL}/search/getInfoBookedBySearch?CodeTicket=${CodeTicket}`
    );

    let data1 = await response.json();
    setData(data1.data);
    console.log(data);
    return data1;
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.id === "code") {
      handleSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CodeTicket]);

  const handleSearch = () => {
    fetchAPI();
    setShowInfo(!showInfo);
  };

  return (
    <div className={cx("wrapper")}>
      <Header />

      <span className={cx("search")}>
        Nhập mã CODE của bạn:&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          id="code"
          onChange={(e) => {
            setCodeTicket(e.target.value);
          }}
        ></input>
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </span>

      {showInfo && (
        <div className={cx("show")}>
          <GetAllData codeTicket={CodeTicket} />
        </div>
      )}
    </div>
  );
}

export default MyFlight;
