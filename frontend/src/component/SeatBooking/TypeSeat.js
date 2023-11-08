import ButtonSeat from "./ButtonSeat";
import "./SeatBook.scss";

function TypeSeat({ handleButtonClick, bookedButton, number }) {
  return (
    <div className="body_0">
      <div className="row_0 mt-3">
        <div className="button_seat me-2">
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "A"}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "B"}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "C"}
          />
        </div>

        <div className="button_seat">
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "D"}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "E"}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "F"}
          />
        </div>
      </div>

      <div className="row_0 mt-3">
        <div className="button_seat me-2">
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "A"}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "B"}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "C"}
          />
        </div>

        <div className="button_seat">
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "D"}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "E"}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "F"}
          />
        </div>
      </div>
    </div>
  );
}

export default TypeSeat;
