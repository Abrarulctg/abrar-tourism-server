const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//abrarTourism
//6e9tPQz30EyUdXNS


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1qcsvas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const spotCollection = client.db('touristSpotDB').collection('touristSpots');

        app.post('/touristSpot', async (req, res) => {
            const newSpot = req.body;
            console.log(newSpot);
            const result = await spotCollection.insertOne(newSpot);
            res.send(result);
        })

        app.get('/touristSpot', async (req, res) => {
            const cursor = spotCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        //Find Spot
        app.get('/touristSpot/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await spotCollection.findOne(query);
            res.send(result);
        })


        //Update coffee
        // app.put('/coffee/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: new ObjectId(id) };
        //     const options = { upsert: true };
        //     const updatedCoffee = req.body;
        //     const coffee = {
        //         $set: {
        //             name: updatedCoffee.name,
        //             quantity: updatedCoffee.quantity,
        //             supplier: updatedCoffee.supplier,
        //             taste: updatedCoffee.taste,
        //             category: updatedCoffee.category,
        //             details: updatedCoffee.details,
        //             photo: updatedCoffee.photo,

        //         }
        //     }
        //     const result = await coffeeCollection.updateOne(filter, coffee, options);
        //     res.send(result);
        // })

        //Delete
        app.delete("/touristSpot/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await spotCollection.deleteOne(query);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("Abrar Tourism Server is running");
})

app.listen(port, () => {
    console.log(`Abrar Tourism Server is running on Port: ${port}`)
})