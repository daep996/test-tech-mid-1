-- Insertar usuarios
INSERT INTO users (username, email, password_hash) VALUES
('user1', 'user1@example.com', 'hashed_password1'),
('user2', 'user2@example.com', 'hashed_password2'),
('user3', 'user3@example.com', 'hashed_password3');

-- Insertar publicaciones de blog
INSERT INTO blog_posts (user_id, title, content) VALUES
(1, 'Primera publicación', 'Este es el contenido de la primera publicación.'),
(2, 'Segunda publicación', 'Este es el contenido de la segunda publicación.'),
(3, 'Tercera publicación', 'Este es el contenido de la tercera publicación.');

-- Insertar comentarios
INSERT INTO comments (blog_post_id, user_id, content) VALUES
(1, 2, 'Gran publicación, ¡me encantó!'),
(1, 3, 'Interesante, gracias por compartir.'),
(2, 1, 'Buen trabajo, sigue así.'),
(3, 2, 'Esto es muy útil, gracias.');

-- Insertar etiquetas
INSERT INTO tags (name) VALUES
('Tecnología'),
('Programación'),
('Bases de datos'),
('PostgreSQL'),
('Tutorial');

-- Asociar etiquetas con publicaciones
INSERT INTO blog_post_tags (blog_post_id, tag_id) VALUES
(1, 1), -- Primera publicación con etiqueta "Tecnología"
(1, 2), -- Primera publicación con etiqueta "Programación"
(2, 3), -- Segunda publicación con etiqueta "Bases de datos"
(2, 4), -- Segunda publicación con etiqueta "PostgreSQL"
(3, 5); -- Tercera publicación con etiqueta "Tutorial"