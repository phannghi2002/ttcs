import { useState } from "react";
import axios from "axios";
import "./Check.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Check() {
  const [Username, setUserName] = useState("");
  const [DayOfBirth, setDayOfBirth] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAdress] = useState("");
  const [ID_Card, setID_Card] = useState("");
  const [Phone, setPhone] = useState("");

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
        toast.success("Enter information successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Fail. Please try again");
      });

    setUserName("");
    setDayOfBirth("");
    setAdress("");
    setEmail("");
    setID_Card("");
    setPhone("");
  };

  return (
    <div className="wrapper_1">
      <div className="container_0">
        <h2 className="title_1 pb-2">Enter Information</h2>

        <form className="form_1 mt-2">
          <div className="content_1 mb-2">
            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="username">
                Username
              </label>

              <input
                type="text"
                id="username"
                placeholder="Enter Your Name"
                value={Username}
                onChange={(e) => setUserName(e.target.value)}
                className="input_1"
              />
            </div>

            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="dayofbirth">
                Day Of Birth
              </label>

              <input
                type="text"
                id="dayofbirth"
                value={DayOfBirth}
                placeholder="Day Of Birth"
                onChange={(e) => setDayOfBirth(e.target.value)}
                className="input_1"
              />
            </div>
          </div>

          <div className="content_1 mb-2">
            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="email">
                Email
              </label>

              <input
                type="text"
                id="email"
                value={Email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="input_1"
              />
            </div>

            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="adress">
                Address
              </label>

              <input
                type="text"
                id="address"
                value={Address}
                placeholder="Address"
                onChange={(e) => setAdress(e.target.value)}
                className="input_1"
              />
            </div>
          </div>

          <div className="content_1">
            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="idcard">
                ID_Card
              </label>

              <input
                type="text"
                value={ID_Card}
                id="idcard"
                placeholder="ID_Card"
                onChange={(e) => setID_Card(e.target.value)}
                className="input_1"
              />
            </div>

            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="phone">
                Phone
              </label>

              <input
                type="text"
                id="phone"
                value={Phone}
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
                className="input_1"
              />
            </div>
          </div>

          <div className="content_1 mt-5">
            <Link to="/" className="button_submit col_6">
              {/* <div className="button_submit col_6"> */}
              <span>Return</span>
            </Link>
            {/* </div> */}

            <div className="button_submit col_6" onClick={handleSubmit}>
              <span>Submit</span>
            </div>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Check;
