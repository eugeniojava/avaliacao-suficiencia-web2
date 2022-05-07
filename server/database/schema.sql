CREATE TABLE "users" (
  "id" BIGSERIAL PRIMARY KEY,
  "login" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL
);

-- Password: admin
INSERT INTO "users" ("login", "email", "password")
VALUES ('admin', 'admin@admin.com', '$2b$10$5UK.OehThTfSwpJsB5cbaeGmRg/6GJ9Qxut3Wydi1zHMB0Gpmql6G');

-- SELECT * FROM "users";

-- DELETE FROM "users";

CREATE TABLE "posts" (
  "id" BIGSERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL
);

INSERT INTO "posts" ("title", "content")
VALUES
('Post title 1', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."),
('Post title 2', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."),
('Post title 3', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."),
('Post title 4', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."),
('Post title 5', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.");

-- SELECT * FROM "posts";

-- DELETE FROM "posts";
