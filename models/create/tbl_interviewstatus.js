module.exports = function(sequelize, DataTypes) {

	return sequelize.define("InterviewStatus", {
		status: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				isAlpha: true,
				len: [2, 30]
			}
		}
	}, {
		tableName: 'interviewstatus_tbl'
	});
};