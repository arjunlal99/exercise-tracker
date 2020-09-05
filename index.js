var express = require('express')
var app = express()
app.set('view engine', 'pug')
require('dotenv').config()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: String
})

var conn = mongoose.createConnection(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
conn.once('open', () => {
    console.log("MongoDB connection successful")
})


const User = conn.model('user', userSchema)



app.get('/', (req,res) => {
    res.render('template')
})


app.post('/api/exercise/new-user', (req,res) => {
    var user_instance = new User({
        username: req.body.username
    })
    user_instance.save((err, docs) => {
        if(err){
            console.log(err)
        }
        else{
            console.log(docs)
            res.json(docs)
        }
    })
})

app.get('/api/exercise/users', (req,res) => {
    User.find((err,docs) => {
        if (err){
            console.log(err)
        }else{
            res.json(docs)
        }
    })
})


var listener = app.listen(process.env.PORT , () => {
    console.log('Listening at port ', listener.address().port)
})