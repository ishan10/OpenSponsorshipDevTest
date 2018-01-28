var express = require('express');
var router = express.Router();
var mongo = require('../mongoConfig');
var athleteProfile;
var mongoURL = "mongodb://ishan10:ishan10@ds115768.mlab.com:15768/opensponsorship";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

mongo.connect(mongoURL, function () {
    console.log('Connected to mongo at: ' + mongoURL);
    athleteProfile = mongo.collection('athlete_profile');
    sportCollection = mongo.collection('sports');
});
var mongooseConnection = mongoose.createConnection(mongoURL);

autoIncrement.initialize(mongooseConnection);

var profileSchema = new Schema({
    name: String,
    birthDate: String,
    gender: String,
    maritalStatus: String,
    location: Number,
    nationality: String,
    team: String,
    associations: String,
    sports: [String],
    interests: String,
    facebook: String,
    twitter: String,
    instagram: String,
    twitch: String,
    snapchat: String,
    pets: String,
    alcohol: String
});

profileSchema.plugin(autoIncrement.plugin, {
    model: 'athlete_Profile', field: 'profileId', startAt: 1,
    incrementBy: 1
});

router.get('/', function (req, res, next) {
    res.render('index');
});


router.get('/getSportList', function (req, res, next) {
    sportCollection.find({}, {_id: false}).toArray(function (err, data) {
        if (!err) {
            res.send(data);
        }else {
            var statusMessage = {code: 200, message: "Error retrieving SportsList"};
            res.send(statusMessage);
        }
    });
});

router.post('/createProfile', function (req, res, next) {

    var profile = req.body.data.profile;
    athleteProfile.insert(profile, function (err, result) {

        if (!err) {
            res.send(200);
        } else {
            var statusMessage = {code: 500, message: "Profile Not Created"};
            res.send(statusMessage);
        }
    });

});

router.get('/getProfileList', function (req, res, next) {
    athleteProfile.find({}).toArray(function (err, data) {
        if (!err) {
            res.send(data);
        }else {
            var statusMessage = {code: 500, message: "Error retrieving ProfileList"};
            res.send(statusMessage);
        }
    });
});


module.exports = router;