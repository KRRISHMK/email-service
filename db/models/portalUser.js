export default (sequelize, DataTypes) => {
    const portal_user = sequelize.define(
        "portal_user",
        {
            first_name: {
                type: DataTypes.STRING,
            },
            last_name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            avatar_url: {
                type: DataTypes.STRING,
            },
            role_id: {
                type: DataTypes.INTEGER,
            },
            role_name: {
                type: DataTypes.STRING,
            },
            portal_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    return portal_user;
};
