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
        student_name: req.body.student_name,
        date_completed: req.body.date_completed,
        assignment_number: req.body.assignment_number,
        score: req.body.score
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.sendStatus(200);
        }
    });
});

router.get('/assignment/:id?', function(req, res){
    if(req.params.id){
        Assignment.findOne({_id: req.params.id}).exec(function(err, results){
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                res.sendStatus(200);
            }
        });
    } else {
        Assignment.find({}).exec(function(err, assignments){
            if(err) throw new Error(err);
            res.send(JSON.stringify(assignments));
        })
    }
});


module.exports = router;

