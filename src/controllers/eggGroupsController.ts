import logger from "../logger"
import { Request, Response } from "express";
import { getAllEggGroups, getEggGroupById } from "../models/eggGroupsModel";


export async function getEggGroups(req: Request, res: Response): Promise<void> {
    try {
        const eggGroups = await getAllEggGroups();
        res.json(eggGroups);
    } catch (error) {
        logger.info(res.status(500).json({ message: 'Error fetching eggGroups', error }));
    }
};


export async function getEggGroup(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        const eggGroup = id ? await getEggGroupById(Number(id)) : await getAllEggGroups();
        if (eggGroup) {
            res.json(eggGroup);
        } else {
            res.status(404).json({ message: 'eggGroup not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database get eggGroups error', error });
    }
};
