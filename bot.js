var redis = require('redis'),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

client.get("cs-long-token", function(err, reply) {
    var schedule = require('node-schedule');
    var rule = new schedule.RecurrenceRule();
    rule.hour = [8, 11, 5];
    rule.minute = 0;

    var j = schedule.scheduleJob(rule, function(){
        var token = reply;

        var https = require('https');
        var fs = require('fs');
        var FormData = require('form-data');

        var ACCESS_TOKEN = "";

        var form = new FormData();
        form.append('file', fs.createReadStream(__dirname+'/tars.jpg'));
        form.append('message', "테스트");

        var options = {
            method: 'post',
            host: 'graph.facebook.com',
            path: '/me/photos?access_token='+token,
            headers: form.getHeaders(),
        }

        var request = https.request(options, function(res) {
            //console.log(res);
        });
    });
});
