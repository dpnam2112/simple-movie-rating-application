# Check if a user is old enough to be able to rate a film
CREATE TRIGGER check_user_rates_films BEFORE INSERT
ON user_rates_films
FOR EACH ROW
BEGIN
	IF (NOT user_eligible_to_rate(NEW.user_id, NEW.film_id)) THEN
		SIGNAL SQLSTATE '45000'
			SET message_text = "User is not eligible to rate the film.";
    END IF;
END;

# Check if the start_year is not greater than end_year
CREATE TRIGGER tv_series_compare_start_and_end BEFORE INSERT
ON tv_series
FOR EACH ROW
BEGIN
	IF (NEW.end_year < NEW.start_year) THEN
        SIGNAL SQLSTATE '45000'
			SET message_text = "end_year must not be less than start_year.";
    END IF;
END;