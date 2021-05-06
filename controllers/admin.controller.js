var multer = require('multer');
var sp = require("../models/sanpham");

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        //Kiem tra file nao dc upload
        if (file.mimetype == "image/bmp" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("spImage");
module.exports.savetodb = function (req, res) {
    //Upload file
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
        } else if (err) {
            res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
        } else {
            //save Mongo
            var sanpham = sp({
                Name: req.body.tensp,
                Image: req.file.filename,
                Cost: req.body.txtgia,
                Danhmuc: req.body.danhmuc,
                Mota: req.body.txtmota
            });
            sanpham.save(function (err) {
                if (err) {
                    res.json({ "kq": 0, "errMsg": err });
                } else {
                    res.json({ "kq": 1 })
                }
            })
            .then(() => res.redirect('/admin/product'))
        }

    });
};
module.exports.upd = function (req, res) {
    upload(req, res, function (err) {
        if (!req.file) {
            sp.updateOne({ _id: req.params.id }, {
                Name: req.body.tensp,
                Cost: req.body.txtgia,
                Danhmuc: req.body.danhmuc,
                Mota: req.body.txtmota
            })
                .then(() => res.redirect('/admin/product'))
        } else {
            if (err instanceof multer.MulterError) {
                res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
            } else if (err) {
                res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
            } else {
                sp.updateOne({ _id: req.params.id }, {
                    Name: req.body.tensp,
                    Image: req.file.filename,
                    Cost: req.body.txtgia,
                    Danhmuc: req.body.danhmuc,
                    Mota: req.body.txtmota
                })
                    .then(() => res.redirect('/admin/product'))
            }
        }
    });

};
module.exports.del = function (req, res) {
    sp.deleteOne({_id: req.params.id}, function(err){
        if (err) {
            res.json(err);
        }  
    })
    res.redirect('/admin/product');
}