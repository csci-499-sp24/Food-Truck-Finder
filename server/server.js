import { checkLogin, checkSignup, getUserInfo } from './database.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import pkg from 'pg';
const { Pool } = pkg;


const app = express();
dotenv.config();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Database Connection
const itemsPool = new Pool({
    connectionString: process.env.DBConfigLink,
    ssl: {
        rejectUnauthorized: false
    }
});



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/searchFoodTrucks', async(req, res) =>{
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM public."FoodTruck" where lower(name) like lower(\'%' + req.query.search + '%\')' 
        );
        const FoodTrucks = allItems.rows;
        res.json({ FoodTrucks });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

app.get('/api/getFoodTrucks', async(req, res) => {
    const x = Number(parseFloat(req.query.lat).toFixed(6));
    const y = Number(parseFloat(req.query.lng).toFixed(6));

    const bounds = {
        north: y + 0.006,
        south: y - 0.006,
        east: x - 0.006,
        west: x + 0.006
    }
    
    // console.log('SELECT * FROM public."FoodTruck" where' +
    // '( lat < ' + bounds.north + 
    // ' and lat > ' + bounds.south  + 
    // ' and lng > ' + bounds.east +
    // ' and lng < ' + bounds.west + ')');
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM public."FoodTruck" where' +
            '( lng < ' + bounds.north + 
            ' and lng > ' + bounds.south  + 
            ' and lat > ' + bounds.east +
            ' and lat < ' + bounds.west + ')'
        );
        const FoodTrucks = allItems.rows;
        res.json({ FoodTrucks });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

app.get('/api/foodtrucks/:id/info', async (req, res) => {
    const id = req.params.id;
    try {
        const foodTruckQuery = await itemsPool.query(
            'SELECT * FROM public."FoodTruck" WHERE id = $1',
            [id]
        );
        if (foodTruckQuery.rows.length === 0) {
            return res.status(404).json({ error: 'Food truck not found' });
        }
        const foodTruck = foodTruckQuery.rows[0];

        const reviewsQuery = await itemsPool.query(
            'SELECT name, review, rating FROM public."Reviews" WHERE FoodTruckID = $1',
            [id]
        );
        const reviews = reviewsQuery.rows;

        const menuQuery = await itemsPool.query(
            'SELECT item, price FROM public."Menu Item" WHERE FoodTruckID = $1',
            [id]
        );
        const menu = menuQuery.rows;

        const locationQuery = await itemsPool.query(
            'SELECT name, lng, lat FROM public."FoodTruck" WHERE id = $1',
            [id]
        );
        const location = locationQuery.rows[0];

        const result = {
            foodTruck,
            reviews,
            menu,
        };

        res.json(result);
    } catch (error) {
        console.error("Error fetching food truck:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Login
app.post('/api/login', urlencodedParser , async(req, res) => {
    console.log(req.body);
    const info = {
        email: req.body.email,
        password: req.body.password
    }
    const result = await checkLogin(info);
    const data = result ? await getUserInfo(info) : {};
    res.send(
        {
            status: result,
            data: data
        }
    )
})

app.post('/api/signup', urlencodedParser, async(req, res) => {
    const result = await checkSignup(req.body);
    if(result){
        try{
            itemsPool.query(
                'INSERT INTO public."Users" (name, email, password) VALUES ($1, $2, $3);',
                [req.body.name, req.body.email, req.body.password]
            )
        }catch(error){
            console.log(error);
        }
    }
    console.log(result)
    res.send(result);
})


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
