CREATE TABLE IF NOT EXISTS favourites (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER,
    user_id INTEGER,
    seller_id INTEGER
);
CREATE TABLE IF NOT EXISTS sellers (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    shop_name TEXT NOT NUll,
    image_url TEXT,
    about TEXT,
    category_id INTEGER,
    seller_id INTEGER REFERENCES sellers(id),
    favourites_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT
);

CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    listing_name TEXT,
    listing_details TEXT,
    image_url TEXT,
    quantity INTEGER,
    price NUMERIC (6,2),
    shop_id INTEGER,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    review TEXT,
    rating NUMERIC (3,2),
    shop_id INTEGER,
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY, 
    item_name TEXT,
    enquirer_id INTEGER, 
    enquirer_name TEXT, 
    email_address TEXT NOT NULL, 
    query TEXT, 
    shop_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS responses (
    id SERIAL PRIMARY KEY,
    enquirer_id INTEGER,
    respondent_id INTEGER,
    enquiry_id INTEGER,
    response TEXT
);