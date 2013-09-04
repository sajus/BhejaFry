(function() {

    "use strict";

    var sequelize = require('../dbconfig').sequelize
     ,  tbl_interviewer = sequelize.import(__dirname + '/create/tbl_interviewer')
     ,  tbl_interviewmode = sequelize.import(__dirname + '/create/tbl_interviewmode')
     ,  tbl_interviewstatus = sequelize.import(__dirname + '/create/tbl_interviewstatus')
     ,  tbl_interviewrounds = sequelize.import(__dirname + '/create/tbl_interviewrounds')
     ,  tbl_recruiter = sequelize.import(__dirname + '/create/tbl_recruiter')
     ,  tbl_users = sequelize.import(__dirname + '/create/tbl_users')
     ,  tbl_interviewresponse = sequelize.import(__dirname + '/create/tbl_interviewresponse');

    tbl_interviewer.hasMany(tbl_interviewresponse, {
        foreignKey: 'interviewer_1_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    tbl_interviewresponse.belongsTo(tbl_interviewer);

    tbl_interviewer.hasMany(tbl_interviewresponse, {
        foreignKey: 'interviewer_2_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    tbl_interviewresponse.belongsTo(tbl_interviewer);

    tbl_interviewmode.hasMany(tbl_interviewresponse, {
        foreignKey: 'mode_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    tbl_interviewresponse.belongsTo(tbl_interviewmode);

    tbl_interviewstatus.hasMany(tbl_interviewresponse, {
        foreignKey: 'status_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    tbl_interviewresponse.belongsTo(tbl_interviewmode);

    tbl_interviewrounds.hasMany(tbl_interviewresponse, {
        foreignKey: 'round_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    tbl_interviewresponse.belongsTo(tbl_interviewrounds);

    tbl_recruiter.hasMany(tbl_interviewresponse, {
        foreignKey: 'recruiter_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    tbl_interviewresponse.belongsTo(tbl_recruiter);

    function createInterviewResponse() {
        tbl_interviewresponse
        .bulkCreate([
            { candiateName: 'Krishna Reddy',interviewer_1_id: 5421, interviewer_2_id: 7601, interviewDate:'2013-09-11', recruiter_id:6523, status_id:1, round_id:2, mode_id:1,description:'Does not have proper knowledge', deleteFlag: 0 },
            { candiateName: 'Krishna Iyer',interviewer_1_id: 5421, interviewer_2_id: 7601, interviewDate:'2013-09-11', recruiter_id:6523, status_id:2, round_id:2, mode_id:1,description:'Does not have proper knowledge', deleteFlag: 0 },
            { candiateName: 'Krishna Kumar',interviewer_1_id: 5421, interviewer_2_id: 7601, interviewDate:'2013-09-11', recruiter_id:6523, status_id:3, round_id:2, mode_id:1,description:'Does not have proper knowledge', deleteFlag: 0 },
            { candiateName: 'Krishna Desai',interviewer_1_id: 5421, interviewer_2_id: 7601, interviewDate:'2013-09-11', recruiter_id:6523, status_id:4, round_id:2, mode_id:1,description:'Does not have proper knowledge', deleteFlag: 0 }
        ])
        .on('success', function() {
            console.log("Interview-Response table is ready");
            console.log("Database Tables has been setup successfully");
        }).on('error', function(error) {
            console.log("Error occured while creating response table!");
            console.log(error);
        });
    }

    function createInterviewer() {
        tbl_interviewer
        .bulkCreate([
            { empid:1967, firstname:'Kamlesh', lastname:'Gaikwad' },
            { empid:2435, firstname:'Vishal', lastname:'Chauhan' },
            { empid:2762, firstname:'Ashish', lastname:'Chandugade' },
            { empid:3279, firstname:'Abhijit', lastname:'Sagade' },
            { empid:3508, firstname:'Awesh', lastname:'Shrivastava' },
            { empid:3667, firstname:'Sachin', lastname:'Shinde' },
            { empid:3937, firstname:'Prachi', lastname:'Bhruguwar' },
            { empid:4003, firstname:'Yogesh', lastname:'Gaikwad' },
            { empid:4573, firstname:'Rakesh', lastname:'Thakor' },
            { empid:4593, firstname:'Bhushan', lastname:'Joshi' },
            { empid:4996, firstname:'Nishant', lastname:'Joshi' },
            { empid:5042, firstname:'Amarendra', lastname:'Samal' },
            { empid:5421, firstname:'Ajay', lastname:'Sajwan' },
            { empid:5426, firstname:'Yogesh', lastname:'Kodarkar' },
            { empid:5470, firstname:'Dhritee', lastname:'Rathore' },
            { empid:5689, firstname:'Kumar', lastname:'Kundan' },
            { empid:5995, firstname:'Satvashil', lastname:'Jagtap' },
            { empid:6536, firstname:'Jatin', lastname:'Patel' },
            { empid:6587, firstname:'Omkar', lastname:'Kulkarni' },
            { empid:6672, firstname:'Jaydeep', lastname:'Tank' },
            { empid:6735, firstname:'Ram', lastname:'Joshi' },
            { empid:6815, firstname:'Shruti', lastname:'Kshatriya' },
            { empid:6817, firstname:'Sudhir', lastname:'Nair' },
            { empid:6865, firstname:'Mahesh', lastname:'Sapkal' },
            { empid:6895, firstname:'Basavraj', lastname:'Keshatti' },
            { empid:7087, firstname:'Pravin', lastname:'Sonawane' },
            { empid:7559, firstname:'Ajay', lastname:'Pawar' },
            { empid:7601, firstname:'Saju', lastname:'Sasidharan' },
            { empid:7736, firstname:'Mayur', lastname:'Thakor' },
            { empid:7988, firstname:'Gandharva', lastname:'Jadhav' },
            { empid:8101, firstname:'Shashank', lastname:'Lakhotia' },
            { empid:8119, firstname:'Navneet', lastname:'Shrivastava' },
            { empid:8679, firstname:'Manasi', lastname:'Bhagwat' },
            { empid:8972, firstname:'Snehal', lastname:'Bhapkar' },
            { empid:9484, firstname:'Ashish Kumar', lastname:'Thawait' },
            { empid:9554, firstname:'Swapna', lastname:'Purohit' },
            { empid:9761, firstname:'Hardik', lastname:'Joshi' },
            { empid:10353,firstname: 'Sonam', lastname:'Diwate' },
            { empid:11509,firstname: 'Shravan', lastname:'Khare' }
        ])
        .on('success', function() {
            console.log("Interviewer table is ready");
            createInterviewResponse();
        }).on('error', function(error) {
            console.log("Error occured while creating response table!");
            console.log(error);
        });
    }

    function createRecruiter() {
        tbl_recruiter
        .bulkCreate([
            { empid:2635, firstname:'Shwetambari', lastname: 'Salgar' },
            { empid:3915, firstname:'Vikram', lastname: 'Chopra' },
            { empid:4118, firstname:'Pooja Walia', lastname: 'Garde' },
            { empid:6201, firstname:'Prakash', lastname: 'Vachhani' },
            { empid:6523, firstname:'Kirti', lastname: 'Namjoshi' },
            { empid:7461, firstname:'Ketan', lastname: 'Simant' },
            { empid:8063, firstname:'Amruta', lastname: 'Joshi' },
            { empid:9495, firstname:'Jitin', lastname: 'Naidu' },
            { empid:9637, firstname:'Deepika', lastname: 'Gupta' },
            { empid:9758, firstname:'Amit', lastname: 'Jain' },
            { empid:9846, firstname:'Abhinav', lastname: 'Dingre' },
            { empid:9989, firstname:'Amruta', lastname: 'Devale' },
            { empid:10035,firstname: 'Mavish', lastname: 'Ajaney' },
            { empid:10344,firstname: 'Ketaki', lastname: 'Hebalkar' },
            { empid:10772,firstname: 'Kina', lastname: 'Pandya' },
            { empid:10859,firstname: 'Raj', lastname: 'Pillai' },
            { empid:11337,firstname: 'Parul', lastname: 'Shrivastav' }
        ])
        .on('success', function() {
            console.log("Recruiter table is ready");
            createInterviewer();
        }).on('error', function(error) {
            console.log("Error occured while creating response table!");
            console.log(error);
        });
    }

    function createInterviewRounds() {
        tbl_interviewrounds
        .bulkCreate([
            { round: '1st Round' },
            { round: '2ed Round' },
            { round: '3rd Round' },
            { round: 'Final' }
        ])
        .on('success', function() {
            console.log("Interviewer-Rounds table is ready");
            createRecruiter();
        }).on('error', function(error) {
            console.log("Error occured while creating response table!");
            console.log(error);
        });
    }

    function createInterviewStatus() {
        tbl_interviewstatus
        .bulkCreate([
            { status: 'Rejected' },
            { status: 'Call for F2F round' },
            { status: 'OnHold' },
            { status: 'Selected' }
        ])
        .on('success', function() {
            console.log("Interviewer-Status table is ready");
            createInterviewRounds();
        }).on('error', function(error) {
            console.log("Error occured while creating response table!");
            console.log(error);
        });
    }

    function createInterviewMode() {
        tbl_interviewmode
        .bulkCreate([
            { mode: 'Telephonic' },
            { mode: 'VC/Skype' },
            { mode: 'Personal' }
        ])
        .on('success', function() {
            console.log("Interviewer-Mode table is ready");
            createInterviewStatus();
        }).on('error', function(error) {
            console.log("Error occured while creating response table!");
            console.log(error);
        });
    }

    sequelize.sync({force:true}).on('success', function() {
        tbl_users
        .bulkCreate([
            { empid:7601, email:'sajus@cybage.com', firstname: 'Saju', lastname:'Sasidharan', password:'sajuspass', accesstype: 1 },
            { empid:10748, email:'ashwinh@cybage.com', firstname: 'Ashwin', lastname:'Hegde', password:'ashwinpass', accesstype: 0 }
        ])
        .on('success', function() {
            console.log("Users table is ready");
            createInterviewMode();
        }).on('error', function(error) {
            console.log("Error occured while creating response table!");
            console.log(error);
        });
    });
}());