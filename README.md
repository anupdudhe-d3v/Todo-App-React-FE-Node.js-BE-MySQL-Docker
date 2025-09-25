### Backend setup ###

in .env ensure you fill up your cloud sql db details :
such as username , db endpoint , pw and portno 
```
DB_HOST=db
DB_USER=root
DB_PASSWORD=password
DB_NAME=todos_db
DB_PORT=3306
PORT=3001 #do not change this value
```

### take access of your database and following steps :
```
mysql -h yourdbendpoint -u dbusername -p
```

### create a seprate todos user as well
```
-- Create user accessible from any host (%)

CREATE USER 'todo_user'@'%' IDENTIFIED BY '12345678';


-- Give all privileges on your database

GRANT ALL PRIVILEGES ON todos_db.* TO 'todo_user'@'%';
-- Apply privileges
FLUSH PRIVILEGES;
```
### create todos db
```
create database todos_db;
```
```
use database todos_db;
```
### create todos tabe
```
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
