const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
var db=mongoose.connect('mongodb://localhost:27017/contactus1', { useNewUrlParser: true });

//mongoose.connect('mongodb://localhost:27017/quotesdb', { useNewUrlParser: true });
//main().catch(err => console.log(err));
//async function main() {
  //await mongoose.connect('mongodb://localhost:27017/contactus1');
//}
const port = 80;
//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    desc:String
    
});
  
var Contact = mongoose.model('Contact', contactSchema);

const UserSchema = new mongoose.Schema({
    fname: String,
    lname:String,
    username:String,
    password:String,
    cpassword:String
    
});
const emptyschema= new mongoose.Schema({})
var User = mongoose.model('User', UserSchema);
var quote = mongoose.model('quote', emptyschema,'quotees');  

module.exports= quotes = mongoose.model('quote',emptyschema,'quotees')

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
  

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('signin.pug');
    //res.links({
      //  signin:'/signin',
        //login:'/login',
    //});
    //res.send(`<p>Please <button>signin</button> or <button>login</button> to continue to website</p>`);
    //(res.get('link'));
})
app.get('/home', (req, res)=>{
    res.status(200).render('index.pug');
})
app.get('/news', (req, res)=>{
    res.status(200).render('news.pug');
})
app.get('/signin', (req, res)=>{
    res.status(200).render('signin.pug');
})

app.post('/signin', (req, res)=>{
    var myuser = new User(req.body);
    console.log(myuser);
    myuser.save().then(()=>{ 
        //req.flash('message', 'You have ben successfully registered.redirecting you to login page');
        res.redirect('/login')
        //res.send("You have ben successfully registered.redirecting you to login page")
        //alert("You have successfully signed in to EYN.Your data is safe with us.Please log in to continue.")
        
        
    }).catch(()=>{
        res.status(400).send("error")
    });
})

app.get('/login', (req, res)=>{
    res.status(200).render('login.pug');
})

app.post('/login', (req, res)=>{
    User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
        if(err) {
            console.log(err);
        }
        else if(user){
            res.redirect('/home');
        }
        else {
            console.log('Invalid');
        }
    });
    //res.status(200).render('login.pug');
})
app.post('/als', (req, res)=>{
    res.status(200).render('login.pug');
})

app.get('/quotes', (req, res)=>{
    res.status(200).render('quotes.pug');
})
app.get('/images', (req, res)=>{
    res.status(200).render('images.pug');
})
app.get('/contactus', (req, res)=>{
    res.status(200).render('contactus.pug');
})

app.post('/contactus', (req, res)=>{
    var myData = new Contact(req.body);
    console.log(myData)
    myData.save().then(()=>{ 
        res.send("submitted")
    }).catch(()=>{
        res.status(400).send("error")
    });
   // res.status(200).render('contactus.pug');
});
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
