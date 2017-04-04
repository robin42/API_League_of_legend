var router = require('express').Router();
var User = require('../../../../models/User');
var hash = require('../../../../helpers/hash');
var async = require('async');
var request = require('request');

router.get('/', function(req, res) {
    User.find({}).then(function(users) {
        res.json(users);
    });
});

router.post('/', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var lolaccount = req.body.pseudo.toLowerCase();
    var id = "";
    var name = "";
    var profileIconId = "";

    var URL = process.env.BASE_URL_API + "/api/infoplayer/EUW/v1.4/summoner/by-name/" + lolaccount + process.env.API_KEY;

    async.waterfall([
        function(callback){
            request(URL, function(err, response, body){
                if(!err && response.statusCode == 200){
                    var json= JSON.parse(body);
                    id = json[lolaccount].id;
                    name = json[lolaccount].name;
                    profileIconId = json[lolaccount].profileIconId;
                    callback(null);
                } else {
                    console.log(err);
                }
            });
        }],
        function(err){
            if(err){
                console.log(err);
                return;
            }
        }
    );

    var newUser = new User({
        username: username,
        email: email,
        password: hash.hashPassword(password),
        pseudo: name,
        idAccount : id,
        profileIconId: profileIconId
    }).save().then(function(userSaved) {
        res.json(userSaved);
    });

});

module.exports = router;
