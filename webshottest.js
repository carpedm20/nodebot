var webshot = require('webshot');

var url = "http://campusbab.com/api/root/foodTotal.php",
    collegeSeq = "275";

var request = require('request');
var querystring = require('querystring');

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(body);
        console.log(info.stargazers_count + " Stars");
        console.log(info.forks_count + " Forks");
    }
}

function getJson() {
    var options = {
        method: 'POST',
        url: 'http://campusbab.com/api/root/foodTotal.php',
        form: { 'collegeSeq': collegeSeq,
                'udid': '6AE7EAF5-5D16-4FE3-B406-BB01D354074E',
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent:': 'Cambab/1.5.0 (iPhone; iOS 8.1.1; Scale/2.00)',
        },
    };

    request(options, callback);

    console.log("END");
}

getJson();
