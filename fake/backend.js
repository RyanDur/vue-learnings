const express = require('express');
const cors = require('cors');
const {MenuResponseSuccess} = require('./responses/menuResponse');
const backend = express();

backend.use(cors());

backend.get('/api/get-me-a-menu', (req, res) => {
  res.send(MenuResponseSuccess)
});

module.exports = {backend};