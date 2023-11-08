import './SeatBook.scss';
import seatBook from '../../asset/images/bookSeat.jpg';
import { toast } from 'react-toastify';
import ToastCustom from '../../Toast';
import { useState } from 'react';
import { ModalPaying } from '../../Modal';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import TypeSeat from './TypeSeat';

function SeatBooking() {
    const [bookedButton, setBookedButton] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (event) => {
        const buttonText = event.target.textContent;
        console.log(buttonText);

        if (bookedButton.includes(buttonText)) {
            setBookedButton(bookedButton.filter((btn) => btn !== buttonText));
        } else {
            setBookedButton([...bookedButton, buttonText]);
        }
    };

    const handleBooking = () => {
        toast.success('Booking success!');
        setTimeout(() => {
            setShowModal(true);
        }, 3000);
        console.log(bookedButton);

        // Store bookedButton in localStorage
        localStorage.setItem('bookedButton', JSON.stringify(bookedButton));
    };

    const handleReturn = () => {
        navigate('/');
    };

    // const type = "Business Class";

    const storedInforFlight = JSON.parse(localStorage.getItem('inforFlight'));
    let type = ['Business Class', 'Economy Class', 'First Class', 'Premium Class'];

    const compareType = (value) => {
        switch (value) {
            case 'business':
                return type[0];

            case 'economy':
                return type[1];

            case 'first':
                return type[2];

            default:
                return type[3];
        }
    };

    const typeSeat = compareType(storedInforFlight.selectedValue);

    return (
        <>
            <div className="contain_0">
                <h4>RED is empty, GREEN is book sucess, X is booked </h4>
                <div className="depart">
                    {/* <h2 className="title_0">Depart: {storedInforFlight.item.DateGo}</h2> */}
                    <h2 className="title_0">Depart</h2>

                    <div
                        className="wrapper_0"
                        style={{
                            backgroundImage: `url(${seatBook})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                        }}
                    >
                        <span className="info_0">
                            {storedInforFlight.item.FlightNumber} <br />
                            <span className="type_0">{typeSeat}</span>
                        </span>
                    </div>

                    {typeSeat === 'Economy Class' && (
                        <TypeSeat handleButtonClick={handleButtonClick} bookedButton={bookedButton} number={7} />
                    )}
                    {typeSeat === 'Business Class' && (
                        <TypeSeat handleButtonClick={handleButtonClick} bookedButton={bookedButton} number={3} />
                    )}
                    {typeSeat === 'First Class' && (
                        <TypeSeat handleButtonClick={handleButtonClick} bookedButton={bookedButton} number={1} />
                    )}
                    {typeSeat === 'Premium Class' && (
                        <TypeSeat handleButtonClick={handleButtonClick} bookedButton={bookedButton} number={5} />
                    )}
                </div>

                {/* <div className="depart">
          <h2 className="title_0">Return</h2>
          <div
            className="wrapper_0"
            style={{
              backgroundImage: `url(${seatBook})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          >
            <span className="info_0">
              Boeing 787/20 <br />
              <span className="type_0">Economy Class</span>
            </span>
          </div>

          <div className="body_0">
            <button
              onClick={handleButtonClick}
              className={bookedButton.includes("5A") ? "booked" : "no_booked"}
            >
              5A
            </button>
            <button
              onClick={handleButtonClick}
              className={bookedButton.includes("5B") ? "booked" : "no_booked"}
            >
              5B
            </button>
            <button
              onClick={handleButtonClick}
              className={bookedButton.includes("5C") ? "booked" : "no_booked"}
            >
              5C
            </button>
            <button
              onClick={handleButtonClick}
              className={bookedButton.includes("5D") ? "booked" : "no_booked"}
            >
              5D
            </button>
            <button
              onClick={handleButtonClick}
              className={bookedButton.includes("5E") ? "booked" : "no_booked"}
            >
              5E
            </button>
            <button
              onClick={handleButtonClick}
              className={bookedButton.includes("5F") ? "booked" : "no_booked"}
            >
              5F
            </button>
          </div>
        </div> */}

                <div className="mb-5 mt-3">
                    <Button variant="info" onClick={handleBooking} className="me-3">
                        Booking
                    </Button>

                    <Button variant="secondary" onClick={handleReturn}>
                        Return
                    </Button>
                </div>

                <ToastCustom />
                {showModal && <ModalPaying show={showModal} setShow={setShowModal} />}
            </div>
        </>
    );
}

export default SeatBooking;
