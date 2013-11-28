module.exports = function(sequelize, DataTypes) {

	return sequelize.define("Interviewer", {
		empid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		firstname: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
	}, {
		tableName: 'interviewer_tbl'
	});
};