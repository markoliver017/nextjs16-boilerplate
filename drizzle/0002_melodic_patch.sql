CREATE TABLE `post` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`body` varchar(255) NOT NULL,
	CONSTRAINT `post_id` PRIMARY KEY(`id`)
);
