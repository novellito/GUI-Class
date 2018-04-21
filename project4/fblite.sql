DROP DATABASE IF EXISTS fblite;
CREATE DATABASE fblite;
USE fblite; 

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
 id int(11) unsigned NOT NULL AUTO_INCREMENT,
 user_id int(11) NOT NULL,
 post varchar(256) DEFAULT NULL,
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_friends
# ------------------------------------------------------------

DROP TABLE IF EXISTS user_friends;

CREATE TABLE user_friends (
 id int(11) unsigned AUTO_INCREMENT,
 user_id int(11) unsigned NOT NULL,
 friend_id int(11) unsigned NOT NULL,
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO user_friends (id, user_id, friend_id)
VALUES
	(1,123456,234901),
	(2,123456,425789),
	(3,234901,425789);


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS users;

CREATE TABLE users (
 id int(11) unsigned NOT NULL AUTO_INCREMENT,
 fname varchar(256) NOT NULL DEFAULT '',
 lname varchar(256) NOT NULL,
 age int(11) NOT NULL,
 DOB varchar(256) NOT NULL,
 status varchar(256) DEFAULT NULL,
 username char(10) NOT NULL,
 toggle_status char(10) DEFAULT 'true',
 toggle_posts char(10) DEFAULT 'true',
 toggle_friends char(10) DEFAULT 'true',
 toggle_dob char(10) DEFAULT 'true',
 password text NOT NULL,
 email varchar(256) NOT NULL DEFAULT '',
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*!40000 ALTER TABLE users DISABLE KEYS */;

INSERT INTO users (id, fname, lname, age, DOB, status, username,toggle_status,toggle_posts,toggle_friends,toggle_dob, password, email)
VALUES
	(123456,'Ben','doe',21,'1996-06-07',NULL,'bend12','1','1','1','1','0','ben@email.com'),
	(234901,'Tom','doe',21,'1993-05-01',NULL,'tdoe12','1','1','1','1','0','Tom@gmail.com'),
	(425789,'Jason','doe',20,'1990-06-09',NULL,'jasond12','1','1','1','1','0','jason@yahoo.com');