const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.port || 3000;
const cors = require('cors');
const corsOptions = require('./config/corsoptions.js');
const { callbackify } = require('util');

//custom middleware logger
//custom requires next to move on to the next middleware
app.use(logger);

//cors cross origin resource sharing
//exposed to public makes is free api 
// to protect do this
app.use(cors(corsOptions));

//for content type that is url encoded bascially for extra query data from the url
app.use(express.urlencoded({extended: false}));

//middle for json files 
app.use(express.json());

//serve the static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/api/employees'));


//app.use is mostly for middleware 
//app.get and app.all
app.all('*',  (req,res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({error: "404 Not Found"});
    }
    else {
        res.type('txt').send("404 Not Found");
    }
    
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Serve running on the port ${PORT}`))

//route handlers request and respond objects to send and receive data


