var Q = require("q");

var mongoose = require('mongoose');
var localMongoose = require('./mongoose')
var User = mongoose.model('user');

var insertUser = Q.nfbind(User.create.bind(User));

// `condition` is a function that returns a boolean
// `body` is a function that returns a promise
// returns a promise for the completion of the loop
function promiseWhile(condition, body) {
    var done = Q.defer();

    function loop() {
        // When the result of calling `condition` is no longer true, we are
        // done.
        if (!condition()) return done.resolve();
        // Use `when`, in case `body` does not return a promise.
        // When it completes loop again otherwise, if it fails, reject the
        // done promise
        Q.when(body(), loop, done.reject);
    }

    // Start running the loop in the next tick so that this function is
    // completely async. It would be unexpected if `body` was called
    // synchronously the first time.
    Q.nextTick(loop);

    // The promise
    return done.promise;
}

var userArr = [new User({"name":"mehmet","age":23}),new User({"name":"ahmet","age":55}),new User({"name":'ali',"age":89})];

// Usage
var index = 0;
promiseWhile(function () { return index < userArr.length; }, function () {
    var asyncCall = insertUser(userArr[index]);// arbitrary async
    console.log("inserted user: ", userArr[index].name)
    index++;
    return asyncCall;
}).then(function () {
    console.log("done");
}).done();