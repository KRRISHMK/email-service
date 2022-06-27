export default (sequelize, DataTypes) => {
    const user_book = sequelize.define(
        "user_book",
        {
            book_id: {
                type: DataTypes.INTEGER,
            },
            account_number: {
                type: DataTypes.INTEGER,
            },
            book_title: {
                type: DataTypes.STRING,
            },
            author: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    user_book.associate = function(models) {
        user_book.belongsTo(models.users, {
            foreignKey: "user_id",
            as: "userData",
        });
    };
    return user_book;
};
