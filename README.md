# Pokedex

A Pokedex project built using **TypeScript**, **EJS**, and **Express.js**, with a **MySQL** database for data storage.

## Features

- Search and display Pokémon.
- View Pokémon details: types, stats, and descriptions.
- Manage data through a MySQL database.
- Dynamic user interfaces using EJS templates.
- Strong architecture powered by TypeScript.

## Prerequisites

- Node.js (version 16+ recommended)
- MySQL installed and configured
- A `.env` file for sensitive information

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Iulian2023/Pokedex.git
   cd pokedex

pokedex/
│
├── logs/
│   ├── combined.log   # File with all logs
│   └── error.log      # File with errors logs
│
├── src/
│   ├── controllers/   # Request and response handling
│   ├── routes/        # Express routes definitions
│   ├── views/         # EJS templates
│   ├── models/        # Database interactions
|   ├── types/         # Types of Pokemons and their details
|   ├── db.ts          # Databse connection
|   └── logger.ts      # Configuration file for logger
│
├── .env               # Environment variables
├── pokedex.sql        # Pokemon Data
├── package.json       # Dependencies and npm scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation