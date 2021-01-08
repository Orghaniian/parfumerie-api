const express = require('express'),
    app = express(),
    mysql = require('mysql'), // import mysql module
    cors = require('cors'),
    bodyParser = require('body-parser');

const errorMiddleware = require('./middleware/error.middleware');

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




// routers

const HttpException = require('./utils/HttpException');
// use the modules
app.use(cors())
app.use(bodyParser.json());




const articlesRouter = require('./routes/articles.route');
const articleRouter = require('./routes/article.route')
const clientsRouter  = require('./routes/clients.route')
const clientRouter  = require('./routes/client.route')
const commandesRouter = require('./routes/commandes.route')
const commandeRouter = require('./routes/commande.route')
// use router
app.use('/articles', articlesRouter);
app.use('/article', articleRouter);
app.use('/clients', clientsRouter);
app.use('/client', clientRouter);
app.use('/commandes', commandesRouter);
app.use('/commande', commandeRouter);


app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));
