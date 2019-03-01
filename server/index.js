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

app.use(proxy('/users', {target: 'http://127.0.0.1:3028'}));
app.use(proxy('/recent-broadcasts', {target: 'http://127.0.0.1:3000'}));
app.use(proxy('/recent-highlights', {target: 'http://127.0.0.1:3000'}));
app.use(proxy('/popular-clips', {target: 'http://127.0.0.1:3000'}));

app.listen(port, () => {
  console.log(`server running at: http://127.0.0.1:${port}`);
});

