const express = require('express');
const router = express.Router();
const axios = require("axios");
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

// Import DBs
const userDB = require('../models/user.model');
const companyDB = require('../models/company.model')


router.post('/login', async(req,res) => {
    try {

		const { username, password, companyUuid } = req.body;

		console.log('in login user');

		console.log(req.body)
		
		const user = await userDB.findOne({
			username,
			password,
			companyUuid
		});

		const company = await companyDB.findOne({
			uuid: companyUuid
		})
		
		if (user) {

			const token = jwt.sign({ uuid: user.uuid, company }, process.env.TOKEN_SECRET);



			res.header('authToken', token).send(token);
		} else {
			res.sendStatus(400);
		}

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.post('/register', async(req,res) => {
    try {

		const { username, password, companyUuid } = req.body;

		console.log('in register user');
		
		let user = await userDB.create({
			username,
			password,
			companyUuid
		});
		
		if (user) {
			res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

module.exports = router;