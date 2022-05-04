create table "users" (
  "id" bigserial primary key,
  "login" varchar(255) not null,
  "email" varchar(255) not null,
  "password" varchar(255) not null
);

create table "posts" (
  "id" bigserial primary key,
  "title" varchar(255) not null,
  "content" text not null
);

insert into "posts" ("title", "content")
values ('Post 1 title', 'Post 1 content'),
       ('Post 2 title', 'Post 2 content'),
       ('Post 3 title', 'Post 3 content'),
       ('Post 4 title', 'Post 4 content'),
       ('Post 5 title', 'Post 5 content');
