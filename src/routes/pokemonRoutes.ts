import { Router } from 'express';
import { getPokemons, getPokemon, getPokemonsTypes, getPokemonsMoves, getPokemonsByEggGroups } from '../controllers/pokemonController';

const router = Router();


router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemon);
router.get('/pokemons-types/:identifier', getPokemonsTypes);
router.get('/pokemons-moves/:identifier', getPokemonsMoves);
router.get('/pokemons-egg-groups/:identifier', getPokemonsByEggGroups);

export default router;