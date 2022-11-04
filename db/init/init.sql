CREATE TABLE projects( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    startdate VARCHAR(20) NOT NULL
);
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
CREATE TABLE files(
    id serial PRIMARY KEY,
    project_id int NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    CONSTRAINT fk_projects FOREIGN KEY(project_id) REFERENCES projects(id)
);
CREATE TABLE users_projects (
    user_id int NOT NULL,
    project_id int NOT NULL,
    PRIMARY KEY (user_id, project_id),
    CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_projects FOREIGN KEY(project_id) REFERENCES projects(id)
);

INSERT INTO projects (name, startdate)
VALUES
    ('project1', '2022-10-30'),
    ('project2', '2022-10-30'),
    ('project3', '2022-10-30'),
    ('project4', '2022-10-30'),
    ('project5', '2022-10-30'),
    ('project6', '2022-10-30'),
    ('project7', '2022-10-30'),
    ('project8', '2022-10-30'),
    ('project9', '2022-10-30'),
    ('project10', '2022-10-31'),
    ('project11', '2022-10-31'),
    ('project12', '2022-10-31'),
    ('project13', '2022-10-31'),
    ('project14', '2022-10-31'),
    ('project15', '2022-10-31'),
    ('project16', '2022-10-31'),
    ('project17', '2022-10-31'),
    ('project18', '2022-10-31'),
    ('project19', '2022-10-31'),
    ('project20', '2022-10-31'),
    ('project21', '2022-10-31'),
    ('project22', '2022-10-31');

INSERT INTO users (name, email)
VALUES
    ('user1', 'user1'),
    ('user2', 'user2'),
    ('user3', 'user3'),
    ('user4', 'user4'),
    ('user5', 'user5'),
    ('user6', 'user6'),
    ('user7', 'user7'),
    ('user8', 'user8'),
    ('user9', 'user9'),
    ('user10', 'user10'),
    ('user11', 'user11'),
    ('user12', 'user12'),
    ('user13', 'user13'),
    ('user14', 'user14'),
    ('user15', 'user15'),
    ('user16', 'user16'),
    ('user17', 'user17'),
    ('user18', 'user18'),
    ('user19', 'user19'),
    ('user20', 'user20'),
    ('user21', 'user21'),
    ('user22', 'user22');

INSERT INTO files (name, type, project_id)
VALUES
    ('book1', 'pdf', 1),
    ('book2', 'pdf', 1),
    ('book3', 'pdf', 1),
    ('book4', 'pdf', 1),
    ('book5', 'pdf', 1),
    ('book6', 'pdf', 1),
    ('book7', 'pdf', 1),
    ('book8', 'pdf', 1),
    ('book9', 'pdf', 1),
    ('book10', 'pdf', 1),
    ('book11', 'pdf', 1),
    ('book12', 'pdf', 1),
    ('theory10', 'txt', 1),
    ('theory11', 'txt', 1),
    ('theory12', 'txt', 1),
    ('theory13', 'txt', 1),
    ('theory14', 'txt', 1),
    ('theory15', 'txt', 1),
    ('theory16', 'txt', 1),
    ('image17', 'jpg', 1),
    ('image18', 'jpg', 1),
    ('image19', 'jpg', 1),
    ('image20', 'jpg', 1),
    ('ted1', 'pdf', 2),
    ('ted2', 'pdf', 2),
    ('ted3', 'pdf', 2),
    ('ted4', 'pdf', 2),
    ('ted5', 'pdf', 2),
    ('ted6', 'pdf', 2),
    ('ted7', 'pdf', 2),
    ('ted8', 'pdf', 2),
    ('ted9', 'pdf', 2),
    ('ted10', 'pdf', 2),
    ('ted11', 'pdf', 2),
    ('ted12', 'pdf', 2),
    ('prep10', 'mp3', 2),
    ('prep11', 'mp3', 2),
    ('prep12', 'mp3', 2),
    ('prep13', 'mp3', 2),
    ('prep14', 'mp3', 2),
    ('prep15', 'mp3', 2),
    ('prep16', 'mp3', 2),
    ('avatar17', 'svg', 2),
    ('avatar18', 'svg', 2),
    ('avatar19', 'svg', 2),
    ('avatar20', 'svg', 2);

INSERT INTO users_projects
SELECT    u.id, p.id
FROM      users u
LEFT JOIN projects p
ON        (p.id % 2) = 0
WHERE     (u.id % 2) = 0;

INSERT INTO users_projects
SELECT    u.id, p.id
FROM      users u
LEFT JOIN projects p
ON        (p.id % 2) = 1
WHERE     (u.id % 2) = 1;