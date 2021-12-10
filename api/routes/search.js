var api_helper = require('../helpers/API_helpers');
var express = require('express');
var router = express.Router();
require('dotenv').config();

console.log('API_KEY => '+process.env.API_KEY+'\n');
console.log('API_URL => '+process.env.API_URL);

var name = 'bike';
var fields = {
    id: 'id',
    name: 'name',
    address: 'address',
    abstract: 'abstract'
};
var results = 20;
var page = 1;





router.get('/', (req, res) => {
    api_helper.make_API_call(
        process.env.API_URL+'/search?name='+req.query.name, {
            json: true,
            headers: {
                'X-API-Key': process.env.API_KEY
            }
        })
        .then(response => {
          let arr = [];
          response.charities.forEach(charity => {
            arr.push(
              {
                id: charity.id,
                name: charity.name,
                abstract: charity.abstract,
                address: charity.address
              }
            );
          });
          console.log(JSON.stringify(arr).slice(2, -2));
          res.send(JSON.stringify(arr).slice(2, -2));
        })
        .catch(error => {
            res.send(error);
        });
});

module.exports = router;