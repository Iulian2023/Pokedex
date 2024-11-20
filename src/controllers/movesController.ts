import logger from "../logger"
import { Request, Response } from "express";
import { getAllMoves, getMoveById } from "../models/movesModel";


export async function getMoves(req: Request, res: Response): Promise<void> {
    try {
        const moves = await getAllMoves();
        res.json(moves);
    } catch (error) {
        logger.info(res.status(500).json({ message: 'Error fetching moves', error }));
    }
};


export async function getMove(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        const move = id ? await getMoveById(Number(id)) : await getAllMoves();
        if (move) {
            res.json(move);
        } else {
            res.status(404).json({ message: 'Move not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database get moves error', error });
    }
};
