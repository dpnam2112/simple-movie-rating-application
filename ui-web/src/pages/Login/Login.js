import { Button } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Login.scss';

const cx = classNames.bind(styles);
function Login() {
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <h2 className={cx('title')}> LOG IN</h2>
                
                <Link >
                    <Button
                    >
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
