//=========================================================
// KSLHacks @KSLHacks
// NodeBotWebAppDemo using Node.js and continuous integration
//=========================================================
var restify = require('restify');
var builder = require('botbuilder');
var env = require('./env.js');

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

bot.dialog('/',
    function (session) {
        session.send("Hello! The Node.js backend server is running on Azure Web Apps!")
    });

bot.dialog('/help', [
        function (session) {
            session.send(session, "help, bizspark, signup");
        }]
);

bot.dialog('/bizspark', [
        function (session) {
            session.send(session, "You can find more information about BizSpark and Microsoft at bizspark.microsoft.com");
        }]
);

bot.dialog('/signup', [
        function (session) {
            session.send(session, "Any more specific questions or to get a pre-approved BizSpark account.. Email Martin.Schray@microsoft.com !");
        }]
);
