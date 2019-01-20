## Temporary Setup Notes for the MySQL Database...

DB User:

```sql
CREATE USER 'your_db_username'@'localhost' IDENTIFIED BY 'your_db_password';
ALTER USER 'your_db_username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_db_password';
GRANT ALL ON lang_flash_cards.* TO 'your_db_username'@'localhost';
```

Tables:

```sql
CREATE DATABASE `lang_flash_cards`;
CREATE TABLE `lang_flash_cards`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`));
```

```sql
CREATE DATABASE `lang_flash_cards`;
CREATE TABLE `lang_flash_cards`.`logins` (
  `user_id` INT NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`));
```

```sql
CREATE TABLE `lang_flash_cards`.`cards` (
  `card_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `card_question` VARCHAR(1000) NOT NULL,
  `card_answer` varchar(1000) NOT NULL DEFAULT 'Blank',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`card_id`));
```

Special Alters

```sql
ALTER TABLE lang_flash_cards.users ADD UNIQUE (username);
```

Foreign Keys:

```sql
ALTER TABLE lang_flash_cards.cards
 ADD CONSTRAINT fk_cards_users
 FOREIGN KEY (user_id)
 REFERENCES users (user_id)
 ON DELETE CASCADE ON UPDATE RESTRICT;
```
```sql
ALTER TABLE lang_flash_cards.logins
 ADD CONSTRAINT fk_logins_users
 FOREIGN KEY (user_id)
 REFERENCES users (user_id)
 ON DELETE CASCADE ON UPDATE RESTRICT;
```
