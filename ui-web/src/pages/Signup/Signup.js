import { Button } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Signup.scss';

const cx = classNames.bind(styles);

function Signup() {
    

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-signup')}>
                <h2 className={cx('title')}>SIGN UP</h2>
                
                <Link to={'/MyDashboard'}>
                    <Button 
                    >
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Signup;
