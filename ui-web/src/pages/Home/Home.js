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
    // const [valuesearch, setValueSearch] = useState('');
    const [islogin, setIsLogin] = useState(true);
    const [rate, setRate] = useState(1);
    const [review, setReview] = useState('');
    const [titlereview, setTitleReview] = useState('');
    const [idfilmrate, setIDFilmRate] = useState(1);
    const [idfilmreview, setIDFilmReview] = useState(1);
    const [iduser, setIDUser] = useState(1);

    // const onSearch = (value, _e) => {
    //     setValueSearch(value);
    // }
    
    const Logout = () =>{
        setIsLogin(false)
    }
    const handleRate = (value) =>{
        setRate(value)
    }
    const handleIDFilmRate = (value) => {
        setIDFilmRate(value);
    }
    const handleIDFilmReview = (value) => {
        setIDFilmReview(value);
    }
    const handleIDUser = (value) => {
        setIDUser(value);
    }
    const handleReview = (e) => {
        setReview(e.target.value);
    }
    const handleTitleReview = (e) => {
        setTitleReview(e.target.value);
    }
    const handleRating = () => {
        //Lưu giá trị
        setRate(1);
        setIDUser(1)
        setIDFilmRate(1);
    }
    const handleReviewFilm = () => {
        setIDFilmReview(1)
        setIDUser(1)
        setTitleReview('')
        setReview('')
    }

    return ( 
    <div className={cx('wrapper')}>
        <div className={cx('header')}>
        <Search
            placeholder="Search"
            // onSearch={onSearch}
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
                <h2 className={cx('title')}>Rating</h2>
                <div className={cx('id')}>
                <h3 className={cx('title-input')}>ID Film</h3>
                <InputNumber
                    className={cx('rating-id')}
                    min={1}
                    defaultValue={1}
                    value = {idfilmrate}
                    onChange={handleIDFilmRate}
                    />
                <h3 className={cx('title-input')}>ID user</h3>
                <InputNumber
                    className={cx('rating-id')}
                    value={iduser}
                    min={1}
                    defaultValue={1}
                    onChange={handleIDUser}
                    placeholder='ID film'
                    />
                </div>
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
                <h2 className={cx('title')}>Review</h2>
                <div className={cx('id')}>     
                <h3 className={cx('title-input')}>ID film</h3>
                <InputNumber
                    className={cx('rating-id')}
                    value={idfilmreview}
                    min={1}
                    defaultValue={1}
                    onChange={handleIDFilmReview}
                    placeholder='ID film'
                    />
                <h3 className={cx('title-input')}>ID user</h3>
                <InputNumber
                    className={cx('rating-id')}
                    value={iduser}
                    min={1}
                    defaultValue={1}
                    onChange={handleIDUser}
                    placeholder='ID film'
                    />
                </div>
                <Input
                className={cx('rating-input__title')}
                placeholder='Title'
                onChange={handleTitleReview}
                value={titlereview}
                />
                <Input
                className={cx('rating-input__review')}
                placeholder='Review'
                onChange={handleReview}
                value={review}
                />
                <Button type='primary' onClick={handleReviewFilm}>Gửi</Button>
            </div>
        </div>
    </div> 
    );
}

export default Home;