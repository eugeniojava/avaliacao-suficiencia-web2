CREATE TABLE "users" (
  "id" BIGSERIAL PRIMARY KEY,
  "login" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "is_admin" BOOLEAN NOT NULL DEFAULT FALSE
);

-- Password: admin
INSERT INTO "users" ("login", "email", "password", "is_admin")
VALUES
('admin', 'admin@admin.com', '$2b$10$5UK.OehThTfSwpJsB5cbaeGmRg/6GJ9Qxut3Wydi1zHMB0Gpmql6G', TRUE),
('eugenio', 'eugenio@eugenio.com', '$2b$10$5UK.OehThTfSwpJsB5cbaeGmRg/6GJ9Qxut3Wydi1zHMB0Gpmql6G', FALSE);

-- SELECT * FROM "users";

-- DELETE FROM "users";

CREATE TABLE "posts" (
  "id" BIGSERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL,
  "image_name" TEXT,
  "video_name" TEXT,
  "user_id" BIGINT NOT NULL,
  CONSTRAINT "fk_posts_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

INSERT INTO "posts" ("title", "content", "user_id", "image_name", "video_name")
VALUES
('Post title 1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 1, 'posts/files/5fb1f750-3138-43de-8f50-a49b66af3a3b-1.jpeg', 'posts/files/0529c99f-ad8c-4235-b1f6-84255717e9d2-2.mp4'),
('Post title 2', 'Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, 'posts/files/5fb1f750-3138-43de-8f50-a49b66af3a3b-1.jpeg', 'posts/files/0529c99f-ad8c-4235-b1f6-84255717e9d2-2.mp4'),
('Post title 3', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 1, 'posts/files/5fb1f750-3138-43de-8f50-a49b66af3a3b-1.jpeg', 'posts/files/0529c99f-ad8c-4235-b1f6-84255717e9d2-2.mp4'),
('Post title 4', 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 1, 'posts/files/5fb1f750-3138-43de-8f50-a49b66af3a3b-1.jpeg', 'posts/files/0529c99f-ad8c-4235-b1f6-84255717e9d2-2.mp4'),
('Post title 5', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 2, 'posts/files/5fb1f750-3138-43de-8f50-a49b66af3a3b-1.jpeg', 'posts/files/0529c99f-ad8c-4235-b1f6-84255717e9d2-2.mp4'),
('Post title 6', 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English.', 2, 'posts/files/5fb1f750-3138-43de-8f50-a49b66af3a3b-1.jpeg', 'posts/files/0529c99f-ad8c-4235-b1f6-84255717e9d2-2.mp4'),
('Post title 7', 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 2, 'posts/files/5fb1f750-3138-43de-8f50-a49b66af3a3b-1.jpeg', 'posts/files/0529c99f-ad8c-4235-b1f6-84255717e9d2-2.mp4');

-- SELECT * FROM "posts";

-- DELETE FROM "posts";
