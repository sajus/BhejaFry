/**
 * Build-in | Third party module dependencies.
 ***/

var express = require('express.io'),
    http = require('http'),
    _ = require('underscore'),
    path = require('path');

var app = express(),
    config = require("./config/appsConfig");

var authentication = require('./routes/authentication_src'),
    userAccount = require('./routes/userAccount_src'),
    interviewList = require('./routes/interviewList_src'),
    interviewer = require('./routes/interviewer_src'),
    mode = require('./routes/mode_src'),
    rounds = require('./routes/rounds_src'),
    status = require('./routes/status_src'),
    recruiter = require('./routes/recruiter_src'),
    reports = require('./routes/reports_src'),
    users = require('./routes/users_src');

/**
 * Application Configurations
 ***/
app.configure(function() {
    app.set('port', process.env.PORT || config.server.port);
    app.use(express.json());
    app.use(express.urlencoded());
    app.set(express.methodOverride());
    app.use(express.cookieParser('kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig'));
    app.use(express.session());
    app.set(express.router);
    app.use(express.static(path.join(__dirname, 'src')));
});

/**
 * Service routes for user authentication
 ***/
app.post('/authenticate', authentication.postAuthentication);
app.get('/logout', sessionAuth, authentication.getCloseAuthentication);

/**
 * Service routes for user account
 ***/
app.put('/userReset', sessionAuth, userAccount.putReset);
app.post('/userChange/:email', sessionAuth, userAccount.postUserChange);

app.put('/userBlock', sessionAuth, userAccount.putBlock);
app.put('/appRelease', sessionAuth, userAccount.putRelease);
app.post('/appRelease', sessionAuth, userAccount.postRelease);

/**
 * Service routes for CURD users
 ***/
app.get('/usersList', sessionAuth, users.getUsers);
app.post('/usersList', sessionAuth, users.postUser);
app.get('/usersList/:id', sessionAuth, users.getUsersById);
app.put('/usersList/:id', sessionAuth, users.putUsersById);
app.del('/usersList/:id', sessionAuth, users.delUsersById);

/**
 * Service routes for CURD interviews
 ***/
app.get('/interviewList', sessionAuth, interviewList.getInterviewList)
app.post('/interviewList', sessionAuth, interviewList.postInterview);
app.get('/interviewList/:id', sessionAuth, interviewList.getInterviewListById);
app.put('/interviewList/:id', sessionAuth, interviewList.putInterviewListById);
app.del('/interviewList/:id', sessionAuth, interviewList.delInterviewListById);

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
app.del('/recruiter/:id', sessionAuth, recruiter.delRecruiterById);

/**
 * Service routes for CURD interviewers
 ***/
app.get('/interviewer', sessionAuth, interviewer.getInterviewer);
app.post('/interviewer', sessionAuth, interviewer.postInterviewer);
app.get('/interviewer/:id', sessionAuth, interviewer.getInterviewerById);
app.put('/interviewer/:id', sessionAuth, interviewer.putInterviewerById);
app.del('/interviewer/:id', sessionAuth, interviewer.delInterviewerById);

/**
 * Service routes for reports
 ***/
app.get('/reportStatus', sessionAuth, reports.getInterviewStatusReport);
app.get('/reportMode', sessionAuth, reports.getInterviewModeReport);
app.get('/reportRounds', sessionAuth, reports.getInterviewRoundReport);

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
        res.status(401).send({
            error: '401 Unauthorized: Authentication is required and has failed or has not yet been provided'
        });
        // res.send('401 Unauthorized: Authentication is required and has failed or has not yet been provided');
        // 403 Forbidden: Your Authentication is not granted the permission to access the resource
    } else {
        next();
    }
}