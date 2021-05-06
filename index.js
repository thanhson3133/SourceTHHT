var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var port = 3000;
var url = 'mongodb+srv://admin:admin@cluster0.b0yjk.mongodb.net/btlon';

mongoose.connect(url,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then((db)=> console.log("db is connected"))
    .catch((err) =>console.log(err));
var app = express();
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static("public"));

var home = require('./routes/pageRoute');
var adRoute = require('./routes/qlProductRoute');

app.use('/', home);

app.get('/admin', function (req, res) {
    res.render('adminpage/quanli', { title: "Quản lí" });
});
app.use('/admin/product/', adRoute);

app.listen(port, function () {
    console.log("Server listening on port " + port);
});
