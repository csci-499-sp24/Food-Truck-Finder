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
    
    console.log('SELECT * FROM public."FoodTruck" where' +
    '( lat < ' + bounds.north + 
    ' and lat > ' + bounds.south  + 
    ' and lng > ' + bounds.east +
    ' and lng < ' + bounds.west + ')');
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM public."FoodTruck" where' +
            '( lng < ' + bounds.north + 
            ' and lng > ' + bounds.south  + 
            ' and lat > ' + bounds.east +
            ' and lat < ' + bounds.west + ')'
        );
        const FoodTrucks = allItems.rows;
        console.log(FoodTrucks);
        res.json({ FoodTrucks });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
}
);

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
    console.log("test");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);

});