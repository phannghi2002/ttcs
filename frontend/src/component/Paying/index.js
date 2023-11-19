import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import GetAllData from '../GetAllData';
import classNames from 'classnames/bind';
import styles from './Paying.module.scss';
import Header from '../DefaultPage/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
let codeTicket = '';

const cx = classNames.bind(styles);

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
    const storedInforFlight = JSON.parse(localStorage.getItem('inforFlight'));
    const storedInforPerson = JSON.parse(localStorage.getItem('inforPerson'));
    const storedInforSeat = JSON.parse(localStorage.getItem('bookedButton'));
    const storedTypeTrip = JSON.parse(localStorage.getItem('TypeTrip'));
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

    const [plant, setPlant] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [name, setName] = useState('');
    const [isNumberCard, setIsNumberCard] = useState(false);
    const [isDate, setIsDate] = useState(false);
    const data = {
        TypeFlight: storedTypeTrip,
        TypeTicket: storedInforFlight.selectedValue,
        AirportFrom: storedInforFlight.item.AirportFrom,
        AirportTo: storedInforFlight.item.AirportTo,
        FlightTime: storedInforFlight.item.FlightTime,
        LandingTime: storedInforFlight.item.LandingTime,
        DateGo: storedInforFlight.item.DateGo,
        TotalMoney: storedInforFlight.total,
        CodeTicket: codeTicket,
        FlightNumber: storedInforFlight.item.FlightNumber,
        UserName: storedInforPerson.Username,
        ID_Card: storedInforPerson.ID_Card,
        CodeSeat: storedInforSeat.join(' - '),
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
        fetch('http://localhost:4000/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Error sending data:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    };

    const handlePay = () => {
        if (numberCard !== '' && expirationDate !== '' && name !== '') {
            if (isNumberCard && isDate) {
                setShow(true);
                console.log('success');

                sendInfoData();
                handleSendEmail();
                setTimeout(() => {
                    localStorage.clear();
                });
            }
        }
    };

    // const email = "minh10a1quangtrung@gmail.com";
    // const code = "AJHHF";
    const handleSendEmail = async (e) => {
        const res = await fetch('http://localhost:4000/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.Email,
                code: data.CodeTicket,
            }),
        });
        console.log(res);
    };
    const planeCode = storedInforFlight.item.AirlineCode;

    useEffect(() => {
        if (planeCode === 'VJ') {
            setPlant('VietJet');
        } else if (planeCode === 'VNA') {
            setPlant('Vietnam Airlines');
        } else if (planeCode === 'QH') {
            setPlant('BamBo Airways');
        } else if (planeCode === 'BL') {
            setPlant('Jetstar Pacific Airlines');
        }
    }, [planeCode]);

    const handleInputNumberCard = (e) => {
        setNumberCard(e.target.value);

        const cardNumber = document.querySelector('#card-number');
        const error = document.querySelector('#ip-1');
        if (e.target.value.length !== 16 && e.target.value.length !== 19) {
            cardNumber.style.outlineColor = 'red';
            error.style.color = 'red';
            setIsNumberCard(false);
        } else {
            cardNumber.style.outlineColor = '#4469b0';
            error.style.color = 'transparent';
            setIsNumberCard(true);
        }
    };

    const handleInputDate = (e) => {
        setExpirationDate(e.target.value);
        const date = document.querySelector('#date');
        const error = document.querySelector('#ip-2');
        const dateSplit = expirationDate.slice(2, 3);
        const dateCard = Number(expirationDate.slice(0, 2));
        const monthCard = Number(e.target.value.slice(3, 5));

        if (e.target.value.length === 5 && dateSplit === '/') {
            if (dateCard > 31 || monthCard > 12) {
                date.style.outlineColor = 'red';
                error.style.color = 'red';
                setIsDate(false);
            } else {
                date.style.outlineColor = '#4469b0';
                error.style.color = 'transparent';
                setIsDate(true);
            }
        }
    };

    const handleInputName = (e) => {
        setName(e.target.value);
        const error = document.querySelector('#ip-3');

        if (e.target.value === '') {
            error.style.color = 'red';
        } else {
            error.style.color = 'transparent';
        }
    };

    return (
        <div className={cx('wrapper_pay')}>
            <Header />

            <div className={cx('contain_pay')}>
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('header')}>
                            <img
                                className={cx('Header_logo-img__tUcP2')}
                                alt="logo"
                                src="https://res.flynow.vn/logoflynow.png"
                            />
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('information')}>
                                <div className={cx('supplier')}>
                                    <div className={cx('title')}>
                                        <FontAwesomeIcon className={cx('title-icon')} icon={faHouse} />
                                        <span>Nhà cung cấp </span>
                                    </div>
                                    <span id="plant" className={cx('information-line')}>
                                        {plant}
                                    </span>
                                </div>
                                <div className={cx('supplier')}>
                                    <div className={cx('title')}>
                                        <FontAwesomeIcon className={cx('title-icon')} icon={faMoneyBill} />
                                        <span> Số tiền </span>
                                    </div>
                                    <span className={cx('information-line')}>{data.TotalMoney} VND</span>
                                </div>
                            </div>
                            <div className={cx('bank-card')}>
                                <span className={cx('card-title')}>Chi tiết thẻ</span>
                                <input
                                    id="card-number"
                                    className={cx('input-text')}
                                    value={numberCard}
                                    type="text"
                                    placeholder="Số thẻ"
                                    onChange={handleInputNumberCard}
                                />
                                <span id="ip-1" className={cx('title-input')}>
                                    Số thẻ phải có 16 hoặc 19 chữ số
                                </span>
                                <input
                                    id="date"
                                    className={cx('input-text')}
                                    autoComplete="off"
                                    maxLength="5"
                                    value={expirationDate}
                                    inputMode="numeric"
                                    type="tel"
                                    placeholder="Ngày hết hạn"
                                    onChange={handleInputDate}
                                />
                                <span id="ip-2" className={cx('title-input')}>
                                    Phải nhập ngày tháng (VD: 01/01)
                                </span>
                                <input
                                    className={cx('input-text')}
                                    value={name}
                                    onChange={handleInputName}
                                    placeholder="Họ tên chủ thẻ"
                                />
                                <span id="ip-3" className={cx('title-input')}>
                                    Không được bỏ trống
                                </span>
                                <div className={cx('submit-btn')}>
                                    <Link to="/seatBook" className={cx('btn', 'return-btn')}>
                                        <span>Return</span>
                                    </Link>
                                    <button className={cx('btn', 'next-btn')} onClick={handlePay}>
                                        Paying
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 
        <button onClick={handlePay}>Paying</button> */}
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
