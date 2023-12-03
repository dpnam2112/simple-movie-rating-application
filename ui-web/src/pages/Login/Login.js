import { Button, Input } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.scss';

const cx = classNames.bind(styles);
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleInputUsername = (e) => {
        setUsername(e.target.value);
    }


    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    }
     return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <h2 className={cx('title')}> Đăng nhập</h2>
                <Input placeholder="Username" onChange={handleInputUsername} className={cx('login-input')}/>
                <Input placeholder="Password" onChange={handleInputPassword} className={cx('signup-input')}/>
                <div className={cx('btn')}>
                    <Link to={`/`}>
                        <Button type='primary' className={cx('login-btn')}>Đăng nhập</Button>
                    </Link>
                    <Link to={`/signup`}>
                        <Button type='primary' className={cx('signup-btn')}>Đăng ký</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
