var router = require('express').Router();
var async = require('async');
var request = require('request');

router.get('/', function(req, res) {
    User.find({}).then(function(users) {
        res.json(users);
    });

    var dataGame = {};
    var dataPlayers = {};
    var bann = {};
    var URL = process.env.BASE_URL_API + "/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/" + process.env.ID + process.env.API_KEY;

    async.waterfall([
            function(callback){
                request(URL, function(err, response, body){
                    if(!err && response.statusCode == 200){
                        var json = JSON.parse(body);
                        dataGame.gameMode = json.gameMode;
                        dataGame.mapId = json.mapId;
                        dataGame.gameType = json.gameType;
                        dataGame.gameStartTime = json.gameStartTime;
                        dataGame.gameLength = json.gameLength;

                        for(var i = 0; i < json['participants'].lenght; i++){
                            dataPlayers[i].championId = json['participants'][i].championId;
                            dataPlayers[i].summonerName = json['participants'][i].summonerName;
                            dataPlayers[i].spell1Id = json['participants'][i].spell1Id;
                            dataPlayers[i].spell2Id = json['participants'][i].spell2Id;
                            dataPlayers[i].teamId = json['participants'][i].teamId;
                        }

                        for(var i = 0; i < json['bannedChampions'].lenght; i++){
                            bann[i].championId = json['bannedChampions'][i].championId;
                            bann[i].teamId = json['bannedChampions'][i].teamId;
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
