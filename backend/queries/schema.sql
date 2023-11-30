CREATE TABLE actor (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender CHAR,
    birth_date DATE
);

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    username VARCHAR(50),
    hash_password VARCHAR(50),
    gender CHAR,
    birth_date DATE
);

CREATE TABLE film_crewmate (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender CHAR,
    birth_date DATE
);

CREATE TABLE film_crewmate_role (
	fc_role VARCHAR(15),
    film_crewmate_id INT,
    
    FOREIGN KEY (film_crewmate_id) REFERENCES film_crewmate(id)
);

CREATE TABLE film (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    img_href VARCHAR(200),
    age_restriction INT,
	rating_count INT DEFAULT 0
);

CREATE TABLE movie (
	id INT PRIMARY KEY,
    duration INT,
    premiere_year INT,
    short_description VARCHAR(1000),
    next_mv_id INT,
    
    FOREIGN KEY (id) REFERENCES film(id),
    FOREIGN KEY (next_mv_id) REFERENCES movie(id)
);

CREATE TABLE tv_series (
	id INT PRIMARY KEY,
    start_year INT,
    end_year INT,
    short_description VARCHAR(1000),
    season INT,
    
	FOREIGN KEY (id) REFERENCES film(id)
);

CREATE TABLE user_rates_films (
	user_id INT,
    film_id INT,
    score INT,
    
    UNIQUE (user_id, film_id),
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (film_id) REFERENCES film(id)
);

CREATE TABLE images_in_film (
	film_id INT,
    img_src VARCHAR(200),
    
    FOREIGN KEY (film_id) REFERENCES film(id)
);

CREATE TABLE trailers_in_film (
	film_id INT,
    img_src VARCHAR(200),
    
    FOREIGN KEY (film_id) REFERENCES film(id)
);

CREATE TABLE categories_of_film (
	film_id INT,
    category VARCHAR(20),
    
    FOREIGN KEY (film_id) REFERENCES film(id)
);

CREATE TABLE streaming_platform (
	id INT PRIMARY KEY AUTO_INCREMENT,
    platform_name VARCHAR(20),
    platform_url VARCHAR(100)
);

CREATE TABLE production_company (
	id INT PRIMARY KEY AUTO_INCREMENT,
    comp_name VARCHAR(50),
    establishment_yr INT,
    nation VARCHAR(20),
    production_history VARCHAR(200)
);

CREATE TABLE episode (
	tv_series_id INT,
    e_number INT,
    title VARCHAR(50),
    duration INT,
    pub_date DATE,
    short_description VARCHAR(100),
    avg_score FLOAT,
    
    FOREIGN KEY (tv_series_id) REFERENCES tv_series(id),
    UNIQUE (tv_series_id, e_number),
    INDEX (e_number)
);

CREATE TABLE thread (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    date_created DATE,
    user_id INT,
    film_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (film_id) REFERENCES film(id)
);

CREATE TABLE user_comment (
	id INT PRIMARY KEY AUTO_INCREMENT,
    thread_id INT,
    user_id INT,
    content VARCHAR(200),
    post_date DATE,
    reply_to_comment INT,
    
    FOREIGN KEY (thread_id) REFERENCES thread(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reply_to_comment) REFERENCES user_comment(id)
);

CREATE TABLE review (
	id INT PRIMARY KEY AUTO_INCREMENT,
    film_id INT,
    user_id INT,
    title VARCHAR(50),
    post_date DATE,
    content VARCHAR(200),
    like_count INT,
    
    FOREIGN KEY (film_id) REFERENCES film(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_like_review (
	review_id INT,
    user_id INT,
	
    FOREIGN KEY (review_id) REFERENCES review(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE actor_film (
	actor_id INT,
    film_id INT,

    FOREIGN KEY (actor_id) REFERENCES actor(id),
    FOREIGN KEY (film_id) REFERENCES film(id)
);

CREATE TABLE char_quote (
	actor_id INT,
    film_id INT,
    character_name VARCHAR(100),
    quote_content VARCHAR(100),

    FOREIGN KEY (actor_id) REFERENCES actor(id),
    FOREIGN KEY (film_id) REFERENCES film(id)
);

CREATE TABLE crewmate_film (
	crewmate_id INT,
    film_id INT,
    
    FOREIGN KEY (crewmate_id) REFERENCES film_crewmate(id),
    FOREIGN KEY (film_id) REFERENCES film(id)
);

CREATE TABLE user_rates_episode (
	user_id INT,
    film_id INT,
    ep_number INT,
    score FLOAT,
    
    FOREIGN KEY (film_id) REFERENCES film(id),
    FOREIGN KEY (ep_number) REFERENCES episode(e_number),
    UNIQUE(user_id, film_id, ep_number)
)