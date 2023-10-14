import { useState } from "react";
import axios from "axios";

function Check() {
  const [Username, setUserName] = useState("");
  const [DayOfBirth, setDayOfBirth] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAdress] = useState("");
  const [ID_Card, setID_Card] = useState("");
  const [Phone, setPhone] = useState("");

  //trantung200@gmail.com
  //155 khuat duy tien,HN
  //30/07/2002

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/auth/enterInfo", {
        Username,
        DayOfBirth,
        Email,
        Address,
        ID_Card,
        Phone,
      })
      .then((res) => {
        console.log(res);
        alert("success created");
      })
      .catch((err) => console.log(err));

    setUserName("");
    setDayOfBirth("");
    setAdress("");
    setEmail("");
    setID_Card("");
    setPhone("");
  };
  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <form>
                  <div>
                    <label htmlFor="username">Username</label>
                    <div>
                      <input
                        type="text"
                        name="username"
                        placeholder="Enter Your Name"
                        value={Username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dayofbirth">Day Of Birth</label>
                    <div>
                      <input
                        type="text"
                        name="dayofbirth"
                        value={DayOfBirth}
                        placeholder="Day Of Birth"
                        onChange={(e) => setDayOfBirth(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <div>
                      <input
                        type="text"
                        name="email"
                        value={Email}
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="adress">Address</label>
                    <div>
                      <input
                        type="text"
                        name="address"
                        value={Address}
                        placeholder="Address"
                        onChange={(e) => setAdress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="idcard">ID_Card</label>
                    <div>
                      <input
                        type="text"
                        value={ID_Card}
                        name="idcard"
                        placeholder="ID_Card"
                        onChange={(e) => setID_Card(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <div>
                      <input
                        type="text"
                        name="phone"
                        value={Phone}
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <span onClick={handleSubmit}>Submit</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Check;
