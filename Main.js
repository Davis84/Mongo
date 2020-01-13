'use strict';

const express = require('express');
const app = express();

const pug = require('pug');



// Compile the source code
const compiledFunction = pug.compileFile('views/oui.pug');

const server = app.listen(7020, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});