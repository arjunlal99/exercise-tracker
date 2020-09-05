var express = require('express')
var app = express()
app.set('view engine', 'pug')
require('dotenv').config()
var mongoose = require('mongoose')

app.get('/', (req,res) => {
    res.render('template')
})

var listener = app.listen(process.env.PORT , () => {
    console.log('Listening at port ', listener.address().port)
})