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

app.get('/api/getFoodTrucks', async(req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM public."FoodTruck"'
        );
        const FoodTrucks = allItems.rows;
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