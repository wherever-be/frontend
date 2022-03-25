// Dependencies
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/wherever.be/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/wherever.be/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/wherever.be/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

app.use(express.static(path.join(__dirname, '../build'), { maxAge: 365 * 24 * 60 * 60 * 1000 }));

// Starting https server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
