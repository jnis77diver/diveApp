var express = require('express');
var router = express.Router();
var appdata = require('../data1.json');
var jf           = require('jsonfile');
var file    = 'data1.json'
// ROUTES FOR OUR API
// =============================================================================

router.use(function(req, res, next) {
	// do logging
	console.log('Wish Engine is working.');
	next(); // make sure we go to the next routes and don't stop here
});
/* GET home page. */
router.get('/', function(req, res) {
	var allExperiences = [],
	    diveExperiences = [],
	    snorkelExperiences = [],
	    dive = [],
	    snorkel = [];
	//diveExperiences = appdata.diving;
	//snorkelExperiences = appdata.snorkeling;

	appdata.diving.forEach(function(item) {
		allExperiences.push(item);
	});
	appdata.snorkeling.forEach(function(item) {
		allExperiences.push(item);
	});
	allExperiences.sort(function(a, b) {
		if(new Date(a.date) < new Date(b.date)) { return 1;	}
		if(new Date(a.date) > new Date(b.date)) { return -1; }
		return 0;
	}); 

  res.render('index', { 
  	title: 'Home',
  	allSpots: allExperiences,
  	diveExperiences: diveExperiences,
  	snorkelExperiences: snorkelExperiences,
  	page: 'home'
  	 });
});

// create a dive/snorkel post
router.route('/dives')

	.post(function(req, res) {
		 jf.readFile(file, function(err, obj) {
		 	console.log('A post request was made.');
		 	if(req.body.type === 'diving') {
		 		var dive_id = obj.diving.push(req.body);
		 	} else if (req.body.type === 'snorkeling') {
		 		var snorkel_id = obj.snorkeling.push(req.body);
		 	}

		    
		    jf.writeFile(file, obj, function(err) {
			   if (err) {
			 		res.send(err);
			   } else {
			   		res.json(req.body);
			   }
		 	})
		})
	})
	// retrieve all posts

.get(function(req, res) {
		jf.readFile(file, function(err, obj) {
		  if (err) {
				res.send(err);
		  } else  {
		  	res.json(obj.snorkeling);
		  }			
		})
	});




/* GET artists page. */
/*
router.get('/artists', function(req, res) {
	var diveExperiences = [];
	var snorkelExperiences = [];
	var dive = [];
	var snorkel = [];
	diveExperiences = appdata.diving;
	snorkelExperiences = appdata.snorkeling;

	appdata.diving.forEach(function(item){
	if(item.type === 'diving') {
	  dive = dive.concat(item);
	} else if (item.type === 'snorkeling'){
	    	snorkel = snorkel.concat(item);
	}
   });
  res.render('artists', { 
  	title: 'Artists',
  	locations: diveExperiences,
  	snorkelExperiences: snorkelExperiences,
  	diveSpots: dive,
  	snorkelSpots: snorkel,
  	page: 'artistList'
  	 });
});
/*

/* GET artists detail page. */
/*
router.get('/artists/:artistid', function(req, res) {
	var myArt = [];
	var myArtist= [];
	appdata.artists.forEach(function(item){
		if(item.shortname == req.params.artistid) {
			myArtist.push(item);
			myArt = myArt.concat(item.artwork);
		}
	});
  res.render('artists', { 
  	title: 'Artists',
  	art: myArt,
  	artists: myArtist,
  	page: 'artistDetail'
  	 });
});
*/



module.exports = router;
