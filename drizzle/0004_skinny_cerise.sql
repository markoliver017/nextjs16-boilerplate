CREATE TABLE `employees` (
	`id` varchar(50) NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`eligibility_status` enum('Active','Retiree','Consultant','Job Order') NOT NULL,
	`user_id` varchar(36),
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `incentive_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`registration_start` timestamp NOT NULL,
	`registration_end` timestamp NOT NULL,
	`redemption_start` timestamp NOT NULL,
	`redemption_end` timestamp NOT NULL,
	`is_active` boolean DEFAULT true,
	CONSTRAINT `incentive_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `incentive_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`price` int DEFAULT 0,
	`image_url` text,
	CONSTRAINT `incentive_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `package_items` (
	`package_id` int NOT NULL,
	`item_id` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	CONSTRAINT `package_items_package_id_item_id_pk` PRIMARY KEY(`package_id`,`item_id`)
);
--> statement-breakpoint
CREATE TABLE `package_store_assignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`package_id` int NOT NULL,
	`store_id` int NOT NULL,
	CONSTRAINT `package_store_assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `packages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`event_id` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`eligibility_status` enum('Active','Retiree','Consultant','Job Order','All'),
	`description` text,
	CONSTRAINT `packages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`employee_id` varchar(50) NOT NULL,
	`package_id` int NOT NULL,
	`selected_store_id` int NOT NULL,
	`qr_token` varchar(64) NOT NULL,
	`status` enum('Registered','Redeemed','Forfeited') DEFAULT 'Registered',
	`created_at` timestamp DEFAULT (now()),
	`redeemed_at` timestamp,
	`redeemed_by_user_id` varchar(36),
	CONSTRAINT `registrations_id` PRIMARY KEY(`id`),
	CONSTRAINT `registrations_qr_token_unique` UNIQUE(`qr_token`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` varchar(255),
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `store_locations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`address` text NOT NULL,
	`contact_number` varchar(50),
	`store_chain` enum('WalterMart','Puregold','PCMC_HQ') NOT NULL,
	`store_admin_user_id` varchar(36),
	CONSTRAINT `store_locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`user_id` varchar(36) NOT NULL,
	`role_id` int NOT NULL,
	CONSTRAINT `user_roles_user_id_role_id_pk` PRIMARY KEY(`user_id`,`role_id`)
);
--> statement-breakpoint
DROP TABLE `post`;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `package_items` ADD CONSTRAINT `package_items_package_id_packages_id_fk` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `package_items` ADD CONSTRAINT `package_items_item_id_incentive_items_id_fk` FOREIGN KEY (`item_id`) REFERENCES `incentive_items`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `package_store_assignments` ADD CONSTRAINT `package_store_assignments_package_id_packages_id_fk` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `package_store_assignments` ADD CONSTRAINT `package_store_assignments_store_id_store_locations_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store_locations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `packages` ADD CONSTRAINT `packages_event_id_incentive_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `incentive_events`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_package_id_packages_id_fk` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_selected_store_id_store_locations_id_fk` FOREIGN KEY (`selected_store_id`) REFERENCES `store_locations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_redeemed_by_user_id_user_id_fk` FOREIGN KEY (`redeemed_by_user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `store_locations` ADD CONSTRAINT `store_locations_store_admin_user_id_user_id_fk` FOREIGN KEY (`store_admin_user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;