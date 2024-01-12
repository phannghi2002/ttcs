import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SignIn() {
    const [datas, setDatas] = useState([]);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:4000/login`).then((reponse) => {
            setDatas(reponse.data);
        });
    }, []);

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        const data = datas.data;
        for (let i = 0; i < data.length; i++) {
            if (data[i].AccountName === userName && data[i].Password === password) {
                setIsSuccess(true);
                window.location = 'http://localhost:3000/admin';
                localStorage.setItem('Login', data[i].Name);
                break;
            } else {
                setIsSuccess(false);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Đăng nhập</h2>
                {!isSuccess ? (
                    <span className={cx('error-login')}>Đăng nhập không thành công, Vui lòng thử lại</span>
                ) : (
                    <span></span>
                )}

                <div className={cx('input-login')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                    <input
                        value={userName}
                        type="text"
                        id="Email"
                        placeholder="Tên đăng nhập"
                        className={cx('input')}
                        onChange={handleUserName}
                    />
                    <span className={cx('error-message')}>Trường này không được bỏ trống</span>
                </div>

                <div className={cx('input-login')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                    <input
                        value={password}
                        type="text"
                        id="Password"
                        placeholder="Mật khẩu"
                        className={cx('input')}
                        onChange={handlePassword}
                    />
                    <span className={cx('error-message')}>Trường này phải là email</span>
                </div>

                <div className={cx('button-wrapper')}>
                    <button type="button" className={cx('login-btn')} onClick={handleLogin}>
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
