var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
// database connection
var db = require("./db");
var ctrlRoutes = require("./ctrlRoutes");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// always use cors before bodyparser/cookieparser /express.urlencoded
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', function(req, res , next) {
//   console.log("inside default>>>>")
//   res.render('index');
//  // res.send("asdfs");
//   next();
// });
// console.log("???????????");

//socket.io
let usersname = {};
var server = require('http').createServer(app)
  , io = require('socket.io')(server);



require("./utility/chat").chat(io , usersname);

app.use("/api",ctrlRoutes);

// app.use("/uploadFile",upload,(req ,res , next)=>{
//   console.log("req>>>>>","localhost:3000/images"+req.file.filename);
//   console.log("???????",req.body)
//   res.send("localhost:3000/images/"+req.file.filename);
// // });
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
