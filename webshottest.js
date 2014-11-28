var webshot = require('webshot');

var url = "http://campusbab.com/api/root/foodTotal.php",
    collegeSeq = "275";

var request = require('request');
var querystring = require('querystring');

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);

        max_main_length = 0;

        for (var idx in j['shopList']) {
            shop = j['shopList'][idx];

            name = shop['name'];
            location = shop['locName'];

            main = [];
            others = [];

            for (var jdx in shop['foodList']) {
                i = shop['foodList'][jdx];

                if (i['section'] == target_section) {
                    main.push(i['mainFood']);
                    others.push(i['foods'].split(','));

                    console.log(main[0]);
                }

                if (len(main) > max_main_length) {
                    max_main_length = len(main);
                }

                max_length = 0;
                for (var other in others) {
                    if (len(other) > max_length)
                        max_length = len(other);
                }

                new_others = [];
                for (var k in range(max_length)) {
                    subs = [];
                    for (var i in others) {
                        other = others[i];
                        try:
                            subs.push(other[k]);
                        except:
                            subs.push(' ');
                    }
                    new_others.push(subs);
                }

                menu = Menu(name, location, main, new_others);
                menus.push(menu);
            }
        }
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
