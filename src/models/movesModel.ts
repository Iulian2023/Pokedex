import { pool } from '../db';
import { Moves } from '../types/Moves';

export const getAllMoves = async (): Promise<Moves[]> => {
  const [rows] = await pool.execute('SELECT * FROM moves');
  return rows as Moves[];
};

export const getMoveById = async (id: number): Promise<Moves[]> => {
  const [rows] = await pool.execute('SELECT * FROM moves WHERE id = ?', [id]);
  return rows as Moves[];
}