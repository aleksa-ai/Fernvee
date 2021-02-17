var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config();
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const users = require('./routes/users')
const activities = require('./routes/activities')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var activitiesRouter = require('./routes/activities');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', users(dbHelpers));
app.use('/api/activities', activities(dbHelpers));

module.exports = app;
