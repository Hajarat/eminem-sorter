require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_String;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

app.get('/songs', (req, res) => {
	client.db("Eminem-sorter").collection("Songs").find().toArray((err, docs) => {
		res.send(docs);
	});
});

app.listen(process.env.PORT, () =>
	console.log(`Listening on port ${process.env.PORT}!`),
);