var express = require('express'),
    path    = require('path');




var app = express();
app.use(express.static(__dirname + "/public")); 
app.set('view engine', 'ejs');
// app.set('view engine', 'html');

app.get('/', (req, res)=>{
    res.render('landing.ejs')
})

app.get('/game', (req, res)=>{
    // res.render('index.html')
    res.sendFile(path.join(__dirname+'/views/index.html'))
})


// var port = 5000;

// app.listen(port, function(){
//     console.log('Pig game app started...')
// });


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Pig game app started...')
});