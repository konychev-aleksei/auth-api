CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE,
    password VARCHAR(100),
    role SMALLINT
);

CREATE TABLE RefreshSessions(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES Users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(400) NOT NULL 
);

DROP TABLE Users CASCADE;
DROP TABLE RefreshSessions;

SELECT * FROM Users;
SELECT * FROM RefreshSessions;