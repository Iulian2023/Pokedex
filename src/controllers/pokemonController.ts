import logger from "../logger"
import { Request, Response } from "express";
import { getAllPokemons, getPokemonById, getPokemonsByType, getPokemonsByMove, getPokemonsByEggGroup, getDetailedPokemonData } from "../models/pokemonModel";


export async function getPokemons(req: Request, res: Response): Promise<void> {
    try {
        const pokemons = await getAllPokemons();
        res.json(pokemons);
    } catch (error) {
        logger.info(res.status(500).json({ message: 'Error fetching pokemons', error }));
    }
};


export async function getPokemon(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        const pokemon = id ? await getPokemonById(Number(id)) : await getAllPokemons();
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({ message: 'Pokemon not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database get pokemon error', error });
    }
};

export async function getPokemonsTypes(req: Request, res: Response): Promise<void> {
    const identifier = req.params.identifier;
    try {
        const pokemon = identifier ? await getPokemonsByType(String(identifier)) : await getAllPokemons();
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({ message: 'Pokemon not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database get pokemon error', error });
    }
};

export async function getPokemonsMoves(req: Request, res: Response): Promise<void> {
    const identifier = req.params.identifier;
    try {
        const pokemon = identifier ? await getPokemonsByMove(String(identifier)) : await getAllPokemons();
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({ message: 'Pokemon not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database get pokemon error', error });
    }
};

export async function getPokemonsByEggGroups(req: Request, res: Response): Promise<void> {
    const identifier = req.params.identifier;
    try {
        const pokemon = identifier ? await getPokemonsByEggGroup(String(identifier)) : await getAllPokemons();
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({ message: 'Pokemon not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database get pokemon error', error });
    }
};

export async function getPokemonDetails(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const pokemon = await getDetailedPokemonData(Number(id));
      if (pokemon) {
        res.render('pokemonDetails', { pokemon });
      } else {
        res.status(404).json({ message: 'Pokemon not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Database error', error });
    }
  }