import { pool } from '../db';
import { Types } from '../types/Types';
import logger from '../logger';
import { ResultSetHeader } from 'mysql2/promise';

export const getAllTypes = async (): Promise<Types[]> => {
  const [rows] = await pool.execute('SELECT * FROM types');
  return rows as Types[];
};

export const getTypeById = async (id: number): Promise<Types[]> => {
  const [rows] = await pool.execute('SELECT * FROM types WHERE id = ?', [id]);
  return rows as Types[];
}

export const postType = async (id: number, identifier: string, generation_id: number, damage_class_id: number): Promise<Types[]> => {
  try {
    const [rows] = await pool.execute(
      'INSERT INTO types (id, identifier, generation_id, damage_class_id) VALUES (?, ?, ?, ?)',
      [id, identifier, generation_id, damage_class_id]
    );
    
    const newType = { id, identifier, generation_id, damage_class_id };
    logger.info("The type are inserted in database")
    return [newType] as Types[];
  } catch (error) {
    logger.info('Error inserting type:', error);
    throw new Error('Failed to insert type');
  }
};

export const updateType = async (id: number, identifier: string, generation_id: number, damage_class_id: number): Promise<Types> => {
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE types SET identifier = ?, generation_id = ?, damage_class_id = ? WHERE id = ?',
      [identifier, generation_id, damage_class_id, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Type not found or no changes made');
    }

    const updatedType = { id, identifier, generation_id, damage_class_id };
    logger.info('Type updated in database');
    return updatedType as Types;
  } catch (error) {
    console.error('Error updating type:', error);
    throw new Error('Failed to update type');
  }
};

export const deleteType = async (id: number): Promise<boolean> => {
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM types WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Type not found');
    }

    return true;
  } catch (error) {
    console.error('Error deleting type:', error);
    throw new Error('Failed to delete type');
  }
};