import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection()
  .then(() => {
    logger.info('Connexion réussie à la base de données MySQL!');
  })
  .catch((err) => {
    logger.error('Erreur lors de la connexion à la base de données:', err);
  });
