require('dotenv').config()
const express = require('express')
const assert = require('assert')
const cookieParser = require('cookie-parser')
var request = require('request')
var querystring = require('querystring')
const app = express()
app.use(cookieParser())

const MongoClient = require('mongodb').MongoClient
const uri = process.env.DB_String
const my_client_id = process.env.Spotify_Client_Id
const redirect_uri = process.env.Spotify_Redirect_URI
const my_client_secret = process.env.Spotify_Secret

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

// Fetch songs from database and return to api
app.get('/songs', (req, res) => {
	client.db("Eminem-sorter").collection("Songs").find().toArray((err, docs) => {
		res.send(docs)
	})
})

// Spotify Section
var stateKey = 'spotify_auth_state'

function generateRandomString(length) {
	var text = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
	  text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

app.get('/login', (req, res) => {
<<<<<<< Updated upstream
	var state = generateRandomString(16);
  	res.cookie(stateKey, state);
	var scope = 'user-read-private user-read-email user-library-modify user-top-read user-modify-playback-state playlist-modify-public';
	res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
=======
	console.log("Login reached!")
	var state = generateRandomString(16)
  	res.cookie(stateKey, state)
	var scope = 'user-read-private user-read-email user-library-modify user-top-read user-modify-playback-state playlist-modify-public'
>>>>>>> Stashed changes
  	res.send('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
    	response_type: 'code',
    	client_id: my_client_id,
    	scope: scope,
    	redirect_uri: redirect_uri,
		state: state,
		show_dialog: true
    }))
})

app.get('/callback', (req, res) => {
	console.log("Callback reached!")
	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect('/#' +
		  querystring.stringify({
			error: 'state_mismatch'
		}))
	} else {
		res.clearCookie(stateKey)
		var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code: code,
			redirect_uri: redirect_uri,
			grant_type: 'authorization_code'
		},
		headers: {
			'Authorization': 'Basic ' + (new Buffer(my_client_id + ':' + my_client_secret).toString('base64'))
		},
		json: true
		}
		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token
				var userInfo = {
					url: 'https://api.spotify.com/v1/me',
					headers: { 'Authorization': 'Bearer ' + access_token },
					json: true
				}

				// use the access token to obtain the user id, then create playlist, finally fill playlist with appropriate data and return playlist url to frontend
				var playlistURL
				request.get(userInfo, function(error, response, body) {
					var playlistInfo = {
						url: 'https://api.spotify.com/v1/users/'+body.id+'/playlists',
						headers: { 'Authorization': 'Bearer ' + access_token},
						json: true,
						body: {name: 'Eminem Sorter', description: 'Music to be murdered by Side A & Side B fully sorted by preference.'}
					}
					request.post(playlistInfo, function(error, response, body) {
						if(error) {
							console.log(error)
						} else {
							playlistURL = body.id
							var songList = {
								url: 'https://api.spotify.com/v1/playlists/'+body.id+'/tracks',
								headers: { 'Authorization': 'Bearer ' + access_token},
								json: true,
								body: {'uris': playlist}
							}
							request.post(songList, function(error, response, body) {
								if(error) {
									console.log(error)
								} else {
									console.log(body)
									res.redirect('http://localhost:3000/display?' +
        								querystring.stringify({
											playlistURL: playlistURL,
          							}));
								}
							})
						}
					})
				})

				// we can also pass the token to the browser to make requests from there
				//res.send(access_token, refresh_token)
				
			} else {
				res.redirect('/#' +
				querystring.stringify({
					error: 'invalid_token'
				}))
			}
		})
	}
})
// Spotify Section End


client.connect(function(err) {
	assert.equal(null, err);
	console.log('Connected successfully to server')
	
	app.listen(process.env.PORT, () =>
		console.log(`Listening on port ${process.env.PORT}!`),
	);
});