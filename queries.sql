CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE,
    password VARCHAR(100),
    role TINYINT
);

CREATE TABLE RefreshSessions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(25) REFERENCES Users(name) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(400) NOT NULL,
    expires_in BIGINT NOT NULL
);