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

    var schedule = require('node-schedule');
    var rule = new schedule.RecurrenceRule();
    rule.minute = 21;

    //var j = schedule.scheduleJob(rule, function(){
        console.log(" [*] Start schedule");
        var token = data;

        var https = require('https');
        var fs = require('fs');
        var FormData = require('form-data');

        var form = new FormData();
        form.append('file', fs.createReadStream(__dirname+'/vDh82Dl.png'));
        form.append('message', "Testing...");

        var options = {
            method: 'post',
            host: 'graph.facebook.com',
            path: '/me/photos?access_token='+token,
            headers: form.getHeaders(),
        }

        console.log(" [*] Send form");
        var request = https.request(options, function(res) {
            console.log(res);
        });

        form.pipe(request);
        
        request.on('error', function (error) {
            console.log(error);
        });

    //});
});
