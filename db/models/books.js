export default (sequelize, DataTypes) => {
    const books = sequelize.define(
        "books",
        {
            s_no: {
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
            rack: {
                type: DataTypes.STRING,
            },
            cost: {
                type: DataTypes.INTEGER,
            },
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    return books;
};
