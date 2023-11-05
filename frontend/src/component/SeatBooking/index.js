import "./SeatBook.scss";
import seatBook from "../../asset/images/bookSeat.jpg";
import { toast } from "react-toastify";
import ToastCustom from "../../Toast";
import { useState } from "react";
import { ModalPaying } from "../../Modal";
import { useNavigate } from "react-router-dom";
import ButtonSeat from "./ButtonSeat";
import Button from "react-bootstrap/Button";

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

  // useEffect(() => {
  //   console.log(bookedButton);
  // }, [bookedButton]);

  const handleBooking = () => {
    toast.success("Booking success!");
    setTimeout(() => {
      setShowModal(true);
    }, 3000);
    console.log(bookedButton);

    // Store bookedButton in localStorage
    localStorage.setItem("bookedButton", JSON.stringify(bookedButton));
  };

  const handleReturn = () => {
    navigate("/");
  };

  const type = "Business Class";
  return (
    <>
      <div className="contain_0">
        <h4>RED is empty, GREEN is book sucess, X is booked </h4>
        <div className="depart">
          <h2 className="title_0">Depart</h2>
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
              <span className="type_0">{type}</span>
            </span>
          </div>

          {type === "Economy Class" && (
            <div className="body_0">
              <div className="row_0">
                <ButtonSeat
                  handleButtonClick={handleButtonClick}
                  bookedButton={bookedButton}
                  seatCode="1A"
                />
                <ButtonSeat
                  handleButtonClick={handleButtonClick}
                  bookedButton={bookedButton}
                  seatCode="1B"
                />
                <ButtonSeat
                  handleButtonClick={handleButtonClick}
                  bookedButton={bookedButton}
                  seatCode="1C"
                />
                <ButtonSeat
                  handleButtonClick={handleButtonClick}
                  bookedButton={bookedButton}
                  seatCode="1D"
                />
                <ButtonSeat
                  handleButtonClick={handleButtonClick}
                  bookedButton={bookedButton}
                  seatCode="1E"
                />
                <ButtonSeat
                  handleButtonClick={handleButtonClick}
                  bookedButton={bookedButton}
                  seatCode="1F"
                />
              </div>
            </div>
          )}
          {type === "Business Class" && (
            <div className="body_0">
              <div className="row_0 mt-3">
                <div className="button_seat me-2">
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="5A"
                  />
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="5B"
                  />
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="5C"
                  />
                </div>

                <div className="button_seat">
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="5D"
                  />
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="5E"
                  />
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="5F"
                  />
                </div>
              </div>

              <div className="row_0 mt-3">
                <div className="button_seat me-2">
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="6A"
                  />
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="6B"
                  />
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="6C"
                  />
                </div>

                <div className="button_seat">
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="6D"
                  />
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="6E"
                  />
                  <ButtonSeat
                    handleButtonClick={handleButtonClick}
                    bookedButton={bookedButton}
                    seatCode="6F"
                  />
                </div>
              </div>
            </div>
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
