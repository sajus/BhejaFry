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
				len: [7, 40]
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
		password: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: [8, 50]
			}
		},
		block: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		reset: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		appRelease: {
			type: DataTypes.BOOLEAN,
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
		tableName: 'users_tbl'
	});

};