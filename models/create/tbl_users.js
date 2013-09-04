module.exports = function(sequelize, DataTypes) {

	return sequelize.define("Users", {
		empid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
            validate: {
                isNumeric: true
            }
		},
		email: {
			type: DataTypes.STRING(40),
			allowNull: false,
			validate: {
				isEmail: true,
				len: [7, 50]
			}
		},
		firstname: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				isAlpha: true,
				len: [2, 20]
			}
		},
		lastname: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				isAlpha: true,
				len: [2, 20]
			}
		},
		password: {
			type: DataTypes.STRING(40),
			allowNull: false,
			validate: {
				len: [8, 40]
			}
		},
		accesstype: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'users_tbl'
	});

};