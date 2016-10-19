//=========================================================
// KSLHacks @KSLHacks
// NodeBotWebAppDemo using Node.js and continuous integration
//=========================================================
var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASS
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    // function (session, args, next) {
    //     if (!session.userData.name) {
    //         session.beginDialog('/profile');
    //     } else {
    //         next();
    //     }
    // },
    // function (session, results) {
    //     session.send('Hello %s! This Website AND the Node.js backend server are running on Azure Web Apps!', session.userData.name);
    // },
    function (session) {
        builder.Prompts.choice(session, "Hello! What would you like to know?", "BizSpark|SignUp|End Chat");
    },
    function (session, results) {
        if (results.response == 1) {
            session.send(session, "You can find more information about BizSpark and Microsoft at bizspark.microsoft.com");
        } else if (results.response == 2) {
             session.send(session, "Any more specific questions or to get a pre-approved BizSpark account.. Email Martin.Schray@microsoft.com !");
        } else {
            session.send("Bye %d", results.response);
            session.endDialog();
        }
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

// bot.dialog('/bizspark', [
//     function (session) {
//         session.send(session, "You can find more information about BizSpark and Microsoft at bizspark.microsoft.com");
//         session.endDialog();
//     }
// ]);

// bot.dialog('/signup', [
//     function (session) {
//         session.send(session, "Any more specific questions or to get a pre-approved BizSpark account.. Email Martin.Schray@microsoft.com !");
//         session.endDialog();
//     }
// ]);