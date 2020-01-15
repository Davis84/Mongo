'use strict';

const express = require('express');
const app = express();

const pug = require('pug');





app.set('view engine', 'pug');
app.get('/', function (req, res) {
	res.render('oui.pug', { ok: "ca marche ou pas?" });
});

// Compile the source code
const compiledFunction = pug.compileFile('views/oui.pug');

const server = app.listen(7020, () => {
  console.log(`Express running → PORT ${server.address().port}`);
 });
 

app.get('/sujet1', function (req, res) {
	res.render('sujet1.pug');
});

app.get('/sujet2', function (req, res) {
	res.render('sujet2.pug');
});

app.get('/sujet3', function (req, res) {
	res.render('sujet3.pug');
});