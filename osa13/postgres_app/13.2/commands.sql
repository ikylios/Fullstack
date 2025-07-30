CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,    
    likes int DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) 
VALUES 
('author1', 'url1', 'title1', 1), 
('author2', 'url2', 'title2', 2);
