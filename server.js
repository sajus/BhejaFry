/**
 * Build-in | Third party module dependencies.
 ***/

var express = require('express'),
    http = require('http'),
    _ = require('underscore'),
    path = require('path');

var app = express();

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

var sequelize = require('./config/dbConfig').sequelize,
    config = require("./config/dbResources"),
    db = config.database;


/**
 * Application Configurations
 ***/
app.configure(function() {
    app.set('port', process.env.PORT || db.port);
    app.use(express.bodyParser());
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
app.get('/logout', authentication.getCloseAuthentication);

/**
 * Service routes for user account
 ***/
app.put('/userReset', userAccount.putReset);
app.post('/userChange/:email', userAccount.postUserChange);

app.put('/userBlock', userAccount.putBlock);
app.put('/appRelease', userAccount.putRelease);
app.post('/appRelease', userAccount.postRelease);

/**
 * Service routes for CURD users
 ***/
app.get('/usersList', users.getUsers);
app.post('/usersList', users.postUser);
app.get('/usersList/:id', users.getUsersById);
app.put('/usersList/:id', users.putUsersById);
app.del('/usersList/:id', users.delUsersById);

/**
 * Service routes for CURD interviews
 ***/
app.get('/interviewList', interviewList.getInterviewList)
app.post('/interviewList', interviewList.postInterview);
app.get('/interviewList/:id', interviewList.getInterviewListById);
app.put('/interviewList/:id', interviewList.putInterviewListById);
app.del('/interviewList/:id', interviewList.delInterviewListById);

/**
 * Service routes for CURD interview components
 ***/
app.get('/mode', mode.getMode);
app.get('/rounds', rounds.getRounds);
app.get('/status', status.getStatus);
/**
 * Service routes for CURD recruiters
 ***/
app.get('/recruiter', recruiter.getRecruiter);
app.post('/recruiter', recruiter.postRecruiter);
app.get('/recruiter/:id', recruiter.getRecruiterById);
app.put('/recruiter/:id', recruiter.putRecruiterById);
app.del('/recruiter/:id', recruiter.delRecruiterById);

/**
 * Service routes for CURD interviewers
 ***/
app.get('/interviewer', interviewer.getInterviewer);
app.post('/interviewer', interviewer.postInterviewer);
app.get('/interviewer/:id', interviewer.getInterviewerById);
app.put('/interviewer/:id', interviewer.putInterviewerById);
app.del('/interviewer/:id', interviewer.delInterviewerById);

/**
 * Service routes for reports
 ***/
app.get('/reportStatus', reports.getInterviewStatusReport);
app.get('/reportMode', reports.getInterviewModeReport);
app.get('/reportRounds', reports.getInterviewRoundReport);

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