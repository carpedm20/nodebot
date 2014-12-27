var redis = require('redis'),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

client.get("cs-long-token", function(err, data) {
    if(err || data === null) {
        console.log("Error: cs-long-token not exist");
        process.exit(1);
    } else {
        console.log(" [*] Start bot with " + data + "\n");
    }

    var https = require('https');
    var fs = require('fs');

    var minutes = 5, interval = minutes * 60 * 1000;

    //setInterval(function() {
        console.log(" [*] Start schedule");
        var token = data;

        var data = {
            'link': 'http://rocketpun.ch/recruit/1568/',
            'message': '[앨리스(ALICE)] 기획자',
        }

        var options = {
            method: 'post',
            host: 'graph.facebook.com',
            path: '/me/feed?access_token='+token,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        }

        console.log(" [*] Send form");
        var request = https.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });

        request.write(data);
        request.end();
        
        request.on('error', function (error) {
            console.log(error);
        });

    //}, interval);
});
