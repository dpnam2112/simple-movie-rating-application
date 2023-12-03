import { Button, Input, InputNumber } from 'antd';
import className from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const { Search } = Input;
const cx = className.bind(styles);

const films = [
    {
        id: 1,
        name: "Nhà tù Shawshank",
        premiere_year: 1994,
        duration: 142,
        age_restriction: 18,
        rating_count: 1000,
        image: "image1.png"
    },
    {
        id: 1,
        name: "Nhà tù Shawshank",
        premiere_year: 1994,
        duration: 142,
        age_restriction: 18,
        rating_count: 1000,
        image: "image1.png"
    }
]

function Home() {
    const [valuesearch, setValueSearch] = useState('');
    const [islogin, setIsLogin] = useState(true);
    const [rate, setRate] = useState(1);
    const [review, setReview] = useState('');
    const [idfilm, setIDFilm] = useState(1);

    const onSearch = (value, _e) => {
        setValueSearch(value);
    }
    
    const Logout = () =>{
        setIsLogin(false)
    }

    const handleRate = (value) =>{
        setRate(value)
    }

    const handleIDFilm = (value) => {
        setIDFilm(value);
    }

    const handleReview = (e) => {
        setReview(e.target.value);
    }
    const handleRating = () => {
        //Lưu giá trị
        setRate(1);
        setIDFilm(1);
    }

    const handleReviewFilm = () => {
        setIDFilm(1)
        setReview('')
    }

    return ( 
    <div className={cx('wrapper')}>
        <div className={cx('header')}>
        <Search
            placeholder="Search"
            onSearch={onSearch}
            allowClear
            className={cx('search-input')}
        />
        {!islogin ?
        <Link to={'./login'}>
            <Button type='primary' className={cx('login-btn')}>Đăng nhập</Button>
        </Link>
        :
            <Button type='primary' className={cx('login-btn')} onClick={Logout}>Đăng xuất</Button>
        }
        </div>
        <div className={cx('body')}>
            <div className={cx('movie')}>
                <h2 className={cx('title')}>Movie</h2>
                
                {films.map((film) => {
                    return (<div className={cx('film-card')}>
                        <Link to={'/signup'}>
                        <h3 className={cx('film-title')}>{film.name} - {film.image}</h3>
                        </Link>
                        <span className={cx('film-info')}>{film.premiere_year} - {film.duration}m - {film.age_restriction}  </span>
                        <div className={cx('film-rate')}>
                            <span className={cx('film-rating__count')}>{film.rating_count}</span>
                        </div>
                    </div>)
                    }
                    )}
            </div>
            <div className={cx('tvseries')}>
                <h2 className={cx('title')}>TV Series</h2>
                {films.map((film) => {
                    return (<div className={cx('film-card')}>
                        <Link to={'/signup'}>
                        <h3 className={cx('film-title')}>{film.name} - {film.image}</h3>
                        </Link>
                        <span className={cx('film-info')}>{film.premiere_year} - {film.duration}m - {film.age_restriction}  </span>
                        <div className={cx('film-rate')}>
                            <span className={cx('film-rating__count')}>{film.rating_count}</span>
                        </div>
                    </div>)
                    }
                    )}
            
            </div>
            <div className={cx('film-rating')}>
                <InputNumber
                    className={cx('rating-input')}
                    min={1}
                    defaultValue={1}
                    value = {idfilm}
                    onChange={handleIDFilm}
                />
                <InputNumber
                    className={cx('rating-input')}
                    value={rate}
                    min ={1}
                    max={10}
                    onChange={handleRate}
                    defaultValue={1}
                />
                <Button type='primary' onClick={handleRating}>Rate</Button>
            </div>
            <div className={cx('film-review')}>
                <InputNumber
                    className={cx('rating-input')}
                    value={idfilm}
                    min={1}
                    defaultValue={1}
                    onChange={handleIDFilm}
                />
                <Input
                className={cx('rating-input__review')}
                placeholder='Review'
                onChange={handleReview}
                value={review}
                />
                <Button type='primary' onClick={handleReviewFilm}>Review</Button>
            </div>
        </div>
    </div> 
    );
}

export default Home;