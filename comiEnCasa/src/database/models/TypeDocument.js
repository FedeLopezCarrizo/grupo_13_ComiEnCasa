const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const TypeDocument = sequelize.define('TypeDocument', {
        name: DataTypes.STRING
    },
    {
        tableName: 'typedocuments'
    }); 
    TypeDocument.associate = models => {
        TypeDocument.hasMany(models.User, {
            foreignKey: 'typeDocId'
        })
    }

    return TypeDocument;
}