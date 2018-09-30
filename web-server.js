const express = require("express");
var app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');

hbs.registerHelper('year',()=>{
    return new Date().getFullYear();
})

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log+'\n',(err)=>{
        if(err){
            console.log("There is some error present here.");
        }
    });
    next();
});

// app.use((req,res)=>{
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:"Home Page",
        welcomeMessage:"Hii, Welcome to my world"
    })
});

hbs.registerHelper("toUpper",(item)=>{
    return item.toUpperCase();
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"About Page"
    })
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to process'
    })
});
app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`);
});