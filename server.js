/**
 * Build-in | Third party module dependencies.
 ***/

var express = require('express.io'),
    http = require('http'),
    _ = require('underscore'),
    path = require('path');

var app = express(),
    config = require("./config/appsConfig");

var authentication = require('./controllers/authentication_src'),
    userAccount = require('./controllers/userAccount_src'),
    interviewList = require('./controllers/interviewList_src'),
    interviewer = require('./controllers/interviewer_src'),
    mode = require('./controllers/mode_src'),
    rounds = require('./controllers/rounds_src'),
    status = require('./controllers/status_src'),
    recruiter = require('./controllers/recruiter_src'),
    reports = require('./controllers/reports_src'),
    users = require('./controllers/users_src');


/**
 * Application Configurations for Development Environment.
 * NODE_ENV=development node server.js
 ***/
app.configure('development', function() {
    app.set('db uri', config.server.dev.uri + "/" + config.server.dev.codebase);
    app.set('port', process.env.PORT || config.server.dev.port);
    app.set(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.cookieParser('kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig'));
    app.use(express.session());
    app.set(express.router);
    app.use(express.static(path.join(__dirname, config.server.dev.codebase)));
});

/**
 * Application Configurations for Production Environment.
 * NODE_ENV=production node server.js
 ***/
app.configure('production', function() {
    app.set('db uri', config.server.prod.uri + "/" + config.server.prod.codebase);
    app.set('port', process.env.PORT || config.server.prod.port);
    app.set(express.methodOverride());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.cookieParser('kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig'));
    app.use(express.session());
    app.set(express.router);
    app.use(express.static(path.join(__dirname, config.server.prod.codebase)));
});


/**
 * Service routes for user authentication
 ***/
app.post('/authenticate', authentication.postAuthentication);
app.get('/logout', sessionAuth, authentication.getCloseAuthentication);

/**
 * Service routes for user account
 ***/
app.post('/checkAccountStatus', userAccount.postAccountStatus);
app.put('/userReset', sessionAuth, userAccount.putReset);
app.post('/userChange/:email', sessionAuth, userAccount.postUserChange);
app.put('/userBlock', sessionAuth, userAccount.putBlock);
app.put('/appRelease', sessionAuth, userAccount.putRelease);
app.post('/appRelease', sessionAuth, userAccount.getRelease);

/**
 * Service routes for CURD users
 ***/
app.get('/usersList', sessionAuth, users.getUsers);
app.post('/usersList', sessionAuth, users.postUser);
app.get('/usersList/:email', sessionAuth, users.getUsersByEmail);
app.put('/usersList/:email', sessionAuth, users.putUsersByEmail);
app.del('/usersList', sessionAuth, users.delUsersByEmail);

/**
 * Service routes for CURD interviews
 ***/
app.get('/interviewList', sessionAuth, interviewList.getInterviewList)
app.post('/interviewList', sessionAuth, interviewList.postInterview);
app.get('/interviewList/:cEmail', sessionAuth, interviewList.getInterviewListByEmail);
app.put('/interviewList/:cEmail', sessionAuth, interviewList.putInterviewListByEmail);
app.del('/interviewList', sessionAuth, interviewList.delInterviewListByEmail);

/**
 * Service routes for CURD interview components
 ***/
app.get('/mode', sessionAuth, mode.getMode);
app.get('/rounds', sessionAuth, rounds.getRounds);
app.get('/status', sessionAuth, status.getStatus);
/**
 * Service routes for CURD recruiters
 ***/
app.get('/recruiter', sessionAuth, recruiter.getRecruiter);
app.post('/recruiter', sessionAuth, recruiter.postRecruiter);
app.get('/recruiter/:id', sessionAuth, recruiter.getRecruiterById);
app.put('/recruiter/:id', sessionAuth, recruiter.putRecruiterById);
app.del('/recruiter', sessionAuth, recruiter.delRecruiter);

/**
 * Service routes for CURD interviewers
 ***/
app.get('/interviewer', sessionAuth, interviewer.getInterviewer);
app.post('/interviewer', sessionAuth, interviewer.postInterviewer);
app.get('/interviewer/:id', sessionAuth, interviewer.getInterviewerById);
app.put('/interviewer/:id', sessionAuth, interviewer.putInterviewerById);
app.del('/interviewer', sessionAuth, interviewer.delInterviewer);

/**
 * Service routes for reports
 ***/
app.get('/reportStatus', sessionAuth, reports.getInterviewStatusReport);
app.get('/reportMode', sessionAuth, reports.getInterviewModeReport);
app.get('/reportRounds', sessionAuth, reports.getInterviewRoundReport);
// app.get('/reportStatusPerInterviewer', sessionAuth, reports.getStatusPerInterviewer);
// app.get('/reportModePerInterviewer', sessionAuth, reports.getModePerInterviewer);
// app.get('/reportRoundsPerInterviewer', sessionAuth, reports.getRoundsPerInterviewer);

/**
 * Start a UNIX socket server listening for connections on the given path.
 ***/
http.createServer(app).listen(app.get('port'), function() {
    console.log("\n\n\tNode (Express) server listening on port " + app.get('port'))
});

/**
 * Service session authentication
 ***/

function sessionAuth(req, res, next) {
    if (!req.session.user_id) {
        res.status(401).send('Authentication is required and has failed or has not yet been provided.');
    } else {
        next();
    }
}