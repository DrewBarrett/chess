var app = require('express')();

app.get('/', function(req, res){
    res.send('<h1>Hello worlds</h1>');
});

app.listen(3000, function(){
    console.log('ayy server be up');
});