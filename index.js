// Import the express lirbary
const express = require('express')

// Import the axios library, to make HTTP requests
const axios = require('axios')

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
const app = express()
app.use(express.static(__dirname + '/public'))

var accessToken;

app.get('/oauth/redirect', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
	 console.log('token is', accessToken);

    res.redirect(`/welcome.html?access_token=${accessToken}`)
  }).catch((e) => {
	console.log('bummer', e);
  });
})

app.get('/oauth/logout', (req, res) => {
	axios({
	method: 'delete',
	url: `https://api.github.com/applications/${clientID}/tokens/${accessToken}`,
	headers: {
		Authorization: 'Basic Mzg1OWVkNDg2Yzk3YTNlMzA0OGM6ZmMzMTczNTkyOTkyMzhiNjU3ODEzOGIwODliMmEwMGJmZjljZmJmNw=='
	}
}).then((response) => {
	console.log('response from logout: ', response);
});


});

// Start the server on port 8080
app.listen(8080)
