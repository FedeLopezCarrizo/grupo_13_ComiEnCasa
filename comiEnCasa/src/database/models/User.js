const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING, 
        lastName: DataTypes.STRING,
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.TEXT,
        image: DataTypes.TEXT,
        phoneNumber: DataTypes.TEXT,
        typeDocId: DataTypes.INTEGER,
        numberDoc: DataTypes.STRING,
        address: DataTypes.STRING,
        cityId: DataTypes.INTEGER
    });
    User.associate = (models => {
        User.belongsTo(models.TypeDocument, {
            foreignKey: 'typeDocId'
        });
        User.belongsToMany(models.Role, {
            as: 'roles', 
            through:'userrole'
        });
        User.hasMany(models.Item, {
            foreignKey: "userId",
            as: "items",
          });
        User.hasMany(models.Cart, {
            foreignKey: "userId",
            as: "carts",
        });
    });

    return User;
}