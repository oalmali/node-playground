var Q = require('q');

var mongoose = require('mongoose');
var localMongoose = require('./mongoose')

var Order = mongoose.model('Order');
var Stock = mongoose.model('Stock');

var findOrderById = Q.nfbind(Order.findById.bind(Order));
var populate = Q.nfbind(Stock.populate.bind(Stock));

var orderId = '5489fed1b07d6d0b001951f0';
findStockOfOrder(orderId);

function findStockOfOrder(orderId) {
    findOrderById(orderId, 'stock')
        .then(function (order) {
            console.log(order);
            return order;
        })
        .then(function (order) {
            return populate(order, {path: 'stock', model: 'Stock'});
        })
        .then(function (stock) {
            console.log(stock);
        })
        .catch(function (e) {
            console.log(e);
        });
}