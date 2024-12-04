DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS sessions;
DROP TRIGGER IF EXISTS update_blog_posts_updated;
DROP TRIGGER IF EXISTS validate_all_sessions_expiry_on_update;


CREATE TABLE blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    cookie TEXT NOT NULL,
    username TEXT NOT NULL,
    expire_date DATETIME NOT NULL
);

CREATE TRIGGER update_blog_posts_updated 
AFTER UPDATE ON blog_posts
FOR EACH ROW
BEGIN
    UPDATE blog_posts
    SET updated = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;

CREATE TRIGGER validate_all_sessions_expiry_on_update
AFTER UPDATE ON sessions
FOR EACH ROW
BEGIN
    DELETE FROM sessions
    WHERE expire_date < CURRENT_TIMESTAMP;
END;
