import logger from "../logger"
import { Request, Response } from "express";
import { getAllTypes, getTypeById, postType, updateType, deleteType } from "../models/typesModel";


export async function getTypes(req: Request, res: Response): Promise<void> {
    try {
        const types = await getAllTypes();
        res.json(types);
    } catch (error) {
        logger.info(res.status(500).json({ message: 'Error fetching types', error }));
    }
};


export async function getType(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        const type = id ? await getTypeById(Number(id)) : await getAllTypes();
        if (type) {
            res.json(type);
        } else {
            res.status(404).json({ message: 'Type not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database get types error', error });
    }
};

export const createType = async (req: Request, res: Response): Promise<void> => {
    const { id, identifier, generation_id, damage_class_id } = req.body;

    try {
        const newType = await postType(id, identifier, generation_id, damage_class_id);
        res.status(201).json({
        message: 'Type created successfully',
        data: newType,
        });
    } catch (error) {
        logger.info(res.status(500).json({ message: 'Error insert type', error }));
    }
};

export const updateTypeController = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { identifier, generation_id, damage_class_id } = req.body;

    try {
        const updatedType = await updateType(Number(id), identifier, generation_id, damage_class_id);
        res.status(200).json({
            message: 'Type updated successfully',
            data: updatedType,
        });
    } catch (error) {
            console.error('Error updating type:', error);
            res.status(500).json({
            message: 'Failed to update type',
        });
    }
};

export const deleteTypeController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      await deleteType(Number(id));
  
      // Răspuns cu succes
      res.status(200).json({
        message: 'Type deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting type:', error);
      res.status(500).json({
        message: 'Failed to delete type',
      });
    }
  };