const express = require("express");
const User = require("./models/User");
const mongoose = require('mongoose')
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')
const path = require('path');
const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://jean_OC:OC_password@cluster0.m3gusco.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))
module.exports = app;
