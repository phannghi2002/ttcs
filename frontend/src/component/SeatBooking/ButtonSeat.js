import "./SeatBook.scss";

function ButtonSeat({ handleButtonClick, bookedButton, seatCode }) {
  return (
    <>
      <button
        onClick={handleButtonClick}
        className={bookedButton.includes(seatCode) ? "booked" : "no_booked"}
      >
        {seatCode}
      </button>
    </>
  );
}

export default ButtonSeat;
