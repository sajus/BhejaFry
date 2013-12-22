(function() {

    "use strict";

    var sequelize = require('../config/sqlzConfig').sequelize,
        tbl_interviewer = sequelize.import(__dirname + '/create/tbl_interviewer'),
        tbl_interviewmode = sequelize.import(__dirname + '/create/tbl_interviewmode'),
        tbl_interviewstatus = sequelize.import(__dirname + '/create/tbl_interviewstatus'),
        tbl_interviewrounds = sequelize.import(__dirname + '/create/tbl_interviewrounds'),
        tbl_recruiter = sequelize.import(__dirname + '/create/tbl_recruiter'),
        tbl_userroles = sequelize.import(__dirname + '/create/tbl_userroles'),
        tbl_users = sequelize.import(__dirname + '/create/tbl_users'),
        tbl_interviewresponse = sequelize.import(__dirname + '/create/tbl_interviewresponse');

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

    tbl_userroles.hasMany(tbl_users, {
        foreignKey: 'role_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    tbl_users.belongsTo(tbl_userroles);

    function createUsers() {
        tbl_users
            .bulkCreate([{
                empid: 7601,
                email: 'sajus@cybage.com',
                firstname: 'Saju',
                lastname: 'Sasidharan',
                password: 'sajuspass',
                role_id: 1,
                block: false,
                reset: false,
                appRelease: false,
                recycleBin: 0
            }, {
                empid: 10748,
                email: 'ashwinh@cybage.com',
                firstname: 'Ashwin',
                lastname: 'Hegde',
                password: 'ashwinpass',
                role_id: 0,
                block: false,
                reset: false,
                appRelease: false,
                recycleBin: 0
            }])
            .on('success', function() {
                console.log("Users table is ready");
                console.log("Database Tables has been setup successfully");
            }).on('error', function(error) {
                console.log("Error occured while creating response table!");
                console.log(error);
            });
    }

    function createInterviewResponse() {
        tbl_interviewresponse
            .bulkCreate([{
                cFirstName: 'Ashwin',
                cLastName: 'Hegde',
                cEmail: 'unknown1@gmail.com',
                interviewer_1_id: 5421,
                interviewer_2_id: 7601,
                interviewDate: '1388428200',
                recruiter_id: 6523,
                status_id: 1,
                round_id: 2,
                mode_id: 1,
                strength: 'Good in JavaScript',
                improveArea: 'Can improve in HTML5',
                comments: 'Does not have proper knowledge',
                recycleBin: 0
            }, {
                cFirstName: 'Ashwin',
                cLastName: 'Hegde',
                cEmail: 'unknown2@gmail.com',
                interviewer_1_id: 5421,
                interviewer_2_id: 7601,
                interviewDate: '1388428200',
                recruiter_id: 6523,
                status_id: 2,
                round_id: 2,
                mode_id: 1,
                strength: 'Good in JavaScript',
                improveArea: 'Can improve in HTML5',
                comments: 'Does not have proper knowledge',
                recycleBin: 0
            }, {
                cFirstName: 'Ashwin',
                cLastName: 'Hegde',
                cEmail: 'unknown3@gmail.com',
                interviewer_1_id: 5421,
                interviewer_2_id: 7601,
                interviewDate: '1388428200',
                recruiter_id: 6523,
                status_id: 3,
                round_id: 2,
                mode_id: 1,
                strength: 'Good in JavaScript',
                improveArea: 'Can improve in HTML5',
                comments: 'Does not have proper knowledge',
                recycleBin: 0
            }, {
                cFirstName: 'Ashwin',
                cLastName: 'Hegde',
                cEmail: 'unknown4@gmail.com',
                interviewer_1_id: 5421,
                interviewer_2_id: 7601,
                interviewDate: '1388428200',
                recruiter_id: 6523,
                status_id: 4,
                round_id: 2,
                mode_id: 1,
                strength: 'Good in JavaScript',
                improveArea: 'Can improve in HTML5',
                comments: 'Does not have proper knowledge',
                recycleBin: 0
            }])
            .on('success', function() {
                console.log("Interview-Response table is ready");
                createUsers();
            }).on('error', function(error) {
                console.log("Error occured while creating response table!");
                console.log(error);
            });
    }

    function createInterviewer() {
        tbl_interviewer
            .bulkCreate([{
                empid: 1967,
                firstname: 'Kamlesh',
                lastname: 'Gaikwad',
                recycleBin: 0
            }, {
                empid: 2435,
                firstname: 'Vishal',
                lastname: 'Chauhan',
                recycleBin: 0
            }, {
                empid: 2762,
                firstname: 'Ashish',
                lastname: 'Chandugade',
                recycleBin: 0
            }, {
                empid: 3279,
                firstname: 'Abhijit',
                lastname: 'Sagade',
                recycleBin: 0
            }, {
                empid: 3508,
                firstname: 'Awesh',
                lastname: 'Shrivastava',
                recycleBin: 0
            }, {
                empid: 3667,
                firstname: 'Sachin',
                lastname: 'Shinde',
                recycleBin: 0
            }, {
                empid: 3937,
                firstname: 'Prachi',
                lastname: 'Bhruguwar',
                recycleBin: 0
            }, {
                empid: 4003,
                firstname: 'Yogesh',
                lastname: 'Gaikwad',
                recycleBin: 0
            }, {
                empid: 4573,
                firstname: 'Rakesh',
                lastname: 'Thakor',
                recycleBin: 0
            }, {
                empid: 4593,
                firstname: 'Bhushan',
                lastname: 'Joshi',
                recycleBin: 0
            }, {
                empid: 4996,
                firstname: 'Nishant',
                lastname: 'Joshi',
                recycleBin: 0
            }, {
                empid: 5042,
                firstname: 'Amarendra',
                lastname: 'Samal',
                recycleBin: 0
            }, {
                empid: 5421,
                firstname: 'Ajay',
                lastname: 'Sajwan',
                recycleBin: 0
            }, {
                empid: 5426,
                firstname: 'Yogesh',
                lastname: 'Kodarkar',
                recycleBin: 0
            }, {
                empid: 5470,
                firstname: 'Dhritee',
                lastname: 'Rathore',
                recycleBin: 0
            }, {
                empid: 5689,
                firstname: 'Kumar',
                lastname: 'Kundan',
                recycleBin: 0
            }, {
                empid: 5995,
                firstname: 'Satvashil',
                lastname: 'Jagtap',
                recycleBin: 0
            }, {
                empid: 6536,
                firstname: 'Jatin',
                lastname: 'Patel',
                recycleBin: 0
            }, {
                empid: 6587,
                firstname: 'Omkar',
                lastname: 'Kulkarni',
                recycleBin: 0
            }, {
                empid: 6672,
                firstname: 'Jaydeep',
                lastname: 'Tank',
                recycleBin: 0
            }, {
                empid: 6735,
                firstname: 'Ram',
                lastname: 'Joshi',
                recycleBin: 0
            }, {
                empid: 6815,
                firstname: 'Shruti',
                lastname: 'Kshatriya',
                recycleBin: 0
            }, {
                empid: 6817,
                firstname: 'Sudhir',
                lastname: 'Nair',
                recycleBin: 0
            }, {
                empid: 6865,
                firstname: 'Mahesh',
                lastname: 'Sapkal',
                recycleBin: 0
            }, {
                empid: 6895,
                firstname: 'Basavraj',
                lastname: 'Keshatti',
                recycleBin: 0
            }, {
                empid: 7087,
                firstname: 'Pravin',
                lastname: 'Sonawane',
                recycleBin: 0
            }, {
                empid: 7559,
                firstname: 'Ajay',
                lastname: 'Pawar',
                recycleBin: 0
            }, {
                empid: 7601,
                firstname: 'Saju',
                lastname: 'Sasidharan',
                recycleBin: 0
            }, {
                empid: 7736,
                firstname: 'Mayur',
                lastname: 'Thakor',
                recycleBin: 0
            }, {
                empid: 7988,
                firstname: 'Gandharva',
                lastname: 'Jadhav',
                recycleBin: 0
            }, {
                empid: 8101,
                firstname: 'Shashank',
                lastname: 'Lakhotia',
                recycleBin: 0
            }, {
                empid: 8119,
                firstname: 'Navneet',
                lastname: 'Shrivastava',
                recycleBin: 0
            }, {
                empid: 8679,
                firstname: 'Manasi',
                lastname: 'Bhagwat',
                recycleBin: 0
            }, {
                empid: 8972,
                firstname: 'Snehal',
                lastname: 'Bhapkar',
                recycleBin: 0
            }, {
                empid: 9484,
                firstname: 'Ashish Kumar',
                lastname: 'Thawait',
                recycleBin: 0
            }, {
                empid: 9554,
                firstname: 'Swapna',
                lastname: 'Purohit',
                recycleBin: 0
            }, {
                empid: 9761,
                firstname: 'Hardik',
                lastname: 'Joshi',
                recycleBin: 0
            }, {
                empid: 10353,
                firstname: 'Sonam',
                lastname: 'Diwate',
                recycleBin: 0
            }, {
                empid: 11509,
                firstname: 'Shravan',
                lastname: 'Khare',
                recycleBin: 0
            }])
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
            .bulkCreate([{
                empid: 2635,
                firstname: 'Shwetambari',
                lastname: 'Salgar',
                recycleBin: 0
            }, {
                empid: 3915,
                firstname: 'Vikram',
                lastname: 'Chopra',
                recycleBin: 0
            }, {
                empid: 4118,
                firstname: 'Pooja Walia',
                lastname: 'Garde',
                recycleBin: 0
            }, {
                empid: 6201,
                firstname: 'Prakash',
                lastname: 'Vachhani',
                recycleBin: 0
            }, {
                empid: 6523,
                firstname: 'Kirti',
                lastname: 'Namjoshi',
                recycleBin: 0
            }, {
                empid: 7461,
                firstname: 'Ketan',
                lastname: 'Simant',
                recycleBin: 0
            }, {
                empid: 8063,
                firstname: 'Amruta',
                lastname: 'Joshi',
                recycleBin: 0
            }, {
                empid: 9495,
                firstname: 'Jitin',
                lastname: 'Naidu',
                recycleBin: 0
            }, {
                empid: 9637,
                firstname: 'Deepika',
                lastname: 'Gupta',
                recycleBin: 0
            }, {
                empid: 9758,
                firstname: 'Amit',
                lastname: 'Jain',
                recycleBin: 0
            }, {
                empid: 9846,
                firstname: 'Abhinav',
                lastname: 'Dingre',
                recycleBin: 0
            }, {
                empid: 9989,
                firstname: 'Amruta',
                lastname: 'Devale',
                recycleBin: 0
            }, {
                empid: 10035,
                firstname: 'Mavish',
                lastname: 'Ajaney',
                recycleBin: 0
            }, {
                empid: 10344,
                firstname: 'Ketaki',
                lastname: 'Hebalkar',
                recycleBin: 0
            }, {
                empid: 10772,
                firstname: 'Kina',
                lastname: 'Pandya',
                recycleBin: 0
            }, {
                empid: 10859,
                firstname: 'Raj',
                lastname: 'Pillai',
                recycleBin: 0
            }, {
                empid: 11337,
                firstname: 'Parul',
                lastname: 'Shrivastav',
                recycleBin: 0
            }])
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
            .bulkCreate([{
                round: '1st Round',
                recycleBin: 0
            }, {
                round: '2nd Round',
                recycleBin: 0
            }, {
                round: '3rd Round',
                recycleBin: 0
            }, {
                round: 'Final',
                recycleBin: 0
            }])
            .on('success', function() {
                console.log("Interview-Rounds table is ready");
                createRecruiter();
            }).on('error', function(error) {
                console.log("Error occured while creating response table!");
                console.log(error);
            });
    }

    function createInterviewStatus() {
        tbl_interviewstatus
            .bulkCreate([{
                status: 'Rejected',
                recycleBin: 0
            }, {
                status: 'Call for F2F round',
                recycleBin: 0
            }, {
                status: 'OnHold',
                recycleBin: 0
            }, {
                status: 'Selected',
                recycleBin: 0
            }])
            .on('success', function() {
                console.log("Interview-Status table is ready");
                createInterviewRounds();
            }).on('error', function(error) {
                console.log("Error occured while creating response table!");
                console.log(error);
            });
    }

    function createInterviewMode() {
        tbl_interviewmode
            .bulkCreate([{
                mode: 'Telephonic',
                recycleBin: 0
            }, {
                mode: 'VC/Skype',
                recycleBin: 0
            }, {
                mode: 'Personal',
                recycleBin: 0
            }])
            .on('success', function() {
                console.log("Interview-Mode table is ready");
                createInterviewStatus();
            }).on('error', function(error) {
                console.log("Error occured while creating response table!");
                console.log(error);
            });
    }

    sequelize.sync({
        force: true
    }).on('success', function() {
        tbl_userroles
            .bulkCreate([{
                roleid: 0,
                roles: 'User',
                recycleBin: 0
            }, {
                roleid: 1,
                roles: 'Administrator',
                recycleBin: 0
            }])
            .on('success', function() {
                console.log("Userroles table is ready");
                createInterviewMode();
            }).on('error', function(error) {
                console.log("Error occured while creating response table!");
                console.log(error);
            });
    });
}());