module.exports = function(sequelize, DataTypes) {

    return sequelize.define("InterviewResponse", {
        interviewDate: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        cFirstName: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                isAlpha: true,
                len: [2, 30]
            }
        },
        cLastName: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                isAlpha: true,
                len: [2, 30]
            }
        },
        cEmail: {
            type: DataTypes.STRING(40),
            allowNull: false,
            validate: {
                isEmail: true,
                len: [7, 40]
            }
        },
        strength: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        improveArea: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        deleteFlag: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
    }, {
        tableName: 'interviewresponse_tbl'
    });
};