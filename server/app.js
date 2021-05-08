
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

// scripts


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())




// router imports
const roomRouter = require('./routes/room.router');
const addOnRouter = require('./routes/addOn.router');
const bookingRouter = require('./routes/booking.router');
const amenityRouter = require('./routes/amenity.router');
const userRouter = require('./routes/user.router');
const companyRouter = require('./routes/company.router');
const imageRouter = require('./routes/image.router');



/* Routes */
app.use('/api/room', roomRouter);
app.use('/api/addon', addOnRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/amenity', amenityRouter);
app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/image', imageRouter)

app.get('/public',(req,res) => {
	res.sendStatus(200);
})


// const roomtypedb = require('./models/roomType.model')
// const roomdb= require('./models/rooms.model')
// const bookingdb = require('./models/booking.model');
const addOndb = require('./models/addOn.model');


// async function update() {
	// await roomtypedb.updateMany({}, {active: true})
	// await roomdb.updateMany({}, {active: true})

	// await bookingdb.updateMany({}, {checkedIn: false, checkedOut: false})


// 	await addOndb.updateMany({}, { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'})

// }



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

  dbConnect();
});
