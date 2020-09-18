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
CREATE TABLE IF NOT EXISTS favourites (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER
);
CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    shop_name TEXT NOT NUll,
    image_url TEXT,
    about TEXT,
    category_id INTEGER,
    seller_id INTEGER REFERENCES sellers(id)
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
    shop_id INTEGER,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    review TEXT,
    item_id INTEGER,
    shop_id INTEGER,
    rating NUMERIC (3,2),
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS enquiries (id SERIAL PRIMARY KEY, item_name TEXT, email_address TEXT NOT NULL, query TEXT, shop_id INTEGER NOT NULL);


SELECT enquiries.item_name, enquiries.email_address, enquiries.enquirer_name, enquiries.query, shops.shop_name FROM enquiries INNER JOIN shops ON enquiries.shop_id = shops.id INNER JOIN sellers ON sellers.id = shops.seller_id WHERE sellers.id = 2;

INSERT INTO listings (listing_name, listing_details, shop_id) VALUES ('testItem', $$test item for Alvis's second shop$$, 4);