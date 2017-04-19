#!/usr/bin/env node

'use strict';

/**
 * Toby launcher script.
 *
 * @author Luciano Mammino <lucianomammino@gmail.com>
 */

var Toby = require('./toby.js');

var token = 'xoxb-165258535889-HFUkxpW4hyfnqevJIWWsB0Zt';
var name = 'toby';

var toby = new Toby({
    token: token,
    name: name
});

toby.run();
