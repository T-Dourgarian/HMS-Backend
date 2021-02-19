
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();


// Route includes

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


// router imports
const listingRouter = require('./routes/listing.router');
// const indicatorRouter = require('./routes/indicator.router');
// const userRouter = require('./routes/user.router');



/* Routes */
app.use('/api/listing', listingRouter);
// app.use('/api/indicator', indicatorRouter);
// app.use('/api/user', userRouter);
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
	  
		// await mongoose.connect(`mongodb://thomas123:${process.env.DB_PASSWORD}@binancebotdb-shard-00-00.rntaw.mongodb.net:27017,binancebotdb-shard-00-01.rntaw.mongodb.net:27017,binancebotdb-shard-00-02.rntaw.mongodb.net:27017/binanceBot?replicaSet=atlas-tbrsua-shard-0&ssl=true&authSource=admin`, connOptions);
	
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
