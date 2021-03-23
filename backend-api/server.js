require('dotenv').config();
const express = require('express');
const cors = require('cors');
var querystring = require('querystring');
const app = express();
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_String;
const my_client_id = process.env.Spotify_Client_Id;
const redirect_uri = process.env.Spotify_Redirect_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

app.get('/songs', (req, res) => {
	client.db("Eminem-sorter").collection("Songs").find().toArray((err, docs) => {
		res.send(docs);
	});
});

app.get('/login', (req, res) => {
	var scope = 'user-read-private user-read-email'
	res.redirect('https://accounts.spotify.com/authorize' +
	querystring.stringify({
		response_type: 'code',
		client_id: my_client_id,
		scope: scope,
		redirect_uri: redirect_uri
	}))
})

app.get('/callback', (req, res) => {
	console.log(req)
})

app.listen(process.env.PORT, () =>
	console.log(`Listening on port ${process.env.PORT}!`),
);