import { useState } from "react";
import axios from "axios";
import "./Check.scss";
import { toast } from "react-toastify";
import ToastCustom from "../../Toast";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ModalSeatBooking } from "../../Modal";

function Check() {
  const [data, setData] = useState({
    Username: "",
    DayOfBirth: "",
    Email: "",
    Address: "",
    ID_Card: "",
    Phone: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    setData({ ...data, [id]: value });
  };

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/auth/enterInfo", {
        Username: data.Username,
        DayOfBirth: data.DayOfBirth,
        Email: data.Email,
        Address: data.Address,
        ID_Card: data.ID_Card,
        Phone: data.Phone,
      })
      .then((res) => {
        console.log(res);
        toast.success("Enter information successful");
        setData({
          Username: "",
          DayOfBirth: "",
          Email: "",
          Address: "",
          ID_Card: "",
          Phone: "",
        });

        setTimeout(() => {
          setShowModal(true);
        }, 3000);

        // Store bookedButton in localStorage
        localStorage.setItem("inforPerson", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Fail. Please try again");
        setTimeout(() => {
          setShowModal(true);
        }, 3000);
      });
  };

  return (
    <div className="wrapper_1">
      <div className="container_0">
        <h2 className="title_1 pb-2">Enter Information</h2>

        <form className="form_1 mt-2">
          <div className="content_1 mb-2">
            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="Username">
                Username
              </label>

              <input
                type="text"
                id="Username"
                placeholder="Enter Your Name"
                value={data.Username}
                onChange={handleChange}
                className="input_1"
              />
            </div>

            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="DayOfBirth">
                Day Of Birth
              </label>

              <input
                type="text"
                id="DayOfBirth"
                value={data.DayOfBirth}
                placeholder="Day Of Birth"
                onChange={handleChange}
                className="input_1"
              />
            </div>
          </div>

          <div className="content_1 mb-2">
            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="Email">
                Email
              </label>

              <input
                type="text"
                id="Email"
                value={data.Email}
                placeholder="Email Address"
                onChange={handleChange}
                className="input_1"
              />
            </div>

            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="Address">
                Address
              </label>

              <input
                type="text"
                id="Address"
                value={data.Address}
                placeholder="Address"
                onChange={handleChange}
                className="input_1"
              />
            </div>
          </div>

          <div className="content_1">
            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="ID_Card">
                ID_Card
              </label>

              <input
                type="text"
                value={data.ID_Card}
                id="ID_Card"
                placeholder="ID_Card"
                onChange={handleChange}
                className="input_1"
              />
            </div>

            <div className="col_6">
              <label className="title_2 mb-1" htmlFor="Phone">
                Phone
              </label>

              <input
                type="text"
                id="Phone"
                value={data.Phone}
                placeholder="Phone"
                onChange={handleChange}
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

            <ToastCustom />
          </div>
        </form>
      </div>

      {showModal && (
        <ModalSeatBooking show={showModal} setShow={setShowModal} />
      )}
    </div>
  );
}

export default Check;
