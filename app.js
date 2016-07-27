var billaboard = require("./models/models").billaboard
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var router = require("./routes");
var multer = require("multer");
var uploads = multer({dest: "./uploads"});
var middleware_upload = uploads.single('imagen');
var cloudinary = require("cloudinary");

cloudinary.config({
 cloud_name: "dgi37r9qw",
 api_key: "579153246739158",
 api_secret: "6RdTZchqardYi2glhPyIAkDYUmU"
});


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use("/", router);


app.set("view engine", "jade");

app.post("/agregar", middleware_upload, function(req,res) {
  var datos = {
    title: req.body.title,
    pricing: req.body.pricing,
    imageUrl: "data.png"
  }
  var product = new billaboard(datos);
  product.save(function(err){
    if(req.file){
    cloudinary.uploader.upload(req.file.path, 
        function(result) {
            product.imageUrl = result.url;

            product.save(function(err){
                console.log(product);
                res.render("index");
            });
        }
    );
}else{
  res.send("Se ha guardado sin imagen");
}
   
 })
  
});


app.listen(8080);