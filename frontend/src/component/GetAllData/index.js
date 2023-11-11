import "./GetAllData.scss";

function GetAllData({ data }) {
  return (
    <div className="contain_00 mt-3 ms-3">
      <h3>BOOKING TICKET SUCCESS</h3>

      <div>Code Ticket: {data.CodeTicket} </div>
      <div>Type Flight: {data.TypeFlight}</div>

      <div>Passenger: {data.UserName} </div>

      <div>
        Trip: {data.AirportFrom}-{data.AirportTo}
      </div>

      <div>Class: {data.TypeTicket}</div>

      <div>Seat: {data.CodeSeat}</div>

      <div>Totel Money: {data.TotalMoney}</div>
    </div>
  );
}

export default GetAllData;
