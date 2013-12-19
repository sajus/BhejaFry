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
		recycleBin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
	}, {
		tableName: 'interviewer_tbl'
	});
};