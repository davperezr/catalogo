var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/cartelera");

var billaboard_schema = new Schema({
   title: String,
   imageUrl: String,
   pricing: Number
});

var billaboard = mongoose.model("billaboard", billaboard_schema );

module.exports.billaboard = billaboard;