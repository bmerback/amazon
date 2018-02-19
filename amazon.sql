CREATE DATABASE Bamazon_DB;
USE Bamazon_DB;

CREATE TABLE products (
item_id INT(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(250) NULL,
department_name VARCHAR(250) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);
  
INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES 
("Nintendo Switch", "Electronics", 299.99, 4),
("Xbox One X", "Electronics", 399.99, 10),
("Basketball", "Sporting Goods", 49.99, 23),
("Soccer Ball", "Sporting Goods", 29.99, 17),
("Samsung Galaxy S8+", "Cell Phones & Accessories", 299.99, 50),
("iPhone X", "Cell Phones & Accessories", 999.99, 3),
("iPhone X Case", "Cell Phones & Accessories", 54.99, 20),
("Converse", "Men's Apparel", 59.99, 12),
("Connect Four", "Toys & Games", 19.99, 8),
("Monopoly", "Toys & Games", 24.99, 1);

SELECT * FROM products

CREATE TABLE departments (
	department_id INTEGER (10) AUTO_INCREMENT NOT NULL,
	department_name VARCHAR (250) NOT NULL,
	over_head_costs DECIMAL (10,2) NOT NULL,
	total_sales DECIMAL (10,2),
	PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("Electronics", "399.99", "0.00"),
	   ("Sporting Goods", "49.99", "0.00"),
	   ("Cell Phones & Accessories", "999.99", "0.00"),
	   ("Men's Apparel", "59.99", "0.00"),
	   ("Toys & Games", "24.99", "0.00");
