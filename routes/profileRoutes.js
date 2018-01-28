var express = require('express');
var router = express.Router();
var mongo = require('../mongoCongfig');
var athleteProfile;
var mongoURL = "mongodb://ishan10:ishan10@ds115768.mlab.com:15768/opensponsorship";

mongo.connect(mongoURL, function () {
    console.log('Connected to mongo at: ' + mongoURL);
    athleteProfile = mongo.collection('athlete_profile');
    sportCollection = mongo.collection('sports');
});
