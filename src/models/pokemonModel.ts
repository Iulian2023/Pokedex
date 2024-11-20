import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../db';
import { Pokemon } from '../types/Pokemon';

export const getAllPokemons = async (): Promise<Pokemon[]> => {
  const [rows] = await pool.execute('SELECT * FROM pokemon');
  return rows as Pokemon[];
};

export const getPokemonById = async (id: number): Promise<Pokemon[]> => {
  const [rows] = await pool.execute('SELECT * FROM pokemon WHERE id = ?', [id]);
  return rows as Pokemon[];
}

export const getPokemonsByType = async (identifier: String): Promise<Pokemon[]> => {
  const [rows] = await pool.execute(`
    SELECT pokemon.* FROM pokemon 
    INNER JOIN pokemon_types
    ON pokemon_types.pokemon_id = pokemon.id
    INNER JOIN types
    ON pokemon_types.type_id = types.id
    WHERE types.identifier = ?
    `, [identifier]);
  return rows as Pokemon[];
};

export const getPokemonsByMove = async (identifier: String): Promise<Pokemon[]> => {
  const [rows] = await pool.execute(`
    SELECT DISTINCT pokemon.* FROM pokemon 
    INNER JOIN pokemon_moves
    ON pokemon_moves.pokemon_id = pokemon.id
    INNER JOIN moves
    ON pokemon_moves.move_id = moves.id
    WHERE moves.identifier = ?
    `, [identifier]);
  return rows as Pokemon[];
};

export const getPokemonsByEggGroup = async (identifier: String): Promise<Pokemon[]> => {
  const [rows] = await pool.execute(`
    SELECT DISTINCT pokemon.* FROM pokemon 
    INNER JOIN pokemon_egg_groups
    ON pokemon_egg_groups.species_id = pokemon.species_id
    INNER JOIN egg_groups
    ON pokemon_egg_groups.egg_group_id = egg_groups.id
    WHERE egg_groups.identifier = ?
    `, [identifier]);
  return rows as Pokemon[];
};

export const getDetailedPokemonData = async (id: number): Promise<any> => {
  try {
    const [pokemonRows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM pokemon WHERE id = ?',
      [id]
    );

    if (pokemonRows.length === 0) {
      throw new Error('Pokemon not found');
    }
    const pokemon = pokemonRows[0] as Pokemon;

    const [typesRows] = await pool.execute<RowDataPacket[]>(
      `SELECT types.identifier as type FROM pokemon_types
        INNER JOIN types ON pokemon_types.type_id = types.id
        WHERE pokemon_types.pokemon_id = ?`,
      [pokemon.id]
    );
    const types = typesRows.map((row) => row.type);

    const [eggGroupsRows] = await pool.execute<RowDataPacket[]>(
      `SELECT egg_groups.identifier as egg_group FROM pokemon_egg_groups
        INNER JOIN egg_groups ON pokemon_egg_groups.egg_group_id = egg_groups.id
        WHERE pokemon_egg_groups.species_id = ?`,
      [pokemon.species_id]
    );
    const eggGroups = eggGroupsRows.map((row) => row.egg_group);

    const [statsRows] = await pool.execute<RowDataPacket[]>(
      `SELECT stats.identifier as stat_name, pokemon_stats.base_stat, pokemon_stats.effort
        FROM pokemon_stats
        INNER JOIN stats ON pokemon_stats.stat_id = stats.id
        WHERE pokemon_stats.pokemon_id = ?`,
      [pokemon.id]
    );

    const [movesRows] = await pool.execute<RowDataPacket[]>(
      `
      SELECT DISTINCT moves.identifier as move FROM pokemon_moves
      INNER JOIN moves ON pokemon_moves.move_id = moves.id
      WHERE pokemon_moves.pokemon_id = ?
      `,
      [pokemon.id]
    );
    const moves = movesRows.map((row) => row.move);

    const stats = statsRows.map((row) => ({
      stat_name: row.stat_name,
      base_stat: row.base_stat,
      effort: row.effort
    }));

    return {
      ...pokemon,
      types,
      moves,
      eggGroups,
      stats,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching Pokémon details');
  }
};
