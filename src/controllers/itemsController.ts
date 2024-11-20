import logger from "../logger"
import { Request, Response } from "express";
import { getAllItems, getItemById } from "../models/itemsModel";


export async function getItems(req: Request, res: Response): Promise<void> {
    try {
        const items = await getAllItems();
        res.json(items);
    } catch (error) {
        logger.info(res.status(500).json({ message: 'Error fetching items', error }));
    }
};


export async function getItem(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        const item = id ? await getItemById(Number(id)) : await getAllItems();
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database get items error', error });
    }
};
