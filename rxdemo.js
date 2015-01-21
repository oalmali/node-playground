var Rx = require('rx');
var request = require('request');
var util = require('util');
var mongoose = require('mongoose');
var localMongoose = require('./mongoose');
var OAuth = require('oauth');
var Order = mongoose.model('Order');

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'bc0QZRYGOBrsqV0oK2qAvO8Uu',
    'jLIqEMSXDA1odLQrgryOWK7yYwL03mnQ9QCwHStvvXUxovcUgt',
    '1.0A',
    null,
    'HMAC-SHA1'
);

var userResponseStream = Rx.Observable.fromNodeCallback(oauth.get, oauth)('https://stream.twitter.com/1.1/statuses/sample.json',
    '1849231777-NBkY1kwIfiDy9gNn0id8Egyi9ccnT5EI00ce0Vl', //test user token
    'GQai6O4oLgTz7KxfODYLfyEXeC7oiDfFb3uQsUaqX8xm3');

var flickrStream = Rx.Observable.fromNodeCallback(request)('http://www.flickr.com/services/feeds/photos_public.gne?tags=soccer&format=json');

var orderStream = Rx.Node.fromStream(Order.find().stream());

var getNewList = Rx.Observable
    .zip(userResponseStream, orderStream, function(user, order) {
        return {user: user, order: order};
    });

getNewList.subscribe(function(response) {
    // render `response`
    console.log(response);
},function(err) {
    console.log(err);
},function(err) {
    console.log(err);
});

/*Rx.Node.fromStream(Order.find().stream()).subscribe(function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });*/