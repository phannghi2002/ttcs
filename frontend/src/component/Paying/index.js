import { useState } from "react";
import GetAllData from "../GetAllData";
import "./Paying.scss";
function Paying() {
  const [show, setShow] = useState(false);
  const handlePay = () => {
    setShow(!show);

    //Remove all values from localStorage
    setTimeout(() => {
      localStorage.clear();
    }, 5000);
  };
  return (
    <>
      <h3 className="pay">Infomation Pay</h3>

      <div>
        TypeCard
        <select name="typeCard">
          <option value="visa">Visa</option>
          <option value="economy">Economy Class</option>
        </select>
      </div>
      <div>ID Card</div>

      <button onClick={handlePay}>Paying</button>

      {show && <GetAllData />}
    </>
  );
}

export default Paying;
