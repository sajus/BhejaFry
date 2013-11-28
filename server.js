/**
 *
 ***/

var express = require('express'),
    http = require('http'),
    app = express(),
    http = require('http'),
    _ = require('underscore'),
    path = require('path');

var routes = require('./routes'),
    authentication = require('./routes/authentication_src'),
    interviewList = require('./routes/interviewList_src'),
    interviewer = require('./routes/interviewer_src'),
    mode = require('./routes/mode_src'),
    rounds = require('./routes/rounds_src'),
    status = require('./routes/status_src'),
    recruiter = require('./routes/recruiter_src'),
    reports = require('./routes/reports_src'),
    users = require('./routes/users_src');

var sequelize = require('./config/dbconfig').sequelize;
config = require("./config/dbresources");
db = config.database;

app.configure(function() {
    app.set('port', process.env.PORT || db.port);
    app.use(express.bodyParser());
    app.set(express.methodOverride());
    app.use(express.cookieParser('kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig'));
    app.use(express.session());
    app.set(express.router);
    app.use(express.static(__dirname + '/src'));
});

// app.get('/', routes.index);

app.post('/authenticate', authentication.postAuthentication);
app.put('/authReset', authentication.putResetAuthentication);
app.put('/appRelease', authentication.putRelease);
app.get('/appRelease', authentication.getRelease);
app.put('/authUnlock', authentication.putAuthUnlock);
app.get('/logout', authentication.getDestroyAuthentication);

app.get('/usersList', users.getUsers);
app.post('/usersList', users.postUser);
app.get('/usersList/:id', users.getUsersById);
app.put('/usersList/:id', users.putUsersById);
app.del('/usersList/:id', users.delUsersById);

app.get('/interviewList', interviewList.getInterviewList)
app.post('/interviewList', interviewList.postInterview);
app.get('/interviewList/:id', interviewList.getInterviewListById);
app.put('/interviewList/:id', interviewList.putInterviewListById);
app.del('/interviewList/:id', interviewList.delInterviewListById);

app.get('/mode', mode.getMode);
app.get('/rounds', rounds.getRounds);
app.get('/status', status.getStatus);
app.get('/interviewerStatusReport/:id', reports.getInterviewerStatusReport);
app.get('/interviewerModeReport/:id', reports.getInterviewerModeReport);

app.get('/recruiter', recruiter.getRecruiter);
app.post('/recruiter', recruiter.postRecruiter);

app.get('/recruiter/:id', recruiter.getRecruiterById);
app.put('/recruiter/:id', recruiter.putRecruiterById);
app.del('/recruiter/:id', recruiter.delRecruiterById);

app.get('/interviewer', interviewer.getInterviewer);
app.post('/interviewer', interviewer.postInterviewer);

app.get('/interviewer/:id', interviewer.getInterviewerById);
app.put('/interviewer/:id', interviewer.putInterviewerById);
app.del('/interviewer/:id', interviewer.delInterviewerById);

app.get('/reportStatus', reports.getInterviewStatusReport);
app.get('/reportMode', reports.getInterviewModeReport);

http.createServer(app).listen(app.get('port'), function() {
    console.log("\n\n\tNode (Express) server listening on port " + app.get('port'))
});

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