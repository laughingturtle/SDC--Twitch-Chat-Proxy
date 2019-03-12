var nr = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
//const proxy = require('express-http-proxy');
var proxy = require('http-proxy-middleware');
const app = require('express')();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, '../src/client')));

const port = process.env.PORT || 3010;

app.use(proxy('/users', {target: 'http://54.219.184.162:3028'}));
app.use(proxy('/recent-broadcasts', {target: 'http://ec2-13-57-36-100.us-west-1.compute.amazonaws.com:3000'}));
app.use(proxy('/recent-highlights', {target: 'http://ec2-13-57-36-100.us-west-1.compute.amazonaws.com:3000'}));
app.use(proxy('/popular-clips', {target: 'http://ec2-13-57-36-100.us-west-1.compute.amazonaws.com:3000'}));
app.use(proxy('/username', {target: 'http://54.183.207.122:3015'}));

app.listen(port, () => {
  console.log(`server running at: http://127.0.0.1:${port}`);
});

