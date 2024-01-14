/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import GetAllData from '../GetAllData';
import classNames from 'classnames/bind';
import styles from './Paying.module.scss';
import Header from '../DefaultPage/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastCustom from '../../Toast';

import { fakeApi } from './fakeApi';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
let codeTicket = '';

const cx = classNames.bind(styles);
// let i = 0;

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
    console.log('chay di ma lam on');
    return codeTicket;
};
codeTicket = randomCharacters();

const checkTypeTrip = (TypeTrip) => {
    if (TypeTrip === 'Oneway') return true;
    else return false;
};

function Paying() {
    const [show, setShow] = useState(false);
    const storedInforFlight = JSON.parse(localStorage.getItem('inforFlight'));
    const storedInforPerson = JSON.parse(localStorage.getItem('inforPerson'));
    const storedInforSeat = JSON.parse(localStorage.getItem('bookedButton'));
    const storedTypeTrip = JSON.parse(localStorage.getItem('TypeTrip'));
    const storedQuantity = JSON.parse(localStorage.getItem('Quantity'));
    const inforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));

    const [plant, setPlant] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [name, setName] = useState('');
    const [isNumberCard, setIsNumberCard] = useState(false);
    const [user, setUser] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);
    const [timeoutPay, setTimeoutPay] = useState(false);

    let storedInforFlightReturn, storedInforSeatReturn;

    const valueReturn = () => {
        storedInforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));
        storedInforSeatReturn = JSON.parse(localStorage.getItem('bookedButtonReturn'));

        const data = {
            TypeFlight: storedTypeTrip,
            TypeTicket: storedInforFlight.selectedValue,
            AirportFrom: storedInforFlight.item.AirportFrom,
            AirportTo: storedInforFlight.item.AirportTo,
            FlightTime: storedInforFlight.item.FlightTime,
            LandingTime: storedInforFlight.item.LandingTime,
            DateGo: storedInforFlight.item.DateGo,
            CodeTicket: codeTicket,
            FlightNumber: storedInforFlight.item.FlightNumber,
            UserName: storedInforPerson.Username,
            ID_Card: storedInforPerson.ID_Card,
            CodeSeat: storedInforSeat.join(' - '),
            Email: storedInforPerson.Email,
            TotalMoneyGo: storedInforFlight.moneyAdult,
            TotalMoneyReturn: storedInforFlightReturn.moneyAdult,
            TypeTicketReturn: storedInforFlightReturn.selectedValue,
            FlightNumberReturn: storedInforFlightReturn.item.FlightNumber,
            FlightTimeReturn: storedInforFlightReturn.item.FlightTime,
            LandingTimeReturn: storedInforFlightReturn.item.LandingTime,
            DateReturn: storedInforFlightReturn.item.DateGo,
            CodeSeatReturn: storedInforSeatReturn.join(' - '),

            TotalMoney: storedInforFlight.total + storedInforFlightReturn.total,
        };
        return data;
    };

    const valueDepart = () => {
        const data = {
            TypeFlight: storedTypeTrip,
            TypeTicket: storedInforFlight.selectedValue,
            AirportFrom: storedInforFlight.item.AirportFrom,
            AirportTo: storedInforFlight.item.AirportTo,
            FlightTime: storedInforFlight.item.FlightTime,
            LandingTime: storedInforFlight.item.LandingTime,
            DateGo: storedInforFlight.item.DateGo,
            CodeTicket: codeTicket,
            FlightNumber: storedInforFlight.item.FlightNumber,
            UserName: storedInforPerson.Username,
            ID_Card: storedInforPerson.ID_Card,
            CodeSeat: storedInforSeat.join(' - '),
            Email: storedInforPerson.Email,
            TotalMoneyGo: storedInforFlight.total,

            TotalMoney: storedInforFlight.total,
        };
        return data;
    };

    let data00;

    if (checkTypeTrip(storedTypeTrip)) {
        data00 = valueDepart();
    } else data00 = valueReturn();

    // const sendInfoData = () => {
    //     fetch('http://localhost:4000/info', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },

    //         body: JSON.stringify(data00),
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 console.log('Data sent successfully');
    //             } else {
    //                 console.error('Error sending data:', response.statusText);
    //                 console.log('thoi s gio loi roi');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error sending data:', error);
    //         });
    // };

    const [dataNew, setDataNew] = useState();
    const [dataNew2, setDataNew2] = useState();

    async function fetchAPI1(id) {
        let response = await fetch(`http://localhost:4000/tickets/${id}`);
        let data1 = await response.json();
        setDataNew(data1.data);
        console.log(dataNew);
        return data1.data;
    }

    async function fetchAPI2(id) {
        let response = await fetch(`http://localhost:4000/tickets/${id}`);
        let data1 = await response.json();
        setDataNew2(data1.data);
        return data1.data;
    }
    let array1, array2;

    if (numberCard && expirationDate && name && isNumberCard) {
        if (dataNew) {
            array1 = dataNew[data00.TypeTicket].CodeSeat;
            array1.push(...storedInforSeat);
        } else {
            fetchAPI1(storedInforFlight.item._id);
        }
    }

    if (checkTypeTrip()) {
        if (numberCard && expirationDate && name && isNumberCard) {
            if (dataNew2) {
                array2 = dataNew2[data00.TypeTicketReturn].CodeSeat;
                array2.push(...storedInforSeatReturn);
            } else {
                console.log(storedInforFlightReturn.item);
                fetchAPI2(storedInforFlightReturn.item._id);
            }
        }
    }

    const pushSeat = (id) => {
        const data = {
            [data00.TypeTicket]: {
                // PriceAdult: dataNew[data00.FirstClass].PriceAdult,
                // PriceChildren: dataNew[data00.FirstClass].Children,
                PriceAdult: dataNew[data00.TypeTicket].PriceAdult,
                PriceChildren: dataNew[data00.TypeTicket].PriceChildren,
                CodeSeat: array1,
            },
        };

        axios
            .patch(`http://localhost:4000/tickets/${id}`, data)
            .then((response) => {
                console.log('Data updated:', response.data);
                // Perform any additional actions after successful update
            })
            .catch((error) => {
                console.error('Error updating data:', error);
                // Handle error case
            });
    };

    const pushSeat2 = (id) => {
        console.log('ma no cay that chu 3');
        const data = {
            [data00.TypeTicketReturn]: {
                // PriceAdult: dataNew[data00.FirstClass].PriceAdult,
                // PriceChildren: dataNew[data00.FirstClass].Children,
                PriceAdult: dataNew2[data00.TypeTicketReturn].PriceAdult,
                PriceChildren: dataNew2[data00.TypeTicketReturn].PriceChildren,
                CodeSeat: array2,
            },
        };

        axios
            .patch(`http://localhost:4000/tickets/${id}`, data)
            .then((response) => {
                console.log('Data updated:', response.data);
                // Perform any additional actions after successful update
            })
            .catch((error) => {
                console.error('Error updating data:', error);
                // Handle error case
            });
    };

    const is_creditCard = (str) => {
        const regexp =
            /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
        if (regexp.test(str)) {
            return true;
        } else {
            return false;
        }
    };

    const totalPeople = Number(storedQuantity.adults) + Number(storedQuantity.children) + Number(storedQuantity.baby);

    useEffect(() => {
        axios
            .get('http://localhost:4000/users')
            .then((res) => setUser(res.data.data.slice(-totalPeople)))
            .catch((err) => console.error(err));
    }, []);

    function handlePustTicketDetail() {
        const totalPeople =
            Number(storedQuantity.adults) + Number(storedQuantity.children) + Number(storedQuantity.baby);

        console.log(totalPeople);
        const codeSeatSingle = data00.CodeSeat.split('-');

        let CodeSeatReturnSingle = [];

        const getCodeSeatReturn = () => {
            const newSeat = data00.CodeSeatReturn.split('-');
            CodeSeatReturnSingle = newSeat;
            return CodeSeatReturnSingle;
        };

        if (data00.TypeFlight === 'Roundtrip') {
            getCodeSeatReturn();
        }
        console.log(codeSeatSingle[0]);

        for (let i = 0; i < totalPeople; i++) {
            axios
                .post('http://localhost:4000/ticketDetail', {
                    TypeFlight: data00.TypeFlight,
                    TypeTicket: data00.TypeTicket,
                    AirportFrom: data00.AirportFrom,
                    AirportTo: data00.AirportTo,
                    FlightTime: data00.FlightTime,
                    LandingTime: data00.LandingTime,
                    DateGo: data00.DateGo,
                    TotalMoney: data00.TotalMoney,
                    CodeTicket: data00.CodeTicket,
                    FlightNumber: data00.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data00.TypeTicketReturn,
                    FlightNumberReturn: data00.FlightNumberReturn,
                    FlightTimeReturn: data00.FlightTimeReturn,
                    LandingTimeReturn: data00.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data00.DateReturn,
                })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }

        for (let i = 0; i < Number(storedQuantity.adults); i++) {
            axios
                .post('http://localhost:4000/info', {
                    TypeFlight: data00.TypeFlight,
                    TypeTicket: data00.TypeTicket,
                    AirportFrom: data00.AirportFrom,
                    AirportTo: data00.AirportTo,
                    FlightTime: data00.FlightTime,
                    LandingTime: data00.LandingTime,
                    DateGo: data00.DateGo,
                    TotalMoneyGo: storedInforFlight.moneyAdult,
                    TotalMoneyReturn: data00.TotalMoneyReturn,
                    TotalMoney: data00.TotalMoney,
                    CodeTicket: data00.CodeTicket,
                    FlightNumber: data00.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data00.TypeTicketReturn,
                    FlightNumberReturn: data00.FlightNumberReturn,
                    FlightTimeReturn: data00.FlightTimeReturn,
                    LandingTimeReturn: data00.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data00.DateReturn,
                })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }

        for (
            let i = Number(storedQuantity.adults);
            i < Number(storedQuantity.adults) + Number(storedQuantity.children);
            i++
        ) {
            const postData = {
                TypeFlight: data00.TypeFlight,
                TypeTicket: data00.TypeTicket,
                AirportFrom: data00.AirportFrom,
                AirportTo: data00.AirportTo,
                FlightTime: data00.FlightTime,
                LandingTime: data00.LandingTime,
                DateGo: data00.DateGo,
                TotalMoneyGo: storedInforFlight.moneyChildren,
                TotalMoney: data00.TotalMoney,
                CodeTicket: data00.CodeTicket,
                FlightNumber: data00.FlightNumber,
                UserName: user[i].Username,
                ID_Card: user[i].ID_Card,
                CodeSeat: codeSeatSingle[i],
                Email: user[i].Email,
                TypeTicketReturn: data00.TypeTicketReturn,
                FlightNumberReturn: data00.FlightNumberReturn,
                FlightTimeReturn: data00.FlightTimeReturn,
                LandingTimeReturn: data00.LandingTimeReturn,
                CodeSeatReturn: CodeSeatReturnSingle[i],
                DateReturn: data00.DateReturn,
            };

            if (data00.TotalMoneyReturn) {
                postData.TotalMoneyReturn = data00.TotalMoneyReturn * 0.75;
            }

            axios
                .post('http://localhost:4000/info', postData)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }

        for (let i = totalPeople - Number(storedQuantity.baby); i < totalPeople; i++) {
            const postData = {
                TypeFlight: data00.TypeFlight,
                TypeTicket: data00.TypeTicket,
                AirportFrom: data00.AirportFrom,
                AirportTo: data00.AirportTo,
                FlightTime: data00.FlightTime,
                LandingTime: data00.LandingTime,
                DateGo: data00.DateGo,
                TotalMoneyGo: storedInforFlight.moneyBaby,
                TotalMoney: data00.TotalMoney,
                CodeTicket: data00.CodeTicket,
                FlightNumber: data00.FlightNumber,
                UserName: user[i].Username,
                ID_Card: user[i].ID_Card,
                CodeSeat: codeSeatSingle[i],
                Email: user[i].Email,
                TypeTicketReturn: data00.TypeTicketReturn,
                FlightNumberReturn: data00.FlightNumberReturn,
                FlightTimeReturn: data00.FlightTimeReturn,
                LandingTimeReturn: data00.LandingTimeReturn,
                CodeSeatReturn: CodeSeatReturnSingle[i],
                DateReturn: data00.DateReturn,
            };

            if (data00.TotalMoneyReturn) {
                postData.TotalMoneyReturn = data00.TotalMoneyReturn * 0.5;
            }

            axios
                .post('http://localhost:4000/info', postData)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }

        // for (let i = totalPeople - Number(storedQuantity.baby); i < totalPeople; i++) {
        //     axios
        //         .post('http://localhost:4000/info', {
        //             TypeFlight: data00.TypeFlight,
        //             TypeTicket: data00.TypeTicket,
        //             AirportFrom: data00.AirportFrom,
        //             AirportTo: data00.AirportTo,
        //             FlightTime: data00.FlightTime,
        //             LandingTime: data00.LandingTime,
        //             DateGo: data00.DateGo,
        //             TotalMoneyGo: storedInforFlight.moneyBaby,
        //             TotalMoneyReturn: data00.TotalMoneyReturn * 0.5,
        //             TotalMoney: data00.TotalMoney,
        //             CodeTicket: data00.CodeTicket,
        //             FlightNumber: data00.FlightNumber,
        //             UserName: user[i].Username,
        //             ID_Card: user[i].ID_Card,
        //             CodeSeat: codeSeatSingle[i],
        //             Email: user[i].Email,
        //             TypeTicketReturn: data00.TypeTicketReturn,
        //             FlightNumberReturn: data00.FlightNumberReturn,
        //             FlightTimeReturn: data00.FlightTimeReturn,
        //             LandingTimeReturn: data00.LandingTimeReturn,
        //             CodeSeatReturn: CodeSeatReturnSingle[i],
        //             DateReturn: data00.DateReturn,
        //         })
        //         .then((response) => console.log(response))
        //         .catch((error) => console.log(error));
        // }
    }

    const handlePay = (e) => {
        if (numberCard !== '' && expirationDate !== '' && name !== '') {
            if (isNumberCard) {
                setShouldStop(true);
                setShow(true);

                pushSeat(storedInforFlight.item._id);

                if (checkTypeTrip()) {
                    pushSeat2(storedInforFlightReturn.item._id);
                }
                handlePustTicketDetail();

                toast.success('Thanh toán thành công!');
                setTimeout(() => {
                    handleSendEmail();
                }, 2000);
                clearTimeout(timeoutId);
                setCountdown(0);
            }
        } else {
            handleInputNumberCard(e);
        }
    };

    // const email = "minh10a1quangtrung@gmail.com";
    // const code = "AJHHF";
    const handleSendEmail = async (e) => {
        await axios
            .get(`http://localhost:4000/ticketDetail/${data00.CodeTicket}`)
            .then((response) => {
                fetch('http://localhost:4000/sendEmail/all', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: data00.CodeTicket,
                        data: response.data.data,
                        type: data00.TypeFlight,
                    }),
                });
                console.log('Da gui email ve may ');
            })
            .catch((err) => console.log(err));
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
        if (!is_creditCard(e.target.value)) {
            cardNumber.style.outlineColor = 'red';
            error.innerText = 'Số thẻ không hợp lệ';
            error.style.color = 'red';
            setName('');
            setExpirationDate('');
            setIsNumberCard(false);
        } else {
            cardNumber.style.outlineColor = '#4469b0';
            error.innerText = 'Vui lòng nhập số thẻ';
            error.style.color = 'transparent';
            for (let index = 0; index < fakeApi.length; index++) {
                if (e.target.value === fakeApi[index].cardNumber) {
                    setName(fakeApi[index].name);
                    setExpirationDate(fakeApi[index].exp);
                    break;
                } else {
                    setName('');
                    setExpirationDate('');
                }
            }
            setIsNumberCard(true);
        }
    };

    const [countdown, setCountdown] = useState(300);
    const [shouldStop, setShouldStop] = useState(false); // Thêm biến shouldStop

    useEffect(() => {
        let interval;

        if (countdown > 0 && !shouldStop) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        if (countdown === 0) {
            setTimeoutPay(true);
        }

        return () => clearInterval(interval);
    }, [countdown, shouldStop]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleDeleteCodeSeat = () => {
        if (storedTypeTrip === 'Roundtrip') {
            const TypeFlight = storedInforFlight.selectedValue;
            const TypeFlightReturn = inforFlightReturn.selectedValue;
            axios
                .put(
                    `http://localhost:4000/codeSeat/fail/${storedInforFlight.item.FlightNumber}?type=${TypeFlight}&seat=${storedInforSeat}`,
                )
                .catch((err) => console.error(err));
            axios
                .put(
                    `http://localhost:4000/codeSeat/fail/${inforFlightReturn.item.FlightNumber}?type=${TypeFlightReturn}&seat=${storedInforSeatReturn}`,
                )
                .catch((err) => console.error(err));
        } else {
            const TypeFlight = storedInforFlight.selectedValue;

            axios
                .put(
                    `http://localhost:4000/codeSeat/fail/${storedInforFlight.item.FlightNumber}?type=${TypeFlight}&seat=${storedInforSeat}`,
                )
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        const id = setTimeout(() => {
            handleDeleteCodeSeat();
        }, 300000);
        setTimeoutId(id);

        console.log('bat dau tinh gio');

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className={cx('wrapper_pay')}>
            <Header />

            <div className={cx('contain_pay')}>
                {!show && !timeoutPay && (
                    <div className={cx('wrapper')}>
                        <div className={cx('container')}>
                            <div className={cx('header')}>
                                <img className={cx('logo-img')} alt="logo" src="https://res.flynow.vn/logoflynow.png" />
                                <span>Phiên giao dịch sẽ hết hạn sau : {formatTime(countdown)}</span>
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
                                        <span className={cx('information-line')}>{data00.TotalMoney} VND</span>
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
                                        Không được bỏ trống trường này
                                    </span>
                                    <input
                                        id="date"
                                        className={cx('input-text')}
                                        autoComplete="off"
                                        maxLength="7"
                                        value={expirationDate}
                                        inputMode="numeric"
                                        type="tel"
                                        placeholder="Ngày hết hạn"
                                    />
                                    <span id="ip-2" className={cx('title-input')}>
                                        Phải nhập ngày tháng (VD: 01/01)
                                    </span>
                                    <input
                                        id="name"
                                        className={cx('input-text')}
                                        value={name}
                                        placeholder="Họ tên chủ thẻ"
                                    />
                                    <span id="ip-3" className={cx('title-input')}>
                                        Không được bỏ trống
                                    </span>
                                    <div className={cx('submit-btn')}>
                                        <Link to="/seatBook" className={cx('btn', 'return-btn')}>
                                            <span onClick={handleDeleteCodeSeat}>Trở lại</span>
                                        </Link>
                                        <button className={cx('btn', 'next-btn')} onClick={handlePay}>
                                            Thanh toán
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {show && (
                    // <div className={cx('animation')}>
                    <GetAllData data={data00} />
                    // </div>
                )}
                {timeoutPay && !show && <h1>Đã hết thời gian thanh toán</h1>}
                <ToastCustom />
            </div>
        </div>
    );
}

export default Paying;
// "TypeFlight": "OneWay",
//     "TypeTicket" : "EconomyClass",
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
