import { Button, Input } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Signup.scss';

const cx = classNames.bind(styles);

function Signup() {
    
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [sex, setSex] = useState('')
    const [birthday, setBirthday] = useState('')

    const handleFirstName = (e) => {
        setFirstname(e.target.value);
    }
    const handleLastName = (e) => {
        setLastname(e.target.value);
    }
    const handleUserName = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSex = (e) => {
        setSex(e.target.value);
    }
    const handleBirthday = (e) => {
        setBirthday(e.target.value);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-signup')}>
                <h2 className={cx('title')}>SIGN UP</h2>
                <div className={cx('name')}>
                    <Input placeholder="First Name"  className={cx('name-input')}onChange={setFirstname}/>
                    <Input placeholder="Last Name"  className={cx('name-input')} onChange={setLastname}/>
                </div>
                <Input placeholder="Username"  className={cx('signup-input')} onChange={setUsername}/>
                <Input placeholder="Password"  className={cx('signup-input')} onChange={setPassword}/>
                <Input placeholder="Sex: M or F"  className={cx('signup-input')} onChange={setSex}/>
                <Input placeholder="BirthDay"  className={cx('signup-input')} onChange={setBirthday}/>
                <Link to={'/login'}>
                    <Button>Sign up</Button>
                </Link>
            </div>
        </div>
    );
}

export default Signup;
