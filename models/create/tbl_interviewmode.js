module.exports = function(sequelize, DataTypes) {

	return sequelize.define("InterviewMode", {
		mode: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				isAlpha: true,
				len: [2, 30]
			}
		},
		recycleBin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
	}, {
		tableName: 'interviewmode_tbl'
	});
};