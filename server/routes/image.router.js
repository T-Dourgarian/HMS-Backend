const express = require('express');
const router = express.Router();
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid')

//DB
const imageDB = require('../models/image.model')


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image');



router.post('/upload', upload, (req, res) => {
  try {

	console.log('in image upload', req.body);

	const { name, roomTypeUuid } = req.body;

	const newUuid = uuid.v1();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: newUuid,
        Body: req.file.buffer
    };

    s3.upload(params, async (error, data) => {
        if(error){
            res.status(500).json(error)
        }

		await imageDB.create({
			uuid: newUuid,
			name,
			roomTypeUuid,
			path: `/api/image/view/${newUuid}`
		})

        res.status(200).json(data)
    });

	console.log(params);

  } catch(error) {
	  console.log(error)
  }

});


router.get('/view/:uuid', async (req, res) => {

	try {
	  const { uuid } = req.params;

	 if (uuid) {
		 
		const params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: uuid,
		}
	
		const readStream = await s3.getObject(params).createReadStream();
  
		readStream.pipe(res);

	 } else {
		 res.status(400).send('No image with that id exists');
	 }
  
	} catch(error) {
		console.log(error)
		res.sendStatus(400)
	}
  
});


router.get('/roomtype/:roomTypeUuid', async (req, res) => {

	try {
	  const { roomTypeUuid } = req.params;

	 if (roomTypeUuid) {
		 
		const images = await imageDB.find({
			roomTypeUuid
		});


		res.status(200).json(images);
	 } else {
		res.status(400).send('No room type exists with that uuid');
	 }
  
	} catch(error) {
		console.log(error)
		res.sendStatus(400)
	}
  
});


module.exports = router;