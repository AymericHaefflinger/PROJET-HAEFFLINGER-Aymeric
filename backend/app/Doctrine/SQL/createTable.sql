
CREATE DATABASE PROJET_WEB_HAEFFLINGER;
USE PROJET_WEB_HAEFFLINGER;
create user 'apiWeb'@'localhost';
grant all privileges on PROJET_WEB_HAEFFLINGER.* to 'apiWeb'@'localhost';

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT AUTO_INCREMENT NOT NULL,
    mail VARCHAR(120) NOT NULL, 
    nom VARCHAR(120) NOT NULL, 
    prenom VARCHAR(120) NOT NULL, 
    mdp VARCHAR(120) NOT NULL, 
    PRIMARY KEY(id));

DROP TABLE IF EXISTS article;
CREATE TABLE article (
    id INT AUTO_INCREMENT NOT NULL,
    nom VARCHAR(120) NOT NULL, 
    prix VARCHAR(120) NOT NULL, 
    img VARCHAR(120) NOT NULL, 
    PRIMARY KEY(id));

insert into article (nom, prix, img) 
values("Draftosaurus",
"15e",
"https://www.jeuxdenim.be/images/jeux/Draftosaurus_large01.jpg");

insert into article (nom, prix, img) 
values("Dixit",
"25e",
"https://www.espritjeu.com/upload/image/dixit-p-image-53777-grande.jpg");

insert into article (nom, prix, img) 
values("Wazabi",
"15e",
"https://www.agorajeux.com/16199-thickbox_default/wazabi.jpg");
