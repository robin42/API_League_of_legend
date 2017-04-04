var router = require('express').Router();
var async = require('async');
var request = require('request');

router.get('/', function(req, res) {
    User.find({}).then(function(users) {
        res.json(users);
    });

    var profil ={} ;
    var URL = process.env.BASE_URL_API + "/api/lol/EUW/v2.5/league/by-summoner/" + process.env.ID + "/entry" + process.env.API_KEY;

    async.waterfall([
            function(callback){
                request(URL, function(err, response, body){
                    if(!err && response.statusCode == 200){
                        var json= JSON.parse(body);
                        profil.tier = json[i].tier;			//MASTER
                        profil.queue = json[i].queue;		//RANKEd_SOLO_5x5
                        profil.leaguePoints = json[i].leaguePoints;
                        profil.championId = json[i].championId;
                        profil.championLevel = json[i].championLevel;
                        profil.championPoints = json[i].championPoints;

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
});

module.exports = router;
