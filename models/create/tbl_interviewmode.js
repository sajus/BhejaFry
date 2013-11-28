module.exports = function(sequelize, DataTypes) {

	return sequelize.define("InterviewMode", {
		mode: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				isAlpha: true,
				len: [2, 30]
			}
		}
	}, {
		tableName: 'interviewmode_tbl'
	});
};