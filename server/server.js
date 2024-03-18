const dotenv = require('dotenv');
const express = require("express");
const cors = require('cors')
const app = express();
dotenv.config();


const { Pool } = require('pg'); 
const itemsPool = new Pool({
    connectionString: process.env.DBConfigLink,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(cors());

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
        north: y + 0.003,
        south: y - 0.003,
        east: x - 0.0038,
        west: x + 0.0038
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

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
    console.log("test");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);

});
