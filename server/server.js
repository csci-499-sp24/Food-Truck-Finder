import { checkLogin, checkSignup, getUserInfo } from './database.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { jwtVerify } from "jose";
import { decrypt } from './encryption.js';

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';
import crypto from 'crypto';


const storage = multer.memoryStorage();
const upload  = multer({ storage: storage });


import pkg from 'pg';
const { Pool } = pkg;

const randomImageName = (byte = 16) => crypto.randomBytes(byte).toString('hex');

const app = express();
dotenv.config();


const bucket_name = process.env.bucket_name;
const bucketregion = process.env.bucket_region;
const accesskey = process.env.aws_Access_key;
const awsSecret = process.env.aws_sec_key;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accesskey,
        secretAccessKey: awsSecret
    },
    region: bucketregion
});


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

app.get('/api/getFoodTrucks', async (req, res) => {
    const x = Number(parseFloat(req.query.lat).toFixed(6));
    const y = Number(parseFloat(req.query.lng).toFixed(6));

    const bounds = {
        north: y + 0.006,
        south: y - 0.006,
        east: x - 0.006,
        west: x + 0.006
    }

    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM public."FoodTruck" where' +
            '( lng < $1 and lng > $2 and lat > $3 and lat < $4)',
            [bounds.north, bounds.south, bounds.east, bounds.west]
        );

        const FoodTrucks = allItems.rows;

        // Fetch images for each food truck
        for (const truck of FoodTrucks) {
            const data = await itemsPool.query(
                'SELECT imagename FROM public."FoodTruckImages" where foodtruckid = $1;',
                [truck.id]
            );
            const images = data.rows;

            // Get signed URL for each image
            for (const image of images) {
                const getObjectParams = {
                    Bucket: bucket_name,
                    Key: image.imagename,
                };
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                image.imageUrl = url;
            }

            // Assign images to the food truck
            truck.images = images;
        }

        res.json({ FoodTrucks });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
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

        let today = new Date().toISOString().slice(0, 10)
        const eventQuery = await itemsPool.query(
            'Select * from public."Events" WHERE ft_id = $1 and end_date > $2',
            [id, today]
        )
        const events = eventQuery.rows;
        const result = {
            foodTruck,
            reviews,
            menu,
            events
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
    res.send(result);
})


//Favorites

app.post('/api/getfavorites', urlencodedParser, async(req, res) => {

    const {Session} = req.body;
    try{
        const decryptedSession = await decrypt(Session);
        if(!decryptedSession){
            return res.status(401).json({error: 'Unauthorized'});
        }

        const loginInfo = await getUserInfo({email: decryptedSession.user.email});

        const userid = loginInfo.user_id;
        const result = await itemsPool.query(
            'Select ft_id, id from public."Favorites" Where user_id = $1',
            [userid]
        )
        const rows = result.rows;
        const json_list = {};
        rows.forEach((row) => {
            json_list[row.ft_id] = true;
        })
        res.json(json_list);
    }catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/api/:id/favorited', urlencodedParser, async(req, res) => {
    const {Session} = req.body;
    const ft_id = req.params.id;
    console.log(Session);
    console.log(req.body);
    if(!Session) {
        res.json({ favorited: false })
    }else {
        try{
            const decryptedSession = await decrypt(Session);
            if(!decryptedSession){
                return res.status(401).json({error: 'Unauthorized'});
            }
    
            const loginInfo = await getUserInfo({email: decryptedSession.user.email});
            const userid = loginInfo.user_id;
            const result = await itemsPool.query(
                'Select * from public."Favorites" Where user_id = $1 and ft_id = $2',
                [userid, ft_id]
            )
            res.json({ favorited: result.rows.length > 0 });
        }catch (error) {
            console.error("Error adding review:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
})

app.post('/api/addFavorite', urlencodedParser, async(req, res) => {
    const {Session, ft_id} = req.body;
    try{
        const decryptedSession = await decrypt(Session);
        if(!decryptedSession){
            return res.status(401).json({error: 'Unauthorized'});
        }

        const loginInfo = await getUserInfo({email: decryptedSession.user.email});
        const userid = loginInfo.user_id;
        await itemsPool.query(
            'INSERT INTO public."Favorites" (user_id, ft_id) VALUES ($1, $2);',
            [userid, ft_id]
        )
        res.json({ success: true });
    }catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


app.post('/api/removeFavorite', urlencodedParser, async(req, res) => {
    const {Session, ft_id} = req.body;
    try{
        const decryptedSession = await decrypt(Session);
        if(!decryptedSession){
            return res.status(401).json({error: 'Unauthorized'});
        }
        const loginInfo = await getUserInfo({email: decryptedSession.user.email});
        const userid = loginInfo.user_id;
        await itemsPool.query(
            'DELETE FROM public."Favorites" where user_id = $1 and ft_id = $2;',
            [userid, ft_id]
        )
        res.json({ success: true });

    }catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Add Review
app.post('/api/foodtrucks/:id/addReview', upload.single('image'), async (req, res) => {
    
    

    const id = req.params.id;

    const data = JSON.parse(req.body.jsonData);
    const { Rating, Review, Session } = data;

    try {
        const decryptedSession = await decrypt(Session);
        if (!decryptedSession) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const LoginCheck = await checkLogin({email: decryptedSession.user.email, password: decryptedSession.user.password});
        if(!LoginCheck) return res.status(401).json({ error: 'Unauthorized' });

        const loginInfo = await getUserInfo({email: decryptedSession.user.email});

        const userid = loginInfo.user_id;
        const name = loginInfo.name;
        const foodTruckQuery = await itemsPool.query(
            'SELECT * FROM public."FoodTruck" WHERE id = $1',
            [id]
        );
        if (foodTruckQuery.rows.length === 0) {
            return res.status(404).json({ error: 'Food truck not found' });
        }

        await itemsPool.query(
            'INSERT INTO public."Reviews" (FoodTruckID, Rating, Review, UserId, Name) VALUES ($1, $2, $3, $4, $5);',
            [id, Rating, Review, userid, name]
        );
        await itemsPool.query(
            'update public."FoodTruck" set ratings = ratings + $1, review_count = review_count + 1 where id = $2;',
            [Rating, id]
        )

        if(req.file){
            const imageUrl = `/upload/${req.file.filename}`;
            const imgName = randomImageName();

            const params = {
                Bucket: bucket_name,
                Key: imgName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            }
            const command = new PutObjectCommand(params);
            await s3.send(command); 

            await itemsPool.query(
                'INSERT INTO public."FoodTruckImages"(foodtruckid, userid, imagename) VALUES ($1, $2, $3);',
                [id, userid, imgName]
            )
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//Images
app.get('/api/foodtrucks/:id/images', async(req, res) => {
    const id = req.params.id;
    
    const data = await itemsPool.query(
        'SELECT imagename FROM public."FoodTruckImages" where foodtruckid = $1;',
        [id]
    );
    const rows = data.rows;
    for(const row of rows){
        const getObjectParams = {
            Bucket: bucket_name,
            Key: row.imagename,
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        row.imageUrl = url;
    }
    res.json(data.rows);
})


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
