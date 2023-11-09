import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Navbar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-container")}>
        <ul className={cx("navbar")}>
          <Link to="/" className={cx("home")}>
            <li className={cx("navbar-item")}>Trang chủ</li>
          </Link>

          <Link to="/myFlight" className={cx("home")}>
            <li className={cx("navbar-item")}>Tra cứu chuyến bay của tôi</li>
          </Link>

          <li className={cx("navbar-item")}>Liên hệ</li>
        </ul>
        <span className={cx("login")}>Đăng nhập</span>
      </div>
    </div>
  );
}

export default Navbar;
