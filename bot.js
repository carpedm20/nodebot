var fb;
var redis = require('redis'),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

function Facebook() {
    this.fb = require('fb');

    this.set_token = function(token) {
        this.fb.setAccessToken(token);
    };

    this.upload_post = function(msg, link) {
        var data = {
            'link': link,
            'message': msg,
        }

        this.fb.api('me/feed', 'post', data, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.id);
        });
    };

    this.get_post = function(jobs, companies, contents, links) {
        this.fb.api('me/feed', 'get', function (res) {
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            posted_links = [];
            for (var idx in res.data) {
                var d = res.data[idx];
                if (d.from.id != "512098305554140") {
                    console.log(" [!] Skip %j", d);
                } else {
                    if (typeof d.link != 'undefined')
                        posted_links.push(d.link);
                }
            }

            for (var idx in jobs) {
                var job = jobs[idx],
                    company = companies[idx],
                    content = contents[idx],
                    link = links[idx];
                if (posted_links.indexOf(link) == -1) {
                    msg = "[" + company + "] " + job + "\r\n\r\n" + content;
                    fb.upload_post(msg, link);

                    setTimeout(function() {
                        console.log(" [#] Upload " + company);
                    }, 60000);
                }
            }
        });
    };
}

client.get("cs-long-token", function(err, token) {
    if(err || token === null) {
        console.log("Error: cs-long-token not exist");
        process.exit(1);
    } else {
        console.log(" [*] Start bot with " + token+ "\n");
    }

    var request = require('request');
    var minutes = 5, interval = minutes * 60 * 1000;

    fb = new Facebook();
    fb.set_token(token);

    setInterval(function() {
        console.log(" [*] Start Interval ->");

        var jsdom = require("jsdom");
        var jobs = [], companies = [], links = [], contents = [];

        jsdom.env(
            "http://rocketpun.ch/recruit/list/",
            ["http://code.jquery.com/jquery.js"],
            function(errors, w) {
                job_elems = w.$(".hr_list .hr_text_job");
                company_elems = w.$(".hr_list .hr_text_company");
                content_elems = w.$(".hr_list .hr_text_2");
                href_elems = w.$(".hr_list .hr_hover_bg a");

                for (var idx in job_elems) {
                    var job = job_elems[idx].innerHTML,
                        company = company_elems[idx].innerHTML,
                        content = content_elems[idx].innerHTML,
                        a = href_elems[idx].href;

                    if (typeof job != 'undefined')
                        jobs.push(job.trim());
                    if (typeof company != 'undefined')
                        companies.push(company.trim());
                    if (typeof content != 'undefined')
                        contents.push(content.trim());
                    if (typeof a != 'undefined')
                        links.push(a);
                }

                var j = fb.get_post(jobs, companies, contents, links);

            }
        );

    }, interval);
});
