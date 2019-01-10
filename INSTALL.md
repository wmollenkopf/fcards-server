Temporary Setup Notes for the MySQL Database...
---
```sql
CREATE DATABASE `lang_flash_cards`;
CREATE TABLE `lang_flash_cards`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`));
```

```sql
ALTER TABLE lang_flash_cards.users ADD UNIQUE (username);
```

```sql
CREATE TABLE `lang_flash_cards`.`flash_cards` (
  `flash_card_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `flash_text` VARCHAR(1000) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`flash_card_id`));
```

```sql
CREATE USER 'fcuser'@'localhost' IDENTIFIED BY 'type_user_password_here';
ALTER USER 'fcuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'type_user_password_here';
GRANT ALL ON fcuser.* TO 'fcuser'@'localhost';
```

```sql
ALTER TABLE lang_flash_cards.flash_cards
 ADD CONSTRAINT fk_flash_cards_users 
 FOREIGN KEY (user_id) 
 REFERENCES users (user_id)
 ON DELETE CASCADE ON UPDATE RESTRICT; 
```