const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// MongoDB connection string
const mongoUrl = "mongodb://admin:password@localhost:27017/?authSource=admin";
// Update if necessary
const dbName = "user_accounts";
const collectionName = "users";

app.post('/db/user_accounts/users', (req, res) => {
    const userData = req.body;

    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            return res.status(500).send("Error connecting to MongoDB");
        }

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert user data
        collection.insertOne(userData, (err, result) => {
            if (err) {
                return res.status(500).send("Error inserting data");
            }
            res.status(200).send("Data inserted successfully");
        });
    });
});

app.listen(8081, () => {
    console.log('Server running on http://localhost:8081');
});
