INSERT INTO sellers (username, hashed_password) VALUES ('jarryl', 'hello');
INSERT INTO sellers (username, hashed_password) VALUES ('alvis', 'hello');
INSERT INTO sellers (username, hashed_password) VALUES ('joey', 'hello');

INSERT INTO categories (category_name) VALUES ('food');
INSERT INTO categories (category_name) VALUES ('apparel');
INSERT INTO categories (category_name) VALUES ('gadgets');

INSERT INTO shops (shop_name, image_url, about, category_id, seller_id) VALUES ('Jarryl', 'https://i2.wp.com/www.techgrapple.com/wp-content/uploads/2016/03/John-Lennon-Quote-FaceBook-Cover.jpg?resize=851%2C315&ssl=1', 'This is jarry''s shop', 2, 1);
INSERT INTO shops (shop_name, image_url, about, category_id, seller_id) VALUES ('Alvis', 'https://i.pinimg.com/originals/a7/d0/61/a7d061a54f31db9330dec99b28aab1ca.jpg', 'This is alvis''s shop', 1, 2);
INSERT INTO shops (shop_name, image_url, about, category_id, seller_id) VALUES ('Joey', 'https://3.bp.blogspot.com/-XI6_2cUTWQs/U-_hjqaDoNI/AAAAAAAAA1w/Eo4rhC_JiUk/s1600/youcovers.com_facebook%2Bcovers-photos-67.png', 'This is joey''s shop', 3, 3);

INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('My Smelly Socks', 'Socks, very smelly socks', 'https://thumbs.dreamstime.com/b/dirty-sock-bad-stench-sloppy-clothes-stinky-toe-grey-object-washing-cartoon-flat-illustration-green-wave-smelly-feet-175743396.jpg', 1, 2);
INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('Jacket', 'Stay warm', 'https://cdn.shopify.com/s/files/1/2694/4876/products/vne-98431-front-1.jpg?v=1587813320', 1, 2);
INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('Bjj Gi', 'I have no staph infection, i swear', 'https://www.bjjee.com/wp-content/uploads/2015/07/chris-haeuter.jpg', 1, 2);
INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('Cookies', 'Delicious homemade cookies', 'https://ak.picdn.net/shutterstock/videos/30274741/thumb/1.jpg', 2, 1);
INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('Ice Cream', 'You scream, i scream for ice cream', 'https://www.tasteofhome.com/wp-content/uploads/2018/08/waffle-cone-ice-creams.jpg', 2, 1);
INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('Cakes', 'Grab a slice', 'https://www.glorioustreats.com/wp-content/uploads/2018/05/top-down-view-of-strawberry-shortcake-cake-on-white-metal-cake-stand.jpg', 2, 1);
INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('Headphones', 'Disappear into a world of your own', 'https://massdrop-s3.imgix.net/product-images/massdrop-x-sennheiser-hd-58x-jubilee-headphones/FP/jbCgVcPdRXZC1YRI2oZ3_3qKeFvWGRbQ3wreRhIVc_58x_clear.png?bg=f0f0f0', 3, 3);
INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('iPhone', 'Give me all your money', 'https://www.smartgeneration.it/wp-content/uploads/2019/03/IPHONE-X-SILVER.jpg', 3, 3);
INSERT INTO listings (listing_name, listing_details, image_url, shop_id, category_id) VALUES ('Film Camera', 'Capture the world', 'https://d2h1pu99sxkfvn.cloudfront.net/b0/5471486/372139983_eKTJQcOatS/P0.jpg', 3, 3);

INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ('seller was quick to respond, and patiently answered all my enquiries.', 4, 1, 3);
INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ('seller took a long time to ship my items out.', 3, 1, 2);
INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ('best cookies I''ve ever tried.', 5, 2, 3);
INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ('seller never replied to my enquiry.', 1, 2, 1);
INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ('quality of the headphone was okay.', 4, 3, 1);
INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ('can''t expect much for the price I paid.', 2, 3, 2);
INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ('pearls were very chewy. will buy again.', 4, 4, 1);
INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ('not a lot of variety.', 2, 4, 2);