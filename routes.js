var billaboard = require("./models/models").billaboard
var cloudinary = require("cloudinary");
var express = require("express");
var router = express.Router();
var multer = require("multer");
var uploads = multer({dest: "./uploads"});
var middleware_upload = uploads.single('imagen');


router.get("/", function(req,res){
 res.render("index");
});



router.get("/catalogo" , function(req, res){
   billaboard.find({state: true }, function(err,catalogo){
    if(err){
      res.sendStatus(500).json(err);
    }
   res.render("catalogo", { catalogo, catalogo }); 

  }) 
 });

router.route("/agregar")
 .get(function(req,res){
  res.render("agregar");	
 })

 router.route("/:id")
 .put(function(req,res){
 
 })
 .delete(function(req,res){

 });

 router.get("/:id/edit", function(req,res){
  billaboard.findById(req.params.id, function(err, imagen){
  	res.render("edit", {imagen: imagen});
  })
    
 });

 
 
module.exports = router