var router = require('express').Router();
var async = require('async');
var request = require('request');

router.get('/', function(req, res) {
    User.find({}).then(function(users) {
        res.json(users);
    });

    var game = {};
    var URL = process.env.BASE_URL_API + "/api/lol/EUW/v1.3/game/by-summoner/" + process.env.ID + "/recent" + process.env.API_KEY;

    async.waterfall([
            function(callback){
                request(URL, function(err, response, body){
                    if(!err && response.statusCode == 200){
                        var json = JSON.parse(body);
                        for(var i = 0; i < json[i].lenght; i++){
                            game[i].championId = json[i].championId;    //CHAMP
                            game[i].subType = json[i].subType;          //NORMAL
                            game[i].mapId = json[i].mapId;              //INTEGER
                            game[i].ipEarned = json[i].ipEarned;        //INTEGER
                            game[i].createDate = json[i].createDate;    //current millis -> parse to date

                            game[i].stats.win = json[i].stats.win;
                            game[i].spell1 = json[i].spell1;            //INTEGER
                            game[i].spell2 = json[i].spell2;            //INTEGER
                            game[i].item0 = json[i]['stats'].item0;
                            game[i].item1 = json[i]['stats'].item1;
                            game[i].item2 = json[i]['stats'].item2;
                            game[i].item3 = json[i]['stats'].item3;
                            game[i].item4 = json[i]['stats'].item4;
                            game[i].item5 = json[i]['stats'].item5;
                            game[i].item6 = json[i]['stats'].item6;

                            game[i].championsKilled = json[i]['stats'].championsKilled;
                            game[i].numDeaths = json[i]['stats'].numDeaths;
                            game[i].assists = json[i]['stats'].assists;
                            game[i].minionsKilled = json[i]['stats'].minionsKilled + json[i]['stats'].neutralMinionsKilled;
                        }
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
