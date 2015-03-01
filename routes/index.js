var express = require('express');
var router = express.Router();
var appdata = require('../data1.json');
var jf           = require('jsonfile');
var file    = 'data1.json';
var Firebase = require('firebase');
// ROUTES FOR OUR API
// =============================================================================
var ref = new Firebase('https://diveapp.firebaseio.com/');
var divingRef = ref.child("diving");
var snorkelingRef = ref.child("snorkeling");
// GLOBAL VARIABLES THAT ARE POLLUTING THE GLOBAL SPACE... SMOG
var allExperiences = [];
var diveExperiences = [];
var snorkelExperiences = [];
var dive = [];
var snorkel = [];
var objData;
var divingData;
var snorkelingData;

router.use(function(req, res, next) {
	// do logging
	console.log('Wish Engine is working.');
	next(); // make sure we go to the next routes and don't stop here
});
/* GET homepage. */
router.get('/', function(req, res) {
  ref.on("value", function(snapshot) {
    console.log("snapshot", snapshot.val());
    objData = snapshot.val();
    console.log("objData is ", objData);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  divingRef.on("value", function(snapshot) {
    console.log("snapshot", snapshot.val());
    divingData = snapshot.val();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  snorkelingRef.on("value", function(snapshot) {
    console.log("snapshot", snapshot.val());
    snorkelingData = snapshot.val();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  for( var key in objData ) {
   for ( var key2 in objData[key] ) {
      allExperiences.push(objData[key][key2]);
   }
  }
  for( var key in divingData ) {
    for ( var key2 in divingData[key] ) {
      diveExperiences.push(divingData[key][key2]);
    }
  }
  for( var key in snorkelingData ) {
    for ( var key2 in snorkelingData[key] ) {
      snorkelExperiences.push(snorkelingData[key][key2]);
    }
  }

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
        divingRef.push(req.body);
		 	} else if (req.body.type === 'snorkeling') {
        snorkelingRef.push(req.body);
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
    ref.on("value", function (snapshot) {
      snapshot.val();
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  });


module.exports = router;


