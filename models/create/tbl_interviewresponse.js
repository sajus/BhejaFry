module.exports = function(sequelize, DataTypes) {

  return sequelize.define("InterviewResponse", {
        candiateName: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                isAlpha: true,
                len: [2, 30]
            }
        },
        interviewDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        description: {
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