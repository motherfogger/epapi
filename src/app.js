const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const orderRouter = require('./routes/orders');
const itemRouter = require('./routes/items');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/items', itemRouter);

// run powershell as admin
// Set - ExecutionPolicy RemoteSigned - Scope CurrentUser
// express new app --view=ejs

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

module.exports = app;
