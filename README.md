# Bextechnology

# Requisitos
## Instalaciones
- sql server
- ASP.NET CORE
- Angular 17
- node.js 21.6.1

## Instalar proyecto(Angular)
Para instalar las dependencias, ejecutar:
node
npm i

## Proyecto(.NET Core)
Crear las tablas en la base de datos SQL server ejecutando el siguiente sql
node
CREATE TABLE pais(
	id int IDENTITY(1,1) primary key,
	pais varchar(255) NOT NULL
);

CREATE TABLE departamento(
	id int IDENTITY(1,1) primary key,
	departamento varchar(255) NOT NULL,
	fk_pais_id int NOT NULL,
	FOREIGN KEY (fk_pais_id) REFERENCES pais(id)
);

CREATE TABLE ciudad(
	id int IDENTITY(1,1) primary key,
	ciudad varchar(255) NOT NULL,
	fk_departamento_id int NOT NULL,
	FOREIGN KEY (fk_departamento_id) REFERENCES departamento(id)
);
