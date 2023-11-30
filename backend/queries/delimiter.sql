
DELIMITER //

-- Thủ tục để thêm dữ liệu vào bảng actor
CREATE PROCEDURE InsertActor(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_gender CHAR,
    IN p_birth_date DATE
)
BEGIN
    -- Kiểm tra dữ liệu hợp lệ
    IF (LENGTH(p_first_name) = 0 OR LENGTH(p_last_name) = 0 OR p_gender NOT IN ('M', 'F') OR p_birth_date IS NULL) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Dữ liệu không hợp lệ!';
    ELSE
        -- Thực hiện thêm dữ liệu
        INSERT INTO actor (first_name, last_name, gender, birth_date) VALUES (p_first_name, p_last_name, p_gender, p_birth_date);
    END IF;
END //

-- Thủ tục để sửa dữ liệu trong bảng actor
CREATE PROCEDURE UpdateActor(
    IN p_actor_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_gender CHAR,
    IN p_birth_date DATE
)
BEGIN
    -- Kiểm tra dữ liệu hợp lệ
    IF (p_actor_id IS NULL OR LENGTH(p_first_name) = 0 OR LENGTH(p_last_name) = 0 OR p_gender NOT IN ('M', 'F') OR p_birth_date IS NULL) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Dữ liệu không hợp lệ!';
    ELSE
        -- Thực hiện sửa dữ liệu
        UPDATE actor
        SET first_name = p_first_name, last_name = p_last_name, gender = p_gender, birth_date = p_birth_date
        WHERE id = p_actor_id;
    END IF;
END //

-- Thủ tục để xóa dữ liệu từ bảng actor
CREATE PROCEDURE DeleteActor(IN p_actor_id INT)
BEGIN
    -- Kiểm tra dữ liệu hợp lệ
    IF (p_actor_id IS NULL) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Dữ liệu không hợp lệ!';
    ELSE
        -- Thực hiện xóa dữ liệu
        DELETE FROM actor WHERE id = p_actor_id;
    END IF;
END //

-- Các thủ tục tương tự có thể được tạo cho các bảng khác

DELIMITER ;
