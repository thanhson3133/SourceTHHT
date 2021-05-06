var express = require('express');
var router = express.Router();
var sp = require("../models/sanpham");
const productControllers = require('../controllers/ProductsControllers')
router.get('/', function (req, res) {
    sp.find(function(err, data){
        if(err){
            res.json(err);
        }
        else{
            res.render('page/home', { title: "Trang chu", danhsach: data });
        }
    });
});


router.get('/page/:_id', productControllers.show)


router.get('/search', function (req, res) {
    var f = req.query.f;
    sp.find({Name: f}, function(err, data){
        if(err){
            res.json(err);
        }
        else{
            res.render('page/home', { title: "Trang chu", danhsach: data });
        }
    });
});
// router.get('/dangnhap', function (req, res) {
//     res.render('page/sign_in', { title: "Dang nhap" });
// });
// router.get('/dangki', function (req, res) {
//     res.render('page/dangki', { title: "Dang ki tai khoan" });
// });

module.exports = router;
