create database cosmetic_web;
use cosmetic_web;

CREATE TABLE admins (
	_id INT NOT NULL AUTO_INCREMENT,
	first_name varchar(255) NULL,
	last_name varchar(255) NULL,
	email varchar(255) NOT NULL,
	address varchar(255) NULL,
	phone_number varchar(255) NULL,
	password varchar(255) NOT NULL,
	status int NULL,
	created_day timestamp NULL,
	PRIMARY KEY (_id)
);

insert into admins(first_name, last_name, email, address, phone_number, password, status, created_day)
values('admin', 'admin', 'admin@gmail.com', 'hcmu', '0886636362', '$2b$10$dxZxZkzP7OLwhoTNpt.m1OClCiVnCM56k6menmu18doyHVqIqyuqe', 1, now());


CREATE TABLE users (
	_id INT NOT NULL AUTO_INCREMENT,
	first_name varchar(255) NULL,
	last_name varchar(255) NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	status int NULL,
	address varchar(255) NULL,
	phone_number varchar(255) NULL,
	created_day timestamp NULL,
	PRIMARY KEY (_id)
);

CREATE TABLE users_token (
	_id INT NOT NULL AUTO_INCREMENT,
	user_id int,
    refresh_token text,
    created_day timestamp NULL,
    primary key (_id),
    CONSTRAINT fk_userstoken_users FOREIGN KEY (user_id)
	REFERENCES users(_id)
);

CREATE TABLE admin_token (
	_id INT NOT NULL AUTO_INCREMENT,
	admin_id int,
    refresh_token text,
    created_day timestamp NULL,
    primary key (_id),
    CONSTRAINT fk_admintoken_admin FOREIGN KEY (admin_id)
	REFERENCES admins(_id)
);

CREATE TABLE category (
	_id INT NOT NULL AUTO_INCREMENT,
	category_name varchar(255) NULL,
	category_description text NULL,
	category_image varchar(255) NULL,
	created_day timestamp NULL,
	PRIMARY KEY (_id)
);

CREATE TABLE blog (
	_id INT NOT NULL AUTO_INCREMENT,
	blog_title text NULL,
	blog_desc text NULL,
	blog_image text NULL,
	blog_view int NULL,
	create_at timestamp NULL,
	CONSTRAINT blog_pkey PRIMARY KEY (_id)
);

CREATE TABLE blog_favourite (
	blog_id int NOT NULL,
	user_id int NOT NULL,
	CONSTRAINT pk_blog_favourite PRIMARY KEY (blog_id, user_id),
    
    CONSTRAINT `fk_blogfavourite_blog`
    FOREIGN KEY (`blog_id`)
    REFERENCES `blog` (`_id`),
    
    CONSTRAINT `fk_blogfavourite_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`_id`)
);

CREATE TABLE blog_review (
	_id INT NOT NULL AUTO_INCREMENT,
	review_date timestamp NULL,
	user_id int NULL,
	star int NULL,
	review text NULL,
	blog_id int NULL,
	status int NULL,
	CONSTRAINT blog_review_pkey PRIMARY KEY (_id),
    
    CONSTRAINT fk_blogreview_blog 
    FOREIGN KEY (blog_id) 
    REFERENCES blog(_id),
    
    CONSTRAINT fk_productreview_user 
    FOREIGN KEY (user_id) 
    REFERENCES users(_id)
);

CREATE TABLE product (
	_id INT NOT NULL AUTO_INCREMENT,
	product_name varchar(255) NULL,
	product_description text NULL,
	product_image varchar(255) NULL,
	product_price int4 NULL,
    sale_price int4 NULL,
	product_category int4 NULL,
	product_status int4 NULL,
	create_at timestamp NULL,
	init_quantity int4 NULL,
    currrent_quantity int4 NULL,
	CONSTRAINT product_pkey PRIMARY KEY (_id),
    
    CONSTRAINT fk_product_category 
    FOREIGN KEY (product_category) 
    REFERENCES category(_id)
);

CREATE TABLE product_review (
	_id INT NOT NULL AUTO_INCREMENT,
	review_date timestamp NULL,
	user_id int4 NULL,
	star int4 NULL,
	review text NULL,
	product_id int4 NULL,
	status int4 NULL,
	CONSTRAINT product_review_pkey PRIMARY KEY (_id),
    
    CONSTRAINT fk_productreview_product 
    FOREIGN KEY (product_id) 
    REFERENCES product(_id),
    
    CONSTRAINT fk_productreview_users 
    FOREIGN KEY (user_id) 
    REFERENCES users(_id)
);

CREATE TABLE product_review_children (
	_id INT NOT NULL AUTO_INCREMENT,
	review_id int4 NULL,
	user_id int4 NULL,
	review text NULL,
	status int4 NULL,
	review_date timestamp NULL,
	author_type text NULL,
	CONSTRAINT product_review_children_pkey PRIMARY KEY (_id),
    
    CONSTRAINT fk_productreviewchildren_productreview FOREIGN KEY (review_id) REFERENCES product_review(_id)
);

CREATE TABLE product_checkout (
	_id INT NOT NULL AUTO_INCREMENT,
	checkout_date timestamp NULL,
	total_price int4 NULL,
	user_id int4 NULL,
	user_first_name text NULL,
	user_last_name text NULL,
	user_address text NULL,
	user_phone text NULL,
	user_email text NULL,
	status int4 NULL,
	payment_method text NULL,
	pickup_method text NULL,
	pickup_date timestamp NULL,
	CONSTRAINT product_checkout_pkey PRIMARY KEY (_id),
    
    CONSTRAINT fk_productcheckout_user 
    FOREIGN KEY (user_id) 
    REFERENCES users(_id)
);

CREATE TABLE product_checkout_detail (
	checkout_id int4 NOT NULL,
	product_id int4 NOT NULL,
	product_name text NULL,
	proudct_image text NULL,
	product_price int4 NULL,
	product_quanlity int4 NULL,
	product_sale int4 NULL,
	CONSTRAINT product_checkout_detail_pkey PRIMARY KEY (checkout_id, product_id),
    
    CONSTRAINT fk_productcheckoutdetail_product 
    FOREIGN KEY (product_id) 
    REFERENCES product(_id),
    
    CONSTRAINT fk_productcheckoutdetail_productcheckout 
    FOREIGN KEY (checkout_id) 
    REFERENCES product_checkout(_id)
);

CREATE TABLE contact (
	_id INT NOT NULL AUTO_INCREMENT,
	customer_name varchar(255) NULL,
	customer_email varchar(255) NULL,
	customer_phone varchar(255) NULL,
	contact_subject text NULL,
	contact_description text NULL,
	created_day timestamp NULL,
	CONSTRAINT contact_pkey PRIMARY KEY (_id)
);

CREATE TABLE buy_guide (
	_id INT NOT NULL AUTO_INCREMENT,
    title text,
    guide_description text NULL,
    created_day timestamp NULL,
    status int4 NULL,
    CONSTRAINT buy_guide_pkey PRIMARY KEY (_id)
);

CREATE TABLE buy_guide (
	_id INT NOT NULL AUTO_INCREMENT,
    title text,
    guide_description text NULL,
    created_day timestamp NULL,
    status int4 NULL,
    CONSTRAINT buy_guide_pkey PRIMARY KEY (_id)
);

alter table product add column start_new timestamp NULL;
alter table product add column end_new timestamp NULL;




