/**
 * Created by jeremycloutier on 1/12/16.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    assignment_number: Number,
    student_name: String,
    score: Number,
    date_completed: Date
});

var required = ['student_name', 'date_completed'];

//for (attr in required) { schema[attr].required = true; }

var Assignments = mongoose.model('Assignments', schema);

module.exports = Assignments;
