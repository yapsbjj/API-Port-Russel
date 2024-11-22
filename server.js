require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',(error) => console.log('mongoDB connection reussie'))

app.use(express.json())

const usersRouter = require('./routes/users')
const catwayRouter = require('./routes/catway')
const reservationRouter = require('./routes/reservation')
app.use('/users', usersRouter)
app.use('/catway', catwayRouter)
app.use('/reservation', reservationRouter)


app.listen(3000, () => console.log('Demarage du serveur'))