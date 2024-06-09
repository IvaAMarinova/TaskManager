GRANT ALL PRIVILEGES ON *.* TO 'maxscale_user'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE tasks;
USE tasks;

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    text TEXT NOT NULL
);

INSERT INTO tasks (name, text) VALUES ('Brush hair', '3 times');
INSERT INTO tasks (name, text) VALUES ('Study', 'for 2 hours');
INSERT INTO tasks (name, text) VALUES ('Wash clothes', 'all pink clothes');
