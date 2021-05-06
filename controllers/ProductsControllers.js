const sp = require('../models/sanpham');
const { findOneProduct } = require('../services');
const { fetchProducts } = require('../services');
class ProductController {
    
    show(req, res, next) {
        sp.findOne({ _id: req.params.id })
            .then(item => {
                res.render('page/detail', {
                    item: findOneProduct(item)
                })
            })
            .catch(next)
    }
}
module.exports = new ProductController;