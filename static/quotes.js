//import { createRequire } from "module";
//const require = createRequire(import.meta.url);
//console.log("hello");
//var mongoose = require('mongoose');
//var db=mongoose.connect('mongodb://localhost:27017/contactus1', { useNewUrlParser: true });
//console.log("hello");
//db.collection('quotees').findOne({Author:'Mark Twain'});
//const quotes = require('../app')
//var data=quotes.findOne({Author:'Mark Twain'},'Quotes').toArray();
//console.log(data)
//var mongoose = require('mongoose');
//var db=mongoose.connect('mongodb://localhost:27017/contactus1', { useNewUrlParser: true });
//const emptyschema= new mongoose.Schema({})
//var quote = mongoose.model('quote', emptyschema,'quotees');
//var data = quote.findOne({Author:'Mark Twain'})
//console.log(data)
var MongoClient = require('mongodb')
var url = "mongodb://localhost:27017";

function update(){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("contactus1");
  var query = { Author: "Mark Twain" };
  dbo.collection("quotees").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
}
update();