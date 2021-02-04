const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING, 
        price: DataTypes.FLOAT,
        discount: DataTypes.FLOAT,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        stock: DataTypes.INTEGER
    });
    Product.associate = (models => {
        Product.belongsToMany(models.Category, {
            as: 'categories', 
            through:'product_category'
        });
        Product.hasMany(models.Item, {
            as: "items",
            foreignKey: "productId",
        });
    });

    return Product;
}