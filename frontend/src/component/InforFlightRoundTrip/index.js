import './InforFlightRoundTrip.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function InforFlightRoundTrip({ item, name, handleConvert, handleSwitchPage, switchPage }) {
    const [moneyAdult, setMoneyAdult] = useState(item.BusinessClass.PriceAdult);
    const [moneyChildren, setMoneyChildren] = useState(item.BusinessClass.PriceChildren);

    // const [show, setShow] = useState(true);
    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState(0);
    const [total, setTotal] = useState(moneyAdult);

    //change value total when click add or subtract quantity
    useEffect(() => {
        setTotal(moneyAdult * value1 + moneyChildren * value2);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value1, value2, moneyAdult, moneyChildren]);

    const handleClickAddAdult = (value) => {
        setValue1(value + 1);
    };
    const handleClickSubtractAdult = (value) => {
        setValue1(value - 1);
    };

    const handleClickAddChildren = (value) => {
        setValue2(value + 1);
    };
    const handleClickSubtractChildren = (value) => {
        setValue2(value - 1);
    };

    const [selectedValue, setSelectedValue] = useState('EconomyClass');

    //get value in element select
    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        // console.log(value);
        // Perform further actions with the selected value
    };

    const handleSelect = () => {
        // Store bookedButton in localStorage
        console.log(item);
        if (switchPage) {
            localStorage.setItem('inforFlightReturn', JSON.stringify({ item, selectedValue, value1, value2, total }));
            handleSwitchPage();
        } else {
            localStorage.setItem('inforFlight', JSON.stringify({ item, selectedValue, value1, value2, total }));

            handleConvert();
        }
    };

    const convertTime = (time) => {
        const date = new Date(time);
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${hour}:${minute}`;
        return formattedDateTime;
    };
    const FlightTime = convertTime(item.FlightTime);
    const LandingTime = convertTime(item.LandingTime);

    const duration = (FlightTime, LandingTime) => {
        const [startHour, startMinute] = FlightTime.split(':');
        const [endHour, endMinute] = LandingTime.split(':');

        // Convert the hours and minutes to numbers
        const startHourNum = parseInt(startHour, 10);
        const startMinuteNum = parseInt(startMinute, 10);
        const endHourNum = parseInt(endHour, 10);
        const endMinuteNum = parseInt(endMinute, 10);

        // Calculate the difference in minutes
        const hourDifference = endHourNum - startHourNum;
        const minuteDifference = endMinuteNum - startMinuteNum;
        const totalMinutes = hourDifference * 60 + minuteDifference;

        return totalMinutes;
    };
    const convertMinutesToHourMinute = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h${remainingMinutes}`;
    };

    //change value money adult, money children when change select other
    useEffect(() => {
        if (selectedValue === 'EconomyClass') {
            setMoneyAdult(item.EconomyClass.PriceAdult);
            setMoneyChildren(item.EconomyClass.PriceChildren);
        } else if (selectedValue === 'BusinessClass') {
            setMoneyAdult(item.BusinessClass.PriceAdult);
            setMoneyChildren(item.BusinessClass.PriceChildren);
            // console.log(convertTime(item.FlightTime));
        } else if (selectedValue === 'FirstClass') {
            setMoneyAdult(item.FirstClass.PriceAdult);
            setMoneyChildren(item.FirstClass.PriceChildren);
            // console.log(convertTime(item.FlightTime));
        } else {
            setMoneyAdult(item.PremiumClass.PriceAdult);
            setMoneyChildren(item.PremiumClass.PriceChildren);
            // console.log(convertTime(item.FlightTime));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue]);

    return (
        <div className="wrapper ms-3">
            <div className="container_1 me-3">
                <div className="info">
                    <div className="time">{FlightTime}</div>
                    <div className="duration">{convertMinutesToHourMinute(duration(FlightTime, LandingTime))}</div>
                    <div className="line"></div>
                    <div className="time">{LandingTime}</div>
                </div>

                <div className="name">{name}</div>
            </div>

            <div className="container_3">
                <span className="me-4 type_flight">
                    <select name="travelClass" onChange={handleSelectChange} value={selectedValue}>
                        <option value="BusinessClass">Business Class</option>
                        <option value="EconomyClass">Economy Class</option>
                        <option value="FirstClass">First Class</option>
                        <option value="PremiumClass">Premium Class</option>
                    </select>
                </span>
                <span className="me-4 traveller">
                    <span>
                        Người lớn:
                        <button className="ms-1" disabled={!value1} onClick={() => handleClickSubtractAdult(value1)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input type="number" value={value1} readOnly />
                        <button onClick={() => handleClickAddAdult(value1)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </span>

                    {!!value1 && <span className="money"> {moneyAdult * value1}</span>}
                </span>
                <span className="traveller">
                    <span>
                        Trẻ em:
                        <button className="ms-1" disabled={!value2} onClick={() => handleClickSubtractChildren(value2)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input type="number" value={value2} readOnly />
                        <button onClick={() => handleClickAddChildren(value2)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </span>

                    {!!value2 && <span className="money"> {moneyChildren * value2}</span>}
                </span>
                <span className="total ms-3">
                    <h5 className="total_1">Tổng</h5>
                    <div className="total_2">{total}</div>
                </span>

                {
                    <span className="ms-3">
                        {/* {navigate("/searchFlightRoundtrip")} */}
                        {/* if not use Link then can use ("/searchFlightRoundtrip/check") */}
                        {/* <Link to="check"> */}
                        {/* {!switchPage && (
              <Button className="select" onClick={handleSelect}>
                Select <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            )}
            {/* </Link> 

            {switchPage && (
              <Link to="check">
                <Button className="select" onClick={handleSelect}>
                  Select <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </Link>
            )} */}
                        {!switchPage ? (
                            <Button className="select" onClick={handleSelect}>
                                Chọn <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                        ) : (
                            <Link to="check">
                                <Button className="select" onClick={handleSelect}>
                                    Chọn <FontAwesomeIcon icon={faArrowRight} />
                                </Button>
                            </Link>
                        )}
                    </span>
                }
            </div>
        </div>
    );
}

export default InforFlightRoundTrip;
