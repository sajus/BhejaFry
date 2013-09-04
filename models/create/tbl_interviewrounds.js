module.exports = function(sequelize, DataTypes) {
	return sequelize.define("InterviewRounds", {
		round: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				isAlpha: true,
				len: [2, 30]
			}
		}
	}, {
		tableName: 'interviewrounds_tbl'
	});
};