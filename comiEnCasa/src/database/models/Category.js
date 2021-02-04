const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING(256),  
            allowNull: false
        }
    },
    {
        tableName: 'categories'
    });
    Category.associate = models => {
        Category.belongsToMany(models.Product, {
            through: 'product_category'
        })
    };

    return Category;
}