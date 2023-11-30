USE movie_rating_db;

delimiter |

CREATE PROCEDURE movie_info(IN id INT)
BEGIN
	# Fetch movie's basic information
    SELECT * FROM movie
    JOIN film ON movie.id = film.id
    WHERE movie.id = id;

    # Fetch all images of the movie
    SELECT img_src FROM images_in_film
    WHERE images_in_film.film_id = id;
    
    # Fetch all actors who participate in the movie
    SELECT * FROM actor_film
    JOIN actor ON actor_film.actor_id = actor.id
    WHERE actor_film.film_id = id;
END |

CREATE PROCEDURE tv_series_info(IN id INT)
BEGIN
    # Fetch all images of the movie
    SELECT * FROM movie
    JOIN images_in_film ON movie.id = images_in_film.id;
    
    # Fetch all actors who participate in the movie
    SELECT * FROM actor_film
    JOIN actor ON actor_film.id = actor.id
    WHERE actor_film.film_id = movie.id;
END |

CREATE PROCEDURE movie_ranking_by_category(IN category VARCHAR(50))
BEGIN
	SELECT film.id, film.name, AVG(user_rates_film.score) as avg_score
	FROM film
	JOIN movie ON film.id = movie.id
	JOIN user_rates_film ON film.id = user_rates_film.film_id
    JOIN categories_of_film ON film.id = categories_of_film.id
    WHERE categories_of_film.category = category
	GROUP BY user_rates_film.id
	ORDER BY avg_score;
END; |

# Get reviews of a film identified by film_id and their information
CREATE PROCEDURE get_reviews(IN film_id INT)
BEGIN
	SELECT review.id, review.title, 
	users.id, users.id.first_name, users.last_name,
    COUNT(user_like_review.user_id) as like_count
    FROM review
    JOIN user_like_review ON review.id = user_like_review.review_id
    JOIN users ON review.user_id = users.id
    WHERE film.id = review.film_id
    GROUP BY user_like_review.review_id
    ORDER BY like_count;
END; |

CALL movie_info(0);