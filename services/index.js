module.exports = {
    fetchProducts: function (item) {
        return item.map(item => item.toObject())
    },
    findOneProduct: function (item) {
        return item ? item.toObject() : item
    }
}