import express from 'express';
import dotenv from 'dotenv';
import pokemonRoutes from './src/routes/pokemonRoutes'
import typesRoutes from './src/routes/typesRoutes'
import movesRoutes from './src/routes/movesRoutes'
import movesItems from './src/routes/itemsRoutes'
import eggGroups from './src/routes/eggGroupsRoutes'
import logger from './src/logger';
import bodyParser from 'body-parser';
import { getAllPokemons, getPokemonById } from './src/models/pokemonModel';
import {Request, Response} from "express";
import { getPokemonDetails } from './src/controllers/pokemonController';

dotenv.config();

const path = require('path');
const app = express();
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
  try {
      const pokemons = await getAllPokemons();  
      res.render('home', { pokemons }); 
  } catch (error) {
      console.error('Error fetching pokemons:', error);
      res.status(500).send('Error fetching pokemons');
  }
});

app.get('/pokemons/:id', getPokemonDetails);

app.use('/api', pokemonRoutes);
app.use('/api', typesRoutes);
app.use('/api', movesRoutes);
app.use('/api', movesItems);
app.use('/api', eggGroups);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info(`Serveur démarré sur http://localhost:${port}`);
});
