var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var Assignment = require('../../models/assignments');

var router = express.Router();

var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;


MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open!');
});


router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
    //res.render({'name': 'Paul'});
    console.log('Router Hit');
});

router.post('/newAssignment', function(req, res) {
    Assignment.create({
        student_name: 'Kristy',
        date_completed: new Date(2016, 0, 12),
        assignment_number: 1,
        score: 100
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.sendStatus(200);
        }
    });
});

router.get('/assignment/:name', function(req, res){
    Assignment.findOne({student_name: req.params.name}).exec(function(err, results){
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.sendStatus(200);
        }
    });
});


module.exports = router;