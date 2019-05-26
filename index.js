require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');

const connectFlash = require('connect-flash');


const app = express();
require('./database');
require('./passport/local-auth');
require('./passport/facebook-auth');
//configs
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(connectFlash());

//rutas
app.use('/api',require('./routes/alumno'));
app.use('/api',require('./routes/profesor'));

//iniciar
app.listen(app.get('port'), () => {
    console.log("servidor en puerto: " + app.get('port'));
});