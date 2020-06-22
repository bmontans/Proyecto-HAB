require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('./db');

async function initialDB() {
  const connection = await getConnection();

  console.log('Borrando tablas si existen');
  await connection.query('DROP TABLE IF EXISTS transactions');
  await connection.query('DROP TABLE IF EXISTS product');
  await connection.query('DROP TABLE IF EXISTS user');

  console.log('Creando tablas de BB.DD.');

  await connection.query(`CREATE TABLE user 
(
	pk_id INT PRIMARY KEY AUTO_INCREMENT,
	username varchar (255) not null,
	address varchar (255) not null,
  email varchar (255) not null,
  birthdate datetime not null,
	password varchar(255) not null,
	creation_date DATE,
  modification_date TIMESTAMP, 
  date_last_update datetime default NOW() on update NOW(),
  profile_picture varchar(255) default null,
  role enum ('normal','admin') default 'normal' not null,
  active boolean default false not null,
  registrationcode varchar (200)
);`);

  await connection.query(`CREATE TABLE product 
(
	  pk_id INT PRIMARY KEY AUTO_INCREMENT,
    id_user int,
    name varchar (255) not null,
    category varchar (255) not null,
	  description varchar (255) not null,
	  price decimal(18,2),
    creation_date DATE,
	  modification_date TIMESTAMP,
    foreign key(id_user) references user (pk_id)
);`);

  await connection.query(`CREATE TABLE transactions 
(
	pk_id INT PRIMARY KEY AUTO_INCREMENT,
    id_product int, 
    id_user int,
    description varchar (255) not null,
    rating int not null,
    creation_date DATE,
    modification_date TIMESTAMP,
    foreign key (id_product) references product (pk_id),
    foreign key (id_user) references user (pk_id)
);`);

  // Create initial admin_user
  const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

  // arreglar los insert
  await connection.query(`
        INSERT INTO user(username, address, email, birthdate, password,creation_date,role, active)
        VALUES("Brais", "Galicia","bmontans@gmail.com","1991-07-12", "${password}",NOW(), "admin",true)
      `);

  console.log('Base de datos creada con éxito');

  connection.release();
  process.exit();
}

initialDB();
