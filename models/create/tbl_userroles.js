module.exports = function(sequelize, DataTypes) {

	return sequelize.define("UserRoles", {
		roleid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			validate: {
				isNumeric: true
			}
		},
		roles: {
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
		tableName: 'userroles_tbl'
	});

};