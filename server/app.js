
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

// scripts
const createListings = require('./scripts/listings');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())




// router imports
const listingRouter = require('./routes/listing.router');
const roomRouter = require('./routes/room.router');
const addOnRouter = require('./routes/addOn.router');



/* Routes */
app.use('/api/listing', listingRouter);
app.use('/api/room', roomRouter);
app.use('/api/addon', addOnRouter);

app.get('/public',(req,res) => {
	res.sendStatus(200);
})

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 3000;

const dbConnect = async () => {

	try {
	
	
		const connOptions = {
		  useNewUrlParser: true,
		  useUnifiedTopology: true
		};
	  
		await mongoose.connect(process.env.MongoConnection, connOptions);
	
		console.log('DB connected')
		
	  } catch(error) {
		console.log(error);
	  }
}


/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  
  createListings.start();

  dbConnect();
});
