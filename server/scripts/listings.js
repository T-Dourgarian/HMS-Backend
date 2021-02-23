var CronJob = require('cron').CronJob;


const uuid = require('uuid');
const moment = require('moment');

//import DBs
const roomDB = require('../models/room.model')
const listingDB = require('../models/listing.model')


module.exports = new CronJob('0 0 0 * * *', async function() {
	try {

		const rooms = await roomDB.find({});

		const [latestListing] = await listingDB.find().sort({"date": -1}).limit(1);

		const newListingDate = moment(latestListing.date).add(1, 'days').calendar();   ;

		let price = 100;

		for(room of rooms) {
			await listingDB.create({
				uuid: uuid.v1(),
				date: new Date(newListingDate),
				roomUuid: room.uuid,
				booked: false,
				price
			});
				price+= 20
		}

		console.log('New Listings Created')

	} catch(error) {
		console.log(error)
	}
}, null, true, 'America/Los_Angeles');