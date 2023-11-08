import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";

const cx = classNames.bind(styles);

function Navbar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-container")}>
        <ul className={cx("navbar")}>
          <li className={cx("navbar-item")}>Trang chủ</li>
          <li className={cx("navbar-item")}>Tìm kiếm</li>
          <li className={cx("navbar-item")}>Liên hệ</li>
        </ul>
        <span className={cx("login")}>Đăng nhập</span>
      </div>
    </div>
  );
}

export default Navbar;
