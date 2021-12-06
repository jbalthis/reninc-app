var api_helper = require('../helpers/API_helpers');
var express = require('express');
var router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
    res.header('X-API-Key', process.env.API_KEY);
    api_helper.make_API_call(process.env.API_URL+'/search')
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
});

module.exports = router;