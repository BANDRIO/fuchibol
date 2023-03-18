football-app
├── client
│   ├── public
│   │   ├── index.html
│   │   └── favicon.ico
│   └── src
│       ├── App.js
│       ├── index.js
│       └── components
│           ├── Header.js
│           ├── MatchForm.js
│           ├── MatchList.js
│           ├── Match.js
│           ├── Footer.js
│           └── Notification.js
├── server
│   ├── api
│   │   ├── routes
│   │   │   └── match.js
│   │   ├── controllers
│   │   │   └── matchController.js
│   │   └── models
│   │       └── match.js
│   ├── config
│   │   └── index.js
│   ├── services
│   │   ├── google.js
│   │   ├── outlook.js
│   │   └── calendar.js
│   ├── app.js
│   ├── package.json
│   └── .env (contains environment variables)
└── package.json
