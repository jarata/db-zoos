const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// endpoints here

server.get('/api/zoos', async (req, res) => {
    try {
        const zoo = await db('zoos');
        res.status(200).json(zoo)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: "The zoos information could not be retrieved."
        })
    }
});

server.get('/api/zoos/:id', async (req, res) => {
    const {id} = req.params;
    const zoo = await db('zoos').where({id});
    try {
        if (zoo) {
            res.status(200).json(zoo)
        } else {
            res.status(404).json({
                message: "The zoo with the specified ID does not exist."
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: "The zoos information could not be retrieved."
        })
    }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
