# Check if a user is old enough to be able to rate a film
/*
constraints to consider:
 -	no two tv_series can have the same title 
    and the same season number.
    
 - 	
    
triggers:
 - 	trigger for updating film(rating_count)
 - 	trigger for updating review(like_count)
 - 	trigger for calculating episode(avg_score)
*/

CREATE TRIGGER upd_rating_count AFTER INSERT
ON user_rates_films
FOR EACH ROW
	UPDATE film
    SET rating_count = rating_count + 1
    WHERE id = user_rates_films.film_id;
    
# Update like count of a review after a user likes a review
CREATE TRIGGER upd_review_like_count AFTER INSERT
ON user_like_review
FOR EACH ROW
	UPDATE review
    SET like_count = like_count + 1
    WHERE id = user_like_review.review_id;

# Update episode's average score
CREATE TRIGGER upd_episode_avg_score AFTER INSERT
ON user_rates_episode
FOR EACH ROW
	UPDATE episode 
    JOIN user_rates_episode ON episode.ep_number = user_rates_episode.ep_number
    SET episode.avg_score = AVG(episode.score)
    WHERE episode.ep_number = NEW.ep_number;

delimiter //

# Check if a user is old enough to be able to rate a film
CREATE TRIGGER check_user_rates_films BEFORE INSERT
ON user_rates_films
FOR EACH ROW
BEGIN
	IF (NOT user_eligible_to_rate(NEW.user_id, NEW.film_id)) THEN
		SIGNAL SQLSTATE '45000'
			SET message_text = "User is not eligible to rate the film.";
    END IF;
END;//

delimiter;

delimiter //

# Check if the start_year is not greater than end_year
CREATE TRIGGER tv_series_compare_start_and_end BEFORE INSERT
ON tv_series
FOR EACH ROW
BEGIN
	IF (NEW.end_year < NEW.start_year) THEN
        SIGNAL SQLSTATE '45000'
			SET message_text = "end_year must not be less than start_year.";
    END IF;
END;//

delimiter ;