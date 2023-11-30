SET GLOBAL log_bin_trust_function_creators = 1;

CREATE FUNCTION user_eligible_to_rate(user_id INT, film_id INT)
RETURNS BOOL
BEGIN
	# Calculate user's age
    SELECT (DATEDIFF(CURRENT_DATE(), users.birth_date)) / 365
    INTO @age
    FROM users
    WHERE users.id = user_rates_film.id;
    
    # Get age restriction of the film
    SELECT age_restriction
    INTO @age_restr
    FROM film
    WHERE film.id = NEW.film_id;
    
    RETURN @age < @age_restr;
END;