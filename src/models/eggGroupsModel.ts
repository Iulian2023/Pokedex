import { pool } from '../db';
import { EggGroups } from '../types/EggGroups';

export const getAllEggGroups = async (): Promise<EggGroups[]> => {
  const [rows] = await pool.execute('SELECT * FROM egg_groups');
  return rows as EggGroups[];
};

export const getEggGroupById = async (id: number): Promise<EggGroups[]> => {
  const [rows] = await pool.execute('SELECT * FROM egg_groups WHERE id = ?', [id]);
  return rows as EggGroups[];
}