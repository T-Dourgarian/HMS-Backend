const express = require('express');
const router = express.Router();
const axios = require("axios");


// Import DBs
const listingDB = require('../models/listing.model');




router.get('/', async(req,res) => {
    try {
		
		console.log('hello world')
		res.sendStatus(200)

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

module.exports = router;