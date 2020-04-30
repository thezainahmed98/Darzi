var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts'); 

const mariadb = require('mariadb/callback');
const db = mariadb.createConnection({ host: 'eagle.cdm.depaul.edu',
                                      user: 'zahmed16', password: 'zahmed16', 
                                      database: 'darziDB' });

// connect to database
db.connect((err) => {if (err) {
    console.log("Unable to connect to database due to error: " + err);
    res.render('error');
    } else
    {
        console.log("Connected to DB");
    }
});
global.db = db;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var customerRouter = require('./routes/customer'); 
var tailorRouter = require('./routes/tailor'); 
var orderRouter = require('./routes/order'); 
var saleRouter = require('./routes/sale');
var reviewRouter = require('./routes/review');
var helpRouter = require('./routes/help'); 
var privacyRouter = require('./routes/privacy'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter); 
app.use('/contact', contactRouter); 
app.use('/customer', customerRouter); 
app.use('/tailor', tailorRouter); 
app.use('/order', orderRouter);
app.use('/sale', saleRouter);
app.use('/review', reviewRouter);
app.use('/help', helpRouter);
app.use('/privacy', privacyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
