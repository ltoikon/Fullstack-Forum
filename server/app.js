const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan')
const cors = require('cors')

//Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();
const port = 3001; //client has port 3000

//Connecting to the database (MongoDB)
const MongoDB = "mongodb://127.0.0.1:27017/projecttestdb"
mongoose.connect(MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB connected"));

mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(cors({origin: "http://localhost:3000", optionsSuccessStatus: 200}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//mapping routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port)
module.exports = app;