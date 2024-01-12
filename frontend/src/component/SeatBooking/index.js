// /* eslint-disable no-const-assign */
// import './SeatBook.scss';
// import { toast } from 'react-toastify';
// import ToastCustom from '../../Toast';
// import { useEffect, useState } from 'react';
// import { ModalPaying } from '../../Modal';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import TypeCommon from './TypeCommon';

// function SeatBooking() {
//     const [bookedButton1, setBookedButton1] = useState([]);
//     const [bookedButton2, setBookedButton2] = useState([]);

//     const [showModal, setShowModal] = useState(false);
//     const navigate = useNavigate();
//     const [number1, setNumber1] = useState(0);
//     const [number2, setNumber2] = useState(0);

//     console.log('so1:' + bookedButton1, 'so2: ' + bookedButton2);

//     const handleButtonClick1 = (event) => {
//         const buttonText = event.target.textContent;
//         console.log(buttonText);
//         console.log(bookedButton1);

//         // includes meaning is cancel seat
//         if (bookedButton1.includes(buttonText)) {
//             setBookedButton1(bookedButton1.filter((btn) => btn !== buttonText));
//             setNumber1((prevNumber) => prevNumber - 1);
//         } else if (storedInforFlight.value1 + storedInforFlight.value2 < number1 + 1) {
//             toast.warning('Bạn đã đặt vượt quá số lượng ghế bạn đã chọn. Vui lòng đổi ghế nếu muốn đặt lại.');
//             console.log(number1);
//             console.log(storedInforFlight.value1 + storedInforFlight.value2);
//             return;
//         }

//         // !includes meaning is booking seat
//         if (!bookedButton1.includes(buttonText)) {
//             setBookedButton1([...bookedButton1, buttonText]);
//             setNumber1((prevNumber) => prevNumber + 1);
//         }
//     };

//     const handleButtonClick2 = (event) => {
//         const buttonText = event.target.textContent;
//         console.log(buttonText);
//         console.log(bookedButton2);

//         // includes meaning is cancel seat
//         if (bookedButton2.includes(buttonText)) {
//             setBookedButton2(bookedButton2.filter((btn) => btn !== buttonText));
//             setNumber2((prevNumber) => prevNumber - 1);
//         } else if (storedInforFlightReturn.value1 + storedInforFlightReturn.value2 < number2 + 1) {
//             toast.warning('Bạn đã đặt vượt quá số lượng ghế bạn đã chọn. Vui lòng đổi ghế nếu muốn đặt lại.');
//             console.log(number2);
//             console.log(storedInforFlightReturn.value1 + storedInforFlightReturn.value2);
//             return;
//         }

//         // !includes meaning is booking seat
//         if (!bookedButton2.includes(buttonText)) {
//             setBookedButton2([...bookedButton2, buttonText]);
//             setNumber2((prevNumber) => prevNumber + 1);
//         }
//     };

//     const handleBooking = () => {
//         toast.success('Đặt vé thành công!');
//         setTimeout(() => {
//             setShowModal(true);
//         }, 3000);
//         console.log(bookedButton1);

//         // Store bookedButton in localStorage
//         localStorage.setItem('bookedButton', JSON.stringify(bookedButton1));
//         if (typeTrip === 'Roundtrip') localStorage.setItem('bookedButtonReturn', JSON.stringify(bookedButton2));
//     };

//     const handleReturn = () => {
//         navigate('/');
//     };

//     // const type = "Business Class";

//     const storedInforFlight = JSON.parse(localStorage.getItem('inforFlight'));
//     const typeTrip = JSON.parse(localStorage.getItem('TypeTrip'));
//     const storedInforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));

//     const [dataNew, setDataNew] = useState();
//     const [dataNew2, setDataNew2] = useState();

//     async function fetchAPI1(id) {
//         let response = await fetch(`http://localhost:4000/tickets/${id}`);
//         let data1 = await response.json();
//         setDataNew(data1.data);
//         return data1.data;
//     }
//     async function fetchAPI2(id) {
//         let response = await fetch(`http://localhost:4000/tickets/${id}`);
//         let data1 = await response.json();
//         setDataNew2(data1.data);
//         return data1.data;
//     }

//     useEffect(() => {
//         fetchAPI1(storedInforFlight.item._id);
//         if (storedInforFlightReturn) {
//             fetchAPI2(storedInforFlightReturn.item._id);
//             console.log('da goi roundtrip thanh cong');
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
//     let type = ['BusinessClass', 'EconomyClass', 'FirstClass', 'PremiumClass'];

//     const compareType = (value) => {
//         switch (value) {
//             case 'BusinessClass':
//                 return type[0];

//             case 'EconomyClass':
//                 return type[1];

//             case 'FirstClass':
//                 return type[2];

//             default:
//                 return type[3];
//         }
//     };

//     const typeSeat1 = compareType(storedInforFlight.selectedValue);

//     let typeSeat2 = '';
//     if (typeTrip === 'Roundtrip') {
//         typeSeat2 = compareType(storedInforFlightReturn.selectedValue);
//     }

//     if (dataNew) {
//         return (
//             <>
//                 <div className="contain_0">
//                     <div className="instruction">
//                         <span>Màu ĐỎ là chỗ trống</span>
//                         <span>Màu XANH là đặt thành công</span>
//                         <span>Dấu X là đã được đặt </span>
//                     </div>

//                     <TypeCommon
//                         storedInforFlight={storedInforFlight}
//                         typeSeat1={typeSeat1}
//                         handleButtonClick={handleButtonClick1}
//                         bookedButton={bookedButton1}
//                         title="Chuyến đi"
//                         dataNew={dataNew}
//                     />

//                     {typeTrip === 'Roundtrip' && dataNew2 && (
//                         <div className="return">
//                             <div className="instruction">
//                                 <span>Màu ĐỎ là chỗ trống</span>
//                                 <span>Màu XANH là đặt thành công</span>
//                                 <span>Dấu X là đã được đặt </span>
//                             </div>
//                             <TypeCommon
//                                 storedInforFlight={storedInforFlightReturn}
//                                 typeSeat1={typeSeat2}
//                                 handleButtonClick={handleButtonClick2}
//                                 bookedButton={bookedButton2}
//                                 title="Chuyến về"
//                                 dataNew={dataNew2}
//                             />
//                         </div>
//                     )}

//                     <div className="mb-5 final_book">
//                         <Button variant="info" onClick={handleBooking} className="me-3">
//                             Đặt vé
//                         </Button>

//                         <Button variant="secondary" onClick={handleReturn}>
//                             Trở lại
//                         </Button>
//                     </div>
//                 </div>

//                 {showModal && <ModalPaying show={showModal} setShow={setShowModal} />}
//                 <ToastCustom />
//             </>
//         );
//     }
// }

// export default SeatBooking;

/* eslint-disable no-const-assign */
import './SeatBook.scss';
import { toast } from 'react-toastify';
import ToastCustom from '../../Toast';
import { useEffect, useState } from 'react';
import { ModalPaying } from '../../Modal';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import TypeCommon from './TypeCommon';
import axios from 'axios';

function SeatBooking() {
    const [bookedButton1, setBookedButton1] = useState([]);
    const [bookedButton2, setBookedButton2] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [flight, setFlight] = useState({});
    const [codeSeat, setCodeSeat] = useState([]);

    console.log('so1:' + bookedButton1, 'so2: ' + bookedButton2);

    const inforFlight = JSON.parse(localStorage.getItem('inforFlight'));

    const TypeFlight = inforFlight.selectedValue;

    useEffect(() => {
        axios
            .get(`http://localhost:4000/codeSeat/${inforFlight.item.FlightNumber}`)
            .then((response) => setFlight(response.data.data))
            .catch((err) => console.log(err));
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (TypeFlight === 'EconomyClass') {
            setCodeSeat(flight.EconomyClass);
        } else if (TypeFlight === 'FirstClass') {
            setCodeSeat(flight.FirstClass);
        } else if (TypeFlight === 'BusinessClass') {
            setCodeSeat(flight.BusinessClass);
        } else if (TypeFlight === 'PremiumClass') {
            setCodeSeat(flight.PremiumClass);
        }
    });

    const handleButtonClick1 = (event) => {
        const buttonText = event.target.textContent;
        console.log(buttonText);
        console.log(bookedButton1);

        // includes meaning is cancel seat
        if (bookedButton1.includes(buttonText)) {
            setBookedButton1(bookedButton1.filter((btn) => btn !== buttonText));
            setNumber1((prevNumber) => prevNumber - 1);
        } else if (storedInforFlight.value1 + storedInforFlight.value2 + storedInforFlight.value3 < number1 + 1) {
            toast.warning('Bạn đã đặt vượt quá số lượng ghế bạn đã chọn. Vui lòng đổi ghế nếu muốn đặt lại.');
            console.log(number1);
            console.log(storedInforFlight.value1 + storedInforFlight.value2);
            return;
        }

        // !includes meaning is booking seat
        if (!bookedButton1.includes(buttonText)) {
            setBookedButton1([...bookedButton1, buttonText]);
            setNumber1((prevNumber) => prevNumber + 1);
        }
    };

    const handleButtonClick2 = (event) => {
        const buttonText = event.target.textContent;
        console.log(buttonText);
        console.log(bookedButton2);

        // includes meaning is cancel seat
        if (bookedButton2.includes(buttonText)) {
            setBookedButton2(bookedButton2.filter((btn) => btn !== buttonText));
            setNumber2((prevNumber) => prevNumber - 1);
        } else if (
            storedInforFlightReturn.value1 + storedInforFlightReturn.value2 + storedInforFlight.value3 <
            number2 + 1
        ) {
            toast.warning('Bạn đã đặt vượt quá số lượng ghế bạn đã chọn. Vui lòng đổi ghế nếu muốn đặt lại.');
            console.log(number2);
            console.log(storedInforFlightReturn.value1 + storedInforFlightReturn.value2);
            return;
        }

        // !includes meaning is booking seat
        if (!bookedButton2.includes(buttonText)) {
            setBookedButton2([...bookedButton2, buttonText]);
            setNumber2((prevNumber) => prevNumber + 1);
        }
    };

    const handleBooking = () => {
        if (typeTrip === 'Oneway') {
            if (codeSeat.length === 0) {
                axios
                    .put(
                        `http://localhost:4000/codeSeat/${inforFlight.item.FlightNumber}?type=${TypeFlight}&seat=${bookedButton1}`,
                    )
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
                setTimeout(() => {
                    setShowModal(true);
                }, 3000);
                console.log(bookedButton1);
                toast.success('Đặt vé thành công!');

                // Store bookedButton in localStorage
                localStorage.setItem('bookedButton', JSON.stringify(bookedButton1));
                if (typeTrip === 'Roundtrip') localStorage.setItem('bookedButtonReturn', JSON.stringify(bookedButton2));
            } else {
                for (let i = 0; i < bookedButton1.length; i++) {
                    let check = codeSeat.includes(bookedButton1[i]);
                    if (check === true) {
                        toast.warning(`Ghế ${bookedButton1[i]} đã có người đặt trước`);
                    } else {
                        axios
                            .put(
                                `http://localhost:4000/codeSeat/${inforFlight.item.FlightNumber}?type=${TypeFlight}&seat=${bookedButton1}`,
                            )
                            .then((res) => console.log(res))
                            .catch((err) => console.log(err));
                        setTimeout(() => {
                            setShowModal(true);
                        }, 3000);
                        console.log(bookedButton1);
                        toast.success('Đặt vé thành công!');

                        // Store bookedButton in localStorage
                        localStorage.setItem('bookedButton', JSON.stringify(bookedButton1));
                        if (typeTrip === 'Roundtrip')
                            localStorage.setItem('bookedButtonReturn', JSON.stringify(bookedButton2));
                    }
                }
            }
        } else {
        }
    };

    const handleReturn = () => {
        navigate('/');
    };

    // const type = "Business Class";

    const storedInforFlight = JSON.parse(localStorage.getItem('inforFlight'));
    const typeTrip = JSON.parse(localStorage.getItem('TypeTrip'));
    const storedInforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));

    const [dataNew, setDataNew] = useState();
    const [dataNew2, setDataNew2] = useState();

    async function fetchAPI1(id) {
        let response = await fetch(`http://localhost:4000/tickets/${id}`);
        let data1 = await response.json();
        setDataNew(data1.data);
        return data1.data;
    }
    async function fetchAPI2(id) {
        let response = await fetch(`http://localhost:4000/tickets/${id}`);
        let data1 = await response.json();
        setDataNew2(data1.data);
        return data1.data;
    }

    useEffect(() => {
        fetchAPI1(storedInforFlight.item._id);
        if (storedInforFlightReturn) {
            fetchAPI2(storedInforFlightReturn.item._id);
            console.log('da goi roundtrip thanh cong');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let type = ['BusinessClass', 'EconomyClass', 'FirstClass', 'PremiumClass'];

    const compareType = (value) => {
        switch (value) {
            case 'BusinessClass':
                return type[0];

            case 'EconomyClass':
                return type[1];

            case 'FirstClass':
                return type[2];

            default:
                return type[3];
        }
    };

    const typeSeat1 = compareType(storedInforFlight.selectedValue);

    let typeSeat2 = '';
    if (typeTrip === 'Roundtrip') {
        typeSeat2 = compareType(storedInforFlightReturn.selectedValue);
    }

    if (dataNew) {
        return (
            <>
                <div className="contain_0">
                    <div className="instruction">
                        <span>Màu ĐỎ là chỗ trống</span>
                        <span>Màu XANH là đặt thành công</span>
                        <span>Dấu X là đã được đặt </span>
                    </div>

                    <TypeCommon
                        storedInforFlight={storedInforFlight}
                        typeSeat1={typeSeat1}
                        handleButtonClick={handleButtonClick1}
                        bookedButton={bookedButton1}
                        title="Chuyến đi"
                        dataNew={dataNew}
                    />

                    {typeTrip === 'Roundtrip' && dataNew2 && (
                        <div className="return">
                            <div className="instruction">
                                <span>Màu ĐỎ là chỗ trống</span>
                                <span>Màu XANH là đặt thành công</span>
                                <span>Dấu X là đã được đặt </span>
                            </div>
                            <TypeCommon
                                storedInforFlight={storedInforFlightReturn}
                                typeSeat1={typeSeat2}
                                handleButtonClick={handleButtonClick2}
                                bookedButton={bookedButton2}
                                title="Chuyến về"
                                dataNew={dataNew2}
                            />
                        </div>
                    )}

                    <div className="mb-5 final_book">
                        <Button variant="info" onClick={handleBooking} className="me-3">
                            Đặt vé
                        </Button>

                        <Button variant="secondary" onClick={handleReturn}>
                            Trở lại
                        </Button>
                    </div>
                </div>

                {showModal && <ModalPaying show={showModal} setShow={setShowModal} />}
                <ToastCustom />
            </>
        );
    }
}

export default SeatBooking;
