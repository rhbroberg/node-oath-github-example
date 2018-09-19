## Node.js OAuth example

forked and modified from [here](https://www.sohamkamani.com/blog/javascript/2018-06-24-oauth-with-node-js/)

This is an example node application that implements Githubs OAuth2 API.

In order to run the application:

1. Register your new application on Github : https://github.com/settings/applications/new. In the "callback URL" field, enter "http://localhost:8080/oauth/redirect". Once you register, you will get a client ID and client secret (referenced below as xxx and yyy, respectively).respectively
2. npm install
3. Start the server by executing `env CLIENT_ID=xxx CLIENT_SECRET=yyynode index.js`
4. Navigate to http://localhost:8080 on your browser.
