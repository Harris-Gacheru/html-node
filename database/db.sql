create database if not exists html_node;

use html_node;

create table if not exists users(
    id int(10) auto_increment primary key not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    age int(5) not null,
    gender varchar(10) not null,
    created_at datetime default current_timestamp not null
);