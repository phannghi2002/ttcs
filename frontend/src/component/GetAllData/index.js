import "./GetAllData.scss";
function GetAllData() {
  // Retrieve the stored object from localStorage
  const storedInforFlight = JSON.parse(localStorage.getItem("inforFlight"));
  const storedInforPerson = JSON.parse(localStorage.getItem("inforPerson"));
  const storedInforSeat = JSON.parse(localStorage.getItem("bookedButton"));

  const randomCharacters = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let codeTicket = "";

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
  const codeTicket = randomCharacters();

  return (
    <div className="contain_00 mt-3 ms-3">
      <h3>BOOKING TICKET SUCCESS</h3>

      <div>Code Ticket: {codeTicket} </div>
      <div>Passenger: {storedInforPerson.Username} </div>
      <div>
        Trip: {storedInforFlight.item.AirportFrom}-
        {storedInforFlight.item.AirportTo}
      </div>
      <div>Class: {storedInforFlight.selectedValue}</div>
      <div>
        Quantity Passenger:{" "}
        {storedInforFlight.value1 + storedInforFlight.value2}
      </div>
      <div>Seat: {storedInforSeat.join(" - ")}</div>

      <div>Totel Money: {storedInforFlight.total}</div>
    </div>
  );
}

export default GetAllData;
