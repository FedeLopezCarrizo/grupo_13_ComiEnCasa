const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: {
            type: DataTypes.STRING(256),  
            allowNull: false
        }
    },
    {
        tableName: 'roles'
    });
    Role.associate = models => {
        Role.belongsToMany(models.User, {
            through: 'userrole'
        })
    };

    return Role;
}