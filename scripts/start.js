#!/usr/bin/env node

const { exec } = require('shelljs');
const path = require('path');

/**
 * This is for local usage only
 * In actual AWS account, this start.js script will not be executed
 * Lambda will point to main.handler, and bypass this script in AWS account
*/
const start = async () => {
  require('dotenv').config({ path: path.resolve(process.cwd(), 'dev.env') });
  exec('sls offline start --host localhost.a2z.com');
};

start().catch(console.error);