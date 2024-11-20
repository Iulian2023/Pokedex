import { pool } from '../db';
import { Items } from '../types/Items';

export const getAllItems = async (): Promise<Items[]> => {
  const [rows] = await pool.execute('SELECT * FROM items');
  return rows as Items[];
};

export const getItemById = async (id: number): Promise<Items[]> => {
  const [rows] = await pool.execute('SELECT * FROM items WHERE id = ?', [id]);
  return rows as Items[];
}