var nr = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
//const proxy = require('express-http-proxy');
var proxy = require('http-proxy-middleware');
var compression = require('compression')
const app = require('express')();
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, '../src/client')));


const port = process.env.PORT || 3010;

// chat
app.use(proxy('/users', {target: 'http://52.53.154.238/'}));
// content
app.use(proxy('/recent-broadcasts', {target: 'http://ec2-54-67-108-186.us-west-1.compute.amazonaws.com'}));
app.use(proxy('/recent-highlights', {target: 'http://ec2-54-67-108-186.us-west-1.compute.amazonaws.com'}));
app.use(proxy('/popular-clips', {target: 'http://ec2-54-67-108-186.us-west-1.compute.amazonaws.com'}));
// navigation
app.use(proxy('/username', {target: 'http://ec2-13-56-228-188.us-west-1.compute.amazonaws.com'}));

app.listen(port, () => {
  console.log(`server running at: http://127.0.0.1:${port}`);
});

