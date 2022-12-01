require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const depositRoutes = require('./routes/depositRoute')
const withdrawalRoutes = require('./routes/withdrawalRoute')
const userRoutes = require('./routes/user')


// express app
const app = express();



// middleware
app.use(express.json())
app.use((req, res, next) => {

    console.log(req.path, req.method)
    next()
})

// route to browser
app.use('/api/withdrawals/', withdrawalRoutes)
app.use('/api/deposits/', depositRoutes)
app.use('/api/user/', userRoutes)




    app.use(express.static("public"));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    })
// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
        console.log('connected to db & Listening on port', process.env.PORT)
    });

})
.catch((error)=> {
    console.log(error)
})



