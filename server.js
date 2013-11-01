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

var sequelize = require('./dbconfig').sequelize;
config = require("./dbresources");
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
app.get('/logout', authentication.getDestroyAuthentication);

app.get('/usersList', sessionAuth, users.getUsers);
app.post('/usersList', sessionAuth, users.postUser);
app.get('/usersList/:id', sessionAuth, users.getUsersById);
app.put('/usersList/:id', sessionAuth, users.putUsersById);
app.del('/usersList/:id', sessionAuth, users.delUsersById);

app.get('/interviewList', sessionAuth, interviewList.getInterviewList)
app.post('/interviewList', sessionAuth, interviewList.postInterview);
app.get('/interviewList/:id', sessionAuth, interviewList.getInterviewListById);
app.put('/interviewList/:id', sessionAuth, interviewList.putInterviewListById);
app.del('/interviewList/:id', sessionAuth, interviewList.delInterviewListById);

app.get('/mode', sessionAuth, mode.getMode);
app.get('/rounds', sessionAuth, rounds.getRounds);
app.get('/status', sessionAuth, status.getStatus);
app.get('/reportStatus', sessionAuth, reports.getInterviewStatusReport);
app.get('/reportMode', sessionAuth, reports.getInterviewModeReport);
app.get('/interviewerStatusReport/:id', sessionAuth, reports.getInterviewerStatusReport);
app.get('/interviewerModeReport/:id', sessionAuth, reports.getInterviewerModeReport);

app.get('/recruiter', sessionAuth, recruiter.getRecruiter);
app.post('/recruiter', sessionAuth, recruiter.postRecruiter);

app.get('/recruiter/:id', sessionAuth, recruiter.getRecruiterById);
app.put('/recruiter/:id', sessionAuth, recruiter.putRecruiterById);
app.del('/recruiter/:id', sessionAuth, recruiter.delRecruiterById);

app.get('/interviewer', sessionAuth, interviewer.getInterviewer);
app.post('/interviewer', interviewer.postInterviewer);

app.get('/interviewer/:id', sessionAuth, interviewer.getInterviewerById);
app.put('/interviewer/:id', sessionAuth, interviewer.putInterviewerById);
app.del('/interviewer/:id', sessionAuth, interviewer.delInterviewerById);

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