var express   = require('express')
  , http      = require('http')
  , app       = express()
  , http      = require('http')
  , _         = require('underscore')
  , path      = require('path');

var routes          = require('./routes')
  , authorization   = require('./routes/authorization_src')
  , interview       = require('./routes/interview_src')
  , interviewList   = require('./routes/interviewList_src')
  , interviewer     = require('./routes/interviewer_src')
  , mode            = require('./routes/mode_src')
  , rounds          = require('./routes/rounds_src')
  , status          = require('./routes/status_src')
  , recruiter       = require('./routes/recruiter_src');

var sequelize = require('./dbconfig').sequelize;
config        = require("./dbresources");
db            = config.database;

app.configure(function() {
    app.set('port', process.env.PORT || db.port);
    app.use(express.bodyParser());
    app.set(express.methodOverride());
    app.set(express.router);
    app.use(express.static(__dirname + '/src'));
});

// app.get('/', routes.index);

app.post('/checkAuthorization', authorization.postAuthorization);

app.post('/interview', interview.postInterview);

app.get('/interviewList', interviewList.getInterviewList)
app.get('/interviewList/:id', interviewList.getInterviewListById);
app.put('/interviewList/:id', interviewList.putInterviewListById);
app.del('/interviewList/:id', interviewList.delInterviewListById);

app.get('/interviewer', interviewer.getInterviewer);
app.get('/mode', mode.getMode);
app.get('/rounds', rounds.getRounds);
app.get('/status', status.getStatus);
app.get('/recruiter', recruiter.getRecruiter);

http.createServer(app).listen(app.get('port'), function(){
    console.log("\n\n\tNode (Express) server listening on port " + app.get('port'))
});