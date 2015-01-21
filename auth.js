var Q = require('q');

function User() {
    this.firstName = 'ahmet',
    this.passwordHash = '1234';
};

function authenticate() {
     return getUsername()
        .then(function (username) {
            return getUser(username);
        })
        // chained because we will not need the user name in the next event
        .then(function (user) {
            return getPassword()
                // nested because we need both user and password next
                .then(function (password) {
                    if (user.passwordHash !== password) {
                        throw new Error("Can't authenticate");
                    } else {
                        console.log("authanticated user is: ",user.firstName)
                    }
                })
                .catch(function (error) {
                    // We get here with either foo's error or bar's error
                    console.log(error)
                })
                .then(function () {
                    // We get here with either foo's error or bar's error
                    console.log("done")
                });
        });
}

function getUsername() {
    var deferred = Q.defer();
    deferred.resolve("ahmet");
    return deferred.promise;
}

function getUser() {
    var deferred = Q.defer();
    deferred.resolve(user);
    return deferred.promise;
}

function getPassword() {
    return Q.fcall(function () {
        return '1234';
    });
}


var obj = authenticate()

var user = new User();



