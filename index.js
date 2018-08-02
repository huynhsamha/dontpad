/**
 * Babel ES6, ES7 to ES5
 */
require('babel-register');
require('babel-polyfill');

/**
 * Run file .env to set environment variables
 */
require('dotenv').config();


/**
 * Run server with syntax ES6, ES7
 */
require('./server');
