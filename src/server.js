const express = require('express'),
    app = express(),
    mysql = require('mysql'), // import mysql module
    cors = require('cors'),
    bodyParser = require('body-parser');

// setup database
db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parfumerie'
})

// make server object that contain port property and the value for our server.
var server = {
    port: 4040
};

const errorMiddleware = require('./middleware/error.middleware');
// routers

const HttpException = require('./utils/HttpException');
// use the modules
app.use(cors())
app.use(bodyParser.json());


// Error middleware
app.use(errorMiddleware);

const articlesRouter = require('./routes/articles.route');
const articleRouter = require('./routes/article.route')
// use router
app.use('/articles', articlesRouter);
app.use('/article', articleRouter);


app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// starting the server
app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));
