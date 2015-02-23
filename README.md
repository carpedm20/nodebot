nodebot
=====

nodebot is a simple Facebook bot written with node.js


Example
-------

- [유니스트 밥먹기 십오분전](https://github.com/carpedm20/bap-15min-before/)
- [유니스트 내가 전해줄까](https://github.com/carpedm20/UNIST-FedEx)
- [컴공아 일하자](https://github.com/carpedm20/comgong-job)
- [포탈봇](https://github.com/carpedm20/UNIST-portal-bot)


How to get long lived access token
----------------------------------

1. https://www.facebook.com/dialog/oauth?scope=manage_pages,publish_stream&redirect_uri=https://carpedm20.gitub.io&response_type=token&client_id=641444019231608
2. https://graph.facebook.com/me/accounts?access_token=SHORT_ACCESS_TOKEN
3. Get PAGE_ACCESS_TOKEN
4. https://graph.facebook.com/oauth/access_token?client_id=APP_ID&client_secret=APP_SECRET&grant_type=fb_exchange_token&fb_exchange_token=PAGE_ACCESS_TOKEN


Author
------

Taehoon Kim / [@carpedm20](http://carpedm20.github.io/about/)
