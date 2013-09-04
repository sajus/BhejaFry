module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Recruiter", {
		empid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
            validate: {
                isNumeric: true
            }
		},
		firstname: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				isAlpha: true,
				len: [2, 30]
			}
		},
		lastname: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				isAlpha: true,
				len: [2, 30]
			}
		},
	}, {
		tableName: 'recruiter_tbl'
	});
};