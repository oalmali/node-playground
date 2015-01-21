var Q = require('q');

var mongoose = require('mongoose');
var localMongoose = require('./mongoose')

var Order = mongoose.model('Order');

var findOrders = Q.nfbind(Order.find.bind(Order));
//var sortOrders = Q.nfbind(Order.find.sort.bind(Order));

var findNewestOrder = function(limit) {
    var asyncCall = findOrders(null, null, {'limit':limit, 'sort':{createdAt : -1}});
    asyncCall
        .then(function(orderList) {
            console.log(orderList);
        })
        .catch(function(e) {
            console.log(e);
        });
};

findNewestOrder(2);
