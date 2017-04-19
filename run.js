#!/usr/bin/env node

'use strict';

/**
 * Toby launcher script.
 *
 * @author Luciano Mammino <lucianomammino@gmail.com>
 */
var dotenv = require('dotenv');
var Toby = require('./toby.js');

dotenv.load();
var token = process.env.TOKEN;
var name = process.env.NAME;

var toby = new Toby({
    token: token,
    name: name
});

toby.run();
