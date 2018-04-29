CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product VARCHAR(30) NOT NULL,
	department VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product, department, price, quantity)
VALUES  ('Toothpaste', 'Cosmetics', 3.25, 500),
        ('Wool Socks', 'Clothing', 8.50, 150),
        ('Snow Tires', 'Automotive', 650, 50),
        ('DVD Player', 'Electronics', 200, 25),
        ('Toaster Oven', 'Kitchen', 200, 75),
        ('Post-it notes', 'Office', 3.5, 700),
        ('Deodorant', 'Cosmetics', 3, 200),
        ('Paper Towels', 'Kitchen', 2.50, 600),
        ('Blender', 'Kitchen', 200, 25),
        ('Phone Charger', 'Electronics', 15, 300);